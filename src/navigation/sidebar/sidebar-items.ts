import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
  Activity,
  Shield,
  Server,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Início",
    items: [
      {
        title: "Painel Principal",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Cadastro",
    items: [
      {
        title: "Clientes",
        url: "/users",
        icon: Users,
        comingSoon: true,
      },
    ],
  },
  {
    id: 3,
    label: "Análises",
    items: [
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Vendas",
        url: "/dashboard/finance",
        icon: Banknote,
        comingSoon: true,
      },
      {
        title: "Desempenho",
        url: "/dashboard/analytics",
        icon: Gauge,
        comingSoon: true,
      },
    ],
  },
  {
    id: 4,
    label: "E-commerce",
    items: [
      {
        title: "Produtos",
        url: "/dashboard/e-commerce",
        icon: ShoppingBag,
        comingSoon: true,
      },
      {
        title: "Pedidos",
        url: "/invoice",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "Logística",
        url: "/dashboard/logistics",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 5,
    label: "Colaboração",
    items: [
      {
        title: "Caixa de Entrada",
        url: "/mail",
        icon: Mail,
        comingSoon: true,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "Calendário",
        url: "/calendar",
        icon: Calendar,
        comingSoon: true,
      },
      {
        title: "Projetos",
        url: "/kanban",
        icon: Kanban,
        comingSoon: true,
      },
    ],
  },
  {
    id: 6,
    label: "Gestão",
    items: [
      {
        title: "Autenticação",
        url: "/auth",
        icon: Fingerprint,
        newTab: true,
      },
      {
        title: "Autorização",
        url: "/roles",
        icon: Lock,
        newTab: true,
      },
    ],
  },
  {
    id: 7,
    label: "Educação",
    items: [
      {
        title: "Centro de Aprendizagem",
        url: "/others",
        icon: GraduationCap,
        newTab: true,
      },
    ],
  },
  {
    id: 8,
    label: "Monitoramento",
    items: [
      {
        title: "Sistema",
        url: "/dashboard/monitoring/system",
        icon: Activity,
        comingSoon: true,
      },
      {
        title: "Segurança",
        url: "/dashboard/monitoring/security",
        icon: Shield,
        comingSoon: true,
      },
      {
        title: "Servidores",
        url: "/dashboard/monitoring/servers",
        icon: Server,
        comingSoon: true,
      },
    ],
  },
];