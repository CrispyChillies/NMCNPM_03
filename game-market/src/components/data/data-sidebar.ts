import {
  LifeBuoy,
  FolderCode,
  PieChart,
  Send,
  Settings2,
  User,
  Gamepad2,
  Home,
  ClipboardList,
  Bell,
  Component,
} from "lucide-react";

export const projects = [
  {
    name: "Public Game Project",
    url: "/project/public",
    icon: FolderCode,
  },
  {
    name: "Development Community",
    url: "/project/community",
    icon: PieChart,
  },
];

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
];

const buyerCategories = [
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
      },
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
  {
    title: "Profile Updating",
    url: "/profile-updating",
    icon: User,
  },
  {
    title: "Product Uploading",
    url: "/product-uploading",
    icon: ClipboardList,
  },
];

export const navMainByUserType = {
  Buyer: buyerCategories,
  GameProvider: [
    {
      title: "Provider Center",
      url: "/provider/center",
      icon: Component,
      items: [
        {
          title: "Dashboard",
          url: "/provider/dashboard/",
        },
        {
          title: "Games",
          url: "/provider/game/",
        },
        {
          title: "Orders",
          url: "/provider/order/",
        },
        {
          title: "Customers",
          url: "/provider/customer/",
        },
        {
          title: "Finance",
          url: "/provider/finance/",
        },
        {
          title: "Promotions",
          url: "/provider/promotion/",
        },
        {
          title: "Reports",
          url: "/provider/report/",
        },
      ],
    },
    ...buyerCategories,
  ],
  Admin: [
    {
      title: "Admin Center",
      url: "/admin/center",
      icon: Component,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard/",
        },
        {
          title: "Games Management",
          url: "/admin/game-management/",
        },
        {
          title: "Orders Management",
          url: "/admin/order-management/",
        },
        {
          title: "Users Management",
          url: "/admin/user-management/",
        },
        {
          title: "Reports Management",
          url: "/admin/report-management/",
        },
      ],
    },
    ...buyerCategories,
  ],
};
