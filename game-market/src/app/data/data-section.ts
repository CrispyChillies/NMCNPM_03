import React from "react";
import {
  List,
  Grid,
  Heart,
  UserCircle,
  CreditCard,
  MapPin,
  Key,
  ShoppingCart,
  Clock,
  Truck,
  Tag,
  Sliders,
  BellRing,
  Shield,
  LayoutDashboard,
  Gamepad2,
  ClipboardList,
  Users,
  BarChart,
  DollarSign,
  Gift,
  HandCoins,
} from "lucide-react";

export const featureSection = [
  {
    title: "Games",
    description: "Explore a diverse selection of games from various genres. Manage your favorites and keep up with the latest releases.",
    url: "/user/game",
    section: [
      {
        title: "All Games",
        description: "Browse through the complete collection of games available on the platform. Filter by various criteria to find exactly what you're looking for.",
        url: "/user/game/all",
        icon: React.createElement(List, { className: "h-8 w-8" }),
      },
      {
        title: "Categories",
        description: "Discover games categorized by genre, style, and gameplay type. Find new games that match your interests and preferences.",
        url: "/user/game/category",
        icon: React.createElement(Grid, { className: "h-8 w-8" }),
      },
      {
        title: "Favorites",
        description: "View and manage your favorite games. Keep track of games you love and easily access them for quick play.",
        url: "/user/game/favorite",
        icon: React.createElement(Heart, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "My Account",
    description: "Access and manage your account details, including personal information, preferences, and security settings.",
    url: "/user/account",
    section: [
      {
        title: "Profile",
        description: "Edit your profile information such as your name, profile picture, and other personal details. Keep your profile up-to-date.",
        url: "/user/account/profile",
        icon: React.createElement(UserCircle, { className: "h-8 w-8" }),
      },
      {
        title: "Banks & Cards",
        description: "Store and manage your bank accounts and credit/debit cards for easy and secure transactions. Update your payment methods as needed.",
        url: "/user/account/payment",
        icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
      },
      {
        title: "Addresses",
        description: "Add, update, and manage your delivery addresses for fast and accurate shipping. Choose your default address for convenience.",
        url: "/user/account/address",
        icon: React.createElement(MapPin, { className: "h-8 w-8" }),
      },
      {
        title: "Change Password",
        description: "Change your account password to enhance security. Choose a strong password and keep your account safe.",
        url: "/user/account/password",
        icon: React.createElement(Key, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "My Purchase",
    description: "Track and manage your purchase orders, view order history, and monitor the status of items you've bought.",
    url: "/user/purchase",
    section: [
      {
        title: "Purchase Orders",
        description: "View your current purchase orders and their status, including tracking information and delivery updates.",
        url: "/user/purchase/order",
        icon: React.createElement(ShoppingCart, { className: "h-8 w-8" }),
      },
      {
        title: "Orders History",
        description: "Review the history of your past purchases. View details on completed orders and make easy reorders from past items.",
        url: "/user/purchase/history",
        icon: React.createElement(Clock, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "Notifications",
    description: "Stay updated with important notifications about your orders, promotions, and platform updates. Customize your notification preferences.",
    url: "/user/notification",
    section: [
      {
        title: "Order Updates",
        description: "Receive real-time notifications about the status of your ongoing orders. Get updates on shipping, delivery, and any issues with your purchase.",
        url: "/user/notification/order",
        icon: React.createElement(Truck, { className: "h-8 w-8" }),
      },
      {
        title: "Promotions",
        description: "Stay informed about the latest deals, discounts, and special promotions available on the platform. Never miss a chance to save.",
        url: "/user/notification/promotion",
        icon: React.createElement(Tag, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "Settings",
    description: "Customize your account preferences, notification settings, and privacy controls to match your needs and ensure a secure experience.",
    url: "/user/setting",
    section: [
      {
        title: "General",
        description: "Adjust general settings related to your account, including language preferences, account visibility, and other platform-wide settings.",
        url: "/user/setting/general",
        icon: React.createElement(Sliders, { className: "h-8 w-8" }),
      },
      {
        title: "Notifications",
        description: "Manage how and when you receive notifications. Choose between push notifications, emails, or SMS alerts to stay in the loop.",
        url: "/user/setting/notification",
        icon: React.createElement(BellRing, { className: "h-8 w-8" }),
      },
      {
        title: "Privacy",
        description: "Control who can see your personal information and how your data is shared. Manage your privacy settings for a more secure experience.",
        url: "/user/setting/privacy",
        icon: React.createElement(Shield, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "Admin Centre",
    description: "Manage the platform with advanced administrative tools and settings. Oversee games, orders, users, and reports.",
    url: "/admin",
    section: [
      {
        title: "Dashboard",
        description: "Get an overview of the platform's performance, including key metrics and statistics.",
        url: "/admin/dashboard",
        icon: React.createElement(LayoutDashboard, { className: "h-8 w-8" }),
      },
      {
        title: "Seller Registration",
        description: "Manage seller applications and approve new sellers. Monitor the onboarding process and ensure compliance with platform policies",
        url: "/admin/become-seller",
        icon: React.createElement(HandCoins, { className: "h-8 w-8" }),
      },
      {
        title: "Games Management",
        description: "Manage the games available on the platform. Add new games, update existing ones, and remove outdated titles.",
        url: "/admin/game-management",
        icon: React.createElement(Gamepad2, { className: "h-8 w-8" }),
      },
      {
        title: "Orders Management",
        description: "Oversee all orders placed on the platform. Track order statuses, handle returns, and resolve customer issues.",
        url: "/admin/order-management",
        icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      },
      {
        title: "Users Management",
        description: "Manage user accounts, including creating, updating, and deleting users. Monitor user activity and handle user-related issues.",
        url: "/admin/user-management",
        icon: React.createElement(Users, { className: "h-8 w-8" }),
      },
      {
        title: "Reports Management",
        description: "Generate and view detailed reports on various aspects of the platform, including sales, user activity, and performance metrics.",
        url: "/admin/report-management",
        icon: React.createElement(BarChart, { className: "h-8 w-8" }),
      },
    ],
  },
  {
    title: "Provider Centre",
    description: "Manage your provider account with tools for overseeing games, orders, customers, finance, promotions, and reports.",
    url: "/provider",
    section: [
      {
        title: "Dashboard",
        description: "Get an overview of your provider account's performance, including key metrics and statistics.",
        url: "/provider/dashboard",
        icon: React.createElement(LayoutDashboard, { className: "h-8 w-8" }),
      },
      {
        title: "Games Management",
        description: "Manage the games you provide on the platform. Add new games, update existing ones, and remove outdated titles.",
        url: "/provider/game",
        icon: React.createElement(Gamepad2, { className: "h-8 w-8" }),
      },
      {
        title: "Orders Management",
        description: "Oversee all orders placed for your games. Track order statuses, handle returns, and resolve customer issues.",
        url: "/provider/order",
        icon: React.createElement(ClipboardList, { className: "h-8 w-8" }),
      },
      {
        title: "Customers Management",
        description: "Manage your customers, including viewing customer details and handling customer-related issues.",
        url: "/provider/customer",
        icon: React.createElement(Users, { className: "h-8 w-8" }),
      },
      {
        title: "Finance Management",
        description: "Manage your finances, including viewing earnings, handling payouts, and managing financial records.",
        url: "/provider/finance",
        icon: React.createElement(DollarSign, { className: "h-8 w-8" }),
      },
      {
        title: "Promotions Management",
        description: "Create and manage promotions for your games to attract more customers and boost sales.",
        url: "/provider/promotion",
        icon: React.createElement(Gift, { className: "h-8 w-8" }),
      },
      {
        title: "Reports Management",
        description: "Generate and view detailed reports on various aspects of your provider account, including sales, customer activity, and performance metrics.",
        url: "/provider/report",
        icon: React.createElement(BarChart, { className: "h-8 w-8" }),
      },
    ],
  },
];