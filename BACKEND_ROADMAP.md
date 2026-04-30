# Backend Kisco — Roadmap de implementação

## Contexto

O front-end de **Malinha PT.2** já está pronto: `/login` (`app/login/page.tsx`) tem um botão que aponta para `/api/auth/spotify`, e a home (`app/page.tsx`) renderiza 6 `UserCard`s com dados mock. Não existe nenhum código de backend ainda — sem `app/api/`, sem `.env`, sem libs de auth, sem banco.

**Objetivo:** cada amigo loga uma vez via Spotify, tem seus tokens + perfil persistidos, e a home passa a mostrar dinamicamente os `UserCard`s de todos os amigos com as últimas 5 músicas que cada um escutou do álbum *Kiss All The Time* (Disco Ocasionally). Sessão precisa sobreviver à expiração de 1h do `access_token` (refresh-token completo).

**Stack confirmado:** Next.js **16.2** App Router (com breaking changes vs versões antigas — ver Gotchas), React 19, TypeScript estrito, Tailwind, shadcn/ui. Sem ORM/DB/auth-lib instalados ainda.

---

## Decisões arquiteturais (tomadas)

1. **Multi-usuário compartilhado** → precisa de storage persistente (banco) com 1 linha por amigo logado.
2. **Refresh-token completo** → wrapper de fetch que detecta `expires_at` próximo ou `401` e renova antes de chamar a API.
3. **Sessão "leve":** o cookie só serve para CSRF (`state` durante OAuth) e, opcionalmente, para identificar "qual card é o seu" na home. A identidade real do usuário fica no banco — quem visita a home vê todos os cards independentemente de estar logado.

---

## Roadmap em 10 etapas

### 1. Cadastrar app no Spotify Developer

- Criar app em https://developer.spotify.com/dashboard
- Anotar `Client ID` e `Client Secret`
- Adicionar Redirect URIs:
  - `http://localhost:3000/api/auth/callback` (dev)
  - URL de produção (quando definir)
- Escopos que você vai pedir no flow: `user-read-recently-played`, `user-read-private`, `user-read-email`

### 2. Variáveis de ambiente

Criar `.env.local` (e adicionar a `.gitignore` se ainda não estiver):

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=<32+ bytes random>  # se for assinar cookie do state
```

> Doc: `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`. Lembre: só `NEXT_PUBLIC_*` vai pro browser — secrets nunca recebem prefixo.

### 3. Escolher e configurar storage

Opções (escolha 1, do mais simples ao mais robusto):
- **`better-sqlite3`** — zero-config local, arquivo `data/kisco.db`. Bom para dev. **Não funciona em serverless (Vercel)**.
- **Prisma + SQLite** — migrations declarativas, type-safe. Mesma limitação serverless.
- **Neon / Vercel Postgres / Supabase** — Postgres gerenciado. Funciona em produção serverless. Recomendado se for deployar na Vercel.

Modelo `users` (mínimo):

| coluna             | tipo       | obs                                  |
|--------------------|------------|--------------------------------------|
| `spotify_id`       | text PK    | `id` retornado por `GET /v1/me`      |
| `display_name`     | text       |                                      |
| `avatar_url`       | text null  | `images[0].url`                      |
| `access_token`     | text       | criptografado se possível            |
| `refresh_token`    | text       | criptografado se possível            |
| `token_expires_at` | timestamp  | `Date.now() + expires_in*1000`       |
| `created_at`       | timestamp  |                                      |
| `updated_at`       | timestamp  |                                      |

### 4. Descobrir e fixar o ID do álbum

Faça uma chamada manual (Postman/curl/REPL) ao endpoint de search com seu próprio token de teste:

```
GET https://api.spotify.com/v1/search?q=album:Kiss%20All%20The%20Time%20artist:Disco%20Ocasionally&type=album
```

Anote o `id` do álbum em `lib/constants.ts` como `KISS_ALL_THE_TIME_ALBUM_ID`. Filtre por `album.id` (mais robusto que pelo nome).

### 5. Cliente Spotify (`lib/spotify.ts`)

Funções puras que recebem `accessToken` e fazem chamadas com `fetch`:

- `exchangeCodeForToken(code)` → `POST https://accounts.spotify.com/api/token`, header `Authorization: Basic base64(client_id:client_secret)`, body urlencoded com `grant_type=authorization_code`, `code`, `redirect_uri`
- `refreshAccessToken(refreshToken)` → mesmo endpoint, `grant_type=refresh_token`. ⚠ A resposta **pode** trazer um `refresh_token` novo — se vier, persista; se não vier, mantenha o anterior
- `getCurrentUser(accessToken)` → `GET https://api.spotify.com/v1/me`
- `getRecentlyPlayed(accessToken, limit=50)` → `GET https://api.spotify.com/v1/me/player/recently-played?limit=50`
- `filterByAlbum(items, albumId, take=5)` → função pura

Sempre passe `cache: 'no-store'` no `fetch` (em 16.2 já é o default, mas declare por clareza).

> Docs:
> - Auth code flow: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
> - Recently played: https://developer.spotify.com/documentation/web-api/reference/get-recently-played

### 6. Wrapper de token (`lib/spotifyForUser.ts`)

Único ponto que conhece o banco. Fluxo:

1. Carrega user pelo `spotify_id`.
2. Se `token_expires_at < Date.now() + 30_000` → chama `refreshAccessToken`, persiste novo `access_token`/`expires_at` (e `refresh_token` se veio).
3. Faz a chamada Spotify desejada.
4. Se vier `401` mesmo após o passo 2 → tenta refresh **uma vez**, repete a chamada.
5. Se ainda falhar → marca user como precisando re-logar (campo opcional `needs_relogin`).

### 7. Route Handlers de OAuth

Em **Next.js 16.2**, `route.ts` exporta `GET`/`POST` async; `params` é `Promise`; `cookies()` é async.

- **`app/api/auth/spotify/route.ts`** (GET):
  1. Gera `state` (32 bytes random hex).
  2. `await cookies()` → `cookieStore.set('oauth_state', state, { httpOnly: true, sameSite: 'lax', secure: prod, path: '/', maxAge: 600 })`.
  3. Monta URL `https://accounts.spotify.com/authorize?response_type=code&client_id=...&scope=...&redirect_uri=...&state=...`.
  4. `return NextResponse.redirect(url)`.

- **`app/api/auth/callback/route.ts`** (GET):
  1. Extrai `code`, `state`, `error` da query (`request.nextUrl.searchParams`).
  2. Lê cookie `oauth_state`, compara em constant-time. Se diferente ou ausente → 400.
  3. `exchangeCodeForToken(code)` → recebe tokens.
  4. `getCurrentUser(access_token)` → recebe perfil.
  5. UPSERT no banco por `spotify_id`.
  6. Apaga cookie `oauth_state`.
  7. `NextResponse.redirect(new URL('/', request.url))`.

> Docs Next.js (locais):
> - Route Handler: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`
> - Auth: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`

### 8. Página com dados reais

`app/page.tsx` é Server Component → pode ler banco e chamar Spotify direto.

1. `const users = await db.listUsers()`.
2. `const cards = await Promise.all(users.map(u => getKissAllTheTimeCard(u)))` — em paralelo.
3. `getKissAllTheTimeCard(user)` usa o wrapper da etapa 6: pega `recently-played`, filtra por `KISS_ALL_THE_TIME_ALBUM_ID`, fatiar 5.
4. Substituir os 6 `<UserCard />` mock por `cards.map(c => <UserCard {...c} />)`.

⚠ Ajuste o tipo `UserCardProps` em `components/UserCard.tsx` se a forma dos dados reais divergir do mock.

### 9. Edge cases obrigatórios

- Usuário tem menos de 5 plays do álbum nas últimas 50 → renderizar o que tiver (UI já tolera array variável? confira).
- `refresh_token` revogado pelo usuário no Spotify → marcar relogin necessário; UI pode mostrar botão "reconectar" no card dele.
- `429 Too Many Requests` da Spotify → respeitar header `Retry-After` (relevante se o número de amigos crescer).
- `state` mismatch ou `error=access_denied` no callback → redirecionar para `/login?error=...`.
- Concorrência: dois requests simultâneos do mesmo user disparando refresh → idempotente; o último write vence, mas idealmente serialize por user.

### 10. Deploy

- Adicionar Redirect URI de produção no dashboard do Spotify (a URL exata, case-sensitive).
- Definir env vars no host (Vercel etc.).
- Se escolheu SQLite e for pra Vercel: **migre para Postgres antes** (Neon/Vercel Postgres). Serverless = filesystem efêmero.

---

## Arquivos que você vai criar

- `.env.local`
- `app/api/auth/spotify/route.ts`
- `app/api/auth/callback/route.ts`
- `lib/spotify.ts`
- `lib/spotifyForUser.ts` (wrapper com refresh)
- `lib/db.ts` (ou `lib/users.ts`) + arquivo do banco / schema
- `lib/constants.ts` (álbum ID, escopos)

## Arquivos que você vai modificar

- `app/page.tsx` — substituir mock por dados reais
- `components/UserCard.tsx` — ajustar tipos se necessário
- `package.json` — adicionar deps do banco escolhido
- `.gitignore` — garantir `.env.local`, `data/*.db`

---

## Gotchas críticos do Next.js 16.2 (não os do seu treinamento)

1. `cookies()` é **async** → `const c = await cookies()`.
2. `params` em Route Handlers é **Promise** → `const { x } = await context.params`.
3. Middleware foi renomeado para **`proxy.ts`** (você provavelmente nem precisa, mas se for usar, esse é o nome).
4. `fetch()` **não cacheia por padrão** — opt-in via diretiva `'use cache'`. Para OAuth/Spotify isso é ótimo.
5. Acessar `cookies()`/`headers()`/`params` torna a rota dinâmica automaticamente.

> Quando bater em qualquer dúvida de sintaxe, leia primeiro `node_modules/next/dist/docs/` da versão instalada — o CLAUDE.md do projeto avisa que APIs mudaram.

---

## Verificação end-to-end

1. `npm run dev`.
2. Abrir `http://localhost:3000/login` → clicar **Continuar com Spotify**.
3. Autorizar no Spotify → deve voltar para `/`.
4. Inspecionar banco: row de `users` com seu `spotify_id`, tokens, `expires_at` ~1h no futuro.
5. Tocar 1–2 músicas do álbum *Kiss All The Time* no Spotify (qualquer cliente).
6. Refresh em `/` → seu `UserCard` aparece com até 5 tracks.
7. **Testar refresh:** no banco, force `token_expires_at = NOW() - 1h`. Refresh em `/` → o wrapper deve renovar silenciosamente; cheque que `expires_at` voltou pro futuro.
8. **Testar multi-user:** outro amigo loga; ambos cards aparecem na home.
9. **Testar revogação:** revogue acesso em https://www.spotify.com/account/apps/ e refresque a home → seu card deve sinalizar relogin.

---

## Referências rápidas

- Spotify Auth Code Flow: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
- Spotify Refresh: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
- Recently Played: https://developer.spotify.com/documentation/web-api/reference/get-recently-played
- `GET /v1/me`: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
- Search albums: https://developer.spotify.com/documentation/web-api/reference/search
- Next.js 16.2 (instalado localmente): `node_modules/next/dist/docs/01-app/`
