# KISCO — frontend

Página privada onde 6 amigos acompanham em tempo real o que cada um anda ouvindo do álbum *Kiss All The Time. Disco, Occasionally.* do Harry Styles, com ranking de tops e estatísticas por semana, mês e geral.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## Live

| O quê                  | Onde                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| App                    | https://kisco.vercel.app                                                                          |

## O que ele faz

- Lista os amigos lado a lado com avatar, provedor (Spotify ou Last.fm) e últimas faixas tocadas do álbum.
- Mostra estatísticas do álbum por semana, mês e geral: top ouvinte, top faixa, top 10 faixas mais tocadas e ranking dos 6.
- Faz login via OAuth do Spotify ou Last.fm — o backend cuida do fluxo e devolve um cookie HttpOnly de sessão.
- Marca quem é "Você" no card de usuário e oferece logout via Server Action.
- Navegação por âncoras com sidebar (PC) e drawer inferior (mobile) que rolam suavemente entre as seções.

## Stack

- **Next.js 16.2** (App Router, Server Components, Server Actions) + **React 19.2**
- **TypeScript 5**
- **Tailwind CSS v4** com `@tailwindcss/postcss` e `tw-animate-css`
- **ShadCN** (`button`, `card`, `drawer`) sobre **`radix-ui`** + **vaul** pro drawer
- **lucide-react** pros ícones
- **recharts** (preparado pra visualizações futuras)
- Sem SWR/React Query: fetch nativo dentro de Server Components com `Promise.allSettled` pra isolar falhas

## Arquitetura

```
.
├── app/
│   ├── layout.tsx          # fontes (Anton, Roboto Mono, Inter, Geist) + html shell
│   ├── page.tsx            # Home — hero + UsersSection + AlbumStats + Sidebar
│   ├── login/page.tsx      # botões Spotify e Last.fm que redirecionam pro backend
│   ├── error.tsx           # error boundary global
│   └── globals.css         # Tailwind v4 + scroll-behavior smooth
├── components/
│   ├── Sidebar.tsx         # composição: DrawerMobile + DrawerDesktop
│   ├── DrawerMobile.tsx    # drawer inferior (mobile) via vaul
│   ├── DrawerDesktop.tsx   # drawer lateral esquerdo (desktop) via vaul
│   ├── DrawerNav.tsx       # itens da nav com window.scrollTo + scroll-margin
│   ├── nav-items.ts        # fonte única de seções (id, label, ícone)
│   ├── UsersSection.tsx    # Server Component — getUsers() + getMe() em paralelo
│   ├── UserCard.tsx        # card de usuário com últimas faixas e badge "(Você)"
│   ├── UserMenu.tsx        # menu suspenso com logout via Server Action
│   ├── FloatingLogin.tsx   # CTA flutuante de login/logout
│   ├── Countdown.tsx       # contagem regressiva pra 18/07/2026
│   ├── AlbumStats.tsx      # orquestra 12 fetches paralelos (week/month/total × 4)
│   ├── album-stats/        # cards modulares por accent (cyan/pink/purple)
│   │   ├── CardShell.tsx       # tema visual compartilhado
│   │   ├── CardHeader.tsx
│   │   ├── PeriodGroup.tsx
│   │   ├── SubsectionTitle.tsx
│   │   ├── TopListenerCard.tsx
│   │   ├── TopTrackCard.tsx
│   │   ├── TopTracksCard.tsx
│   │   ├── RankingColumn.tsx
│   │   ├── Avatar.tsx
│   │   ├── FallbackBody.tsx
│   │   └── utils.ts
│   └── ui/                 # primitives ShadCN (button, card, drawer)
├── lib/
│   ├── api.ts              # getMe() e getUsers() — adapta snake_case → camelCase
│   ├── stats.ts            # cliente tipado de /stats com mesmo adapter pattern
│   ├── actions.ts          # "use server" — logout() encaminha cookie e revalida
│   └── utils.ts            # cn() do ShadCN
└── public/                 # kisco.jpg (hero), malinha.png, ícones
```

## Pré-requisitos

- Node.js 20+
- npm (o lockfile é `package-lock.json`)
- O backend rodando — local em `http://127.0.0.1:8000` ou em produção via Fly.io

## Setup

```bash
git clone https://github.com/matheusmatta21/<<TODO: nome do repo>>.git
cd <<TODO: nome do repo>>

npm install

cp .env.example .env.local
# edite .env.local apontando pro backend
# dev:  NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
# prod: NEXT_PUBLIC_API_URL=https://kisco-backend-api.fly.dev

npm run dev
```

App em `http://localhost:3000`. O backend precisa estar de pé pra `/users` e `/stats/*` retornarem dados.

### Testando no celular pela rede local

`npm run dev` já aceita conexões da rede local. Pegue o IP da máquina (ex.: `192.168.5.206`) e acesse `http://192.168.5.206:3000` no celular. Se o Next reclamar de origin, adicione no `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "192.168.5.206"],
};
```

## Variáveis de ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://kisco-backend-api.fly.dev
```

Única env var do frontend. Os segredos do OAuth (Spotify/Last.fm) ficam todos no backend — o frontend só sabe a URL pública da API.

## Endpoints consumidos

| Método | Endpoint                                     | Usado por                       |
| ------ | -------------------------------------------- | ------------------------------- |
| GET    | `/auth/me`                                   | `lib/api.ts → getMe()`          |
| GET    | `/auth/spotify`                              | `app/login/page.tsx` (redirect) |
| GET    | `/auth/lastfm`                               | `app/login/page.tsx` (redirect) |
| POST   | `/auth/logout`                               | `lib/actions.ts → logout()`     |
| GET    | `/users`                                     | `lib/api.ts → getUsers()`       |
| GET    | `/stats/top-listener?period=week\|month\|total` | `lib/stats.ts`               |
| GET    | `/stats/top-track?period=...`                | `lib/stats.ts`                  |
| GET    | `/stats/top-tracks?period=...&limit=10`      | `lib/stats.ts`                  |
| GET    | `/stats/ranking?period=...&limit=10`         | `lib/stats.ts`                  |

## Deploy

Hospedado na Vercel com auto-deploy via GitHub: cada push em `main` dispara build e promove pra produção. A única variável de ambiente que precisa estar setada no painel da Vercel é `NEXT_PUBLIC_API_URL=https://kisco-backend-api.fly.dev`.

## Por que essas escolhas

- **Server Components em vez de SWR/React Query.** Como tudo precisa do cookie de sessão pra autenticar contra o backend, fazer o fetch direto no servidor (com `cookies()` do `next/headers`) elimina round-trip extra, expõe menos coisa no cliente e mantém o bundle JS magro. A página inteira chega renderizada.
- **Cookie HttpOnly encaminhado server-side em vez de `credentials: "include"` no cliente.** Frontend e backend ficam em domínios diferentes (Vercel e Fly.io), o que tornaria o CORS de cookie cross-site dolorido no browser. Como o fetch acontece no Server Component, lemos o cookie do browser via `cookies()` e repassamos no header `cookie` da requisição. O cliente nunca toca no token.
- **`Promise.allSettled` no `AlbumStats`.** São 12 fetches paralelos (3 períodos × 4 endpoints). Se um falhar, os outros 11 ainda renderizam — cada card decide localmente se mostra dado ou fallback.
- **Adapter snake_case → camelCase em `lib/api.ts` e `lib/stats.ts`.** O backend FastAPI fala snake_case, o frontend TS fala camelCase. Concentrar a conversão na camada de API mantém o resto da árvore de componentes idiomática.
- **vaul (não Radix) pro drawer.** Suporte nativo a drawer inferior no mobile com gestos, e dá pra mudar `direction="left"` pra virar sidebar de desktop usando o mesmo componente.
- **Tailwind v4 + ShadCN copy-paste em vez de uma UI lib completa.** Visual fortemente autoral (Anton display + glassmorphism com glows pink/cyan/purple), então faz mais sentido ter os componentes no repo do que combater overrides de uma biblioteca.

## Status

Projeto pessoal, em uso ativo por 6 amigos. Código aberto pra referência — sem aceitar contribuições externas.

---

[@matheusmatta21](https://github.com/matheusmatta21)
