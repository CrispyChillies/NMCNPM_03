import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  User,
  Gamepad2,
  Home,
  ClipboardList,
  Bell,
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
      url: "/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Games",
      url: "/user/game",
      icon: Gamepad2,
      items: [
        {
          title: "All Games",
          url: "/user/game/all",
        },
        {
          title: "Categories",
          url: "/user/game/category",
        },
        {
          title: "Favorites",
          url: "/user/favorite",
        },
      ],
    },
    {
      title: "My Account",
      url: "/user/account",
      icon: User,
      items: [
        {
          title: "Profile",
          url: "/user/account/profile",
        },
        {
          title: "Banks & Cards",
          url: "user/account/payment",
        },
        {
          title: "Addresses",
          url: "user/account/address",
        },
        {
          title: "Change Password",
          url: "user/account/password",
        },
      ],
    },
    {
      title: "My Purchase",
      url: "/user/purchase/",
      icon: ClipboardList,
      items: [
        {
          title: "View Cart",
          url: "/user/cart",
        },
        {
          title: "Purchase Orders",
          url: "/user/purchase/order",
        },
        {
          title: "Orders History",
          url: "/user/purchase/history",
        }
      ],
    },
    {
      title: "Notifications",
      url: "/user/notification",
      icon: Bell,
      items: [
        {
          title: "Order updates",
          url: "/user/notification/order",
        },
        {
          title: "Promotions",
          url: "/user/notification/promotion",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/setting",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/user/setting/general",
        },
        {
          title: "Notifications",
          url: "/user/setting/notification",
        },
        {
          title: "Privacy",
          url: "/user/setting/privacy",
        },
      ],
    },
  ],
  Admin: [

  ],
  GameProvider: [
   
  ],
}

