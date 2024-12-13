import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  ShoppingCart,
  Users,
  Gamepad,
  Home,
  Package,
  MessageSquare
} from 'lucide-react'

export const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
]

export const navSecondary = [
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Send,
  },
]

export const navMainByUserType = {
  Buyer: [
    {
      title: "Home",
      url: "/buyer/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Browse Games",
      url: "/buyer/browse",
      icon: Gamepad,
      items: [
        {
          title: "All Games",
          url: "/buyer/browse/all",
        },
        {
          title: "Categories",
          url: "/buyer/browse/categories",
        },
        {
          title: "Trending",
          url: "/buyer/browse/trending",
        },
      ],
    },
    {
      title: "My Account",
      url: "/buyer/account",
      icon: Users,
      items: [
        {
          title: "Profile",
          url: "/buyer/account/profile",
        },
        {
          title: "Orders",
          url: "/buyer/account/orders",
        },
        {
          title: "Favorites",
          url: "/buyer/account/favorites",
        },
      ],
    },
    {
      title: "Cart",
      url: "/buyer/cart",
      icon: ShoppingCart,
      items: [
        {
          title: "View Cart",
          url: "/buyer/cart/view",
        },
        {
          title: "Checkout",
          url: "/buyer/cart/checkout",
        },
      ],
    },
    {
      title: "Settings",
      url: "/buyer/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/buyer/settings/general",
        },
        {
          title: "Notifications",
          url: "/buyer/settings/notifications",
        },
        {
          title: "Privacy",
          url: "/buyer/settings/privacy",
        },
      ],
    },
  ],
  Admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/admin/dashboard/overview",
        },
        {
          title: "Analytics",
          url: "/admin/dashboard/analytics",
        },
      ],
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/admin/users/all",
        },
        {
          title: "Approvals",
          url: "/admin/users/approvals",
        },
        {
          title: "Reports",
          url: "/admin/users/reports",
        },
      ],
    },
    {
      title: "Game Management",
      url: "/admin/games",
      icon: Gamepad,
      items: [
        {
          title: "All Games",
          url: "/admin/games/all",
        },
        {
          title: "Approvals",
          url: "/admin/games/approvals",
        },
        {
          title: "Featured Games",
          url: "/admin/games/featured",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      items: [
        {
          title: "Platform Settings",
          url: "/admin/settings/platform",
        },
        {
          title: "Moderation Rules",
          url: "/admin/settings/moderation",
        },
      ],
    },
  ],
  GameProvider: [
    {
      title: "Dashboard",
      url: "/provider/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/provider/dashboard/overview",
        },
        {
          title: "Analytics",
          url: "/provider/dashboard/analytics",
        },
      ],
    },
    {
      title: "Game Management",
      url: "/provider/games",
      icon: Gamepad,
      items: [
        {
          title: "My Games",
          url: "/provider/games/list",
        },
        {
          title: "Add New Game",
          url: "/provider/games/new",
        },
        {
          title: "Game Statistics",
          url: "/provider/games/stats",
        },
      ],
    },
    {
      title: "Orders",
      url: "/provider/orders",
      icon: Package,
      items: [
        {
          title: "All Orders",
          url: "/provider/orders/all",
        },
        {
          title: "Pending Orders",
          url: "/provider/orders/pending",
        },
      ],
    },
    {
      title: "Customer Interaction",
      url: "/provider/customers",
      icon: MessageSquare,
      items: [
        {
          title: "Feedback",
          url: "/provider/customers/feedback",
        },
        {
          title: "Chat Support",
          url: "/provider/customers/chat",
        },
        {
          title: "Promotions",
          url: "/provider/customers/promotions",
        },
      ],
    },
  ],
}

