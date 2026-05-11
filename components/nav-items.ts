import {
  Crown,
  Home,
  ListMusic,
  type LucideIcon,
  Sparkles,
  Users,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "topo", label: "Início", Icon: Home },
  { id: "usuarios", label: "Usuários", Icon: Users },
  { id: "estatisticas-gerais", label: "Estatísticas Gerais", Icon: Sparkles },
  { id: "top-10", label: "Top 10", Icon: ListMusic },
  { id: "ranking", label: "Ranking", Icon: Crown },
];
