"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, Link } from 'react-router-dom';
import { Bell, Search, ShoppingCart, User, HandCoins, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { projects, navSecondary, navMainByUserType } from "@/components/data/data-sidebar";

const flattenNavItems = (items, map = {}) => {
  items.forEach(item => {
    map[item.url] = item.title || item.name;
    if (item.items) {
      flattenNavItems(item.items, map);
    }
  });
  return map;
};

const urlToTitleMap = {
  ...flattenNavItems(navMainByUserType.guest),
  ...flattenNavItems(navMainByUserType.user),
  ...flattenNavItems(navMainByUserType.provider),
  ...flattenNavItems(navMainByUserType.admin),
  ...flattenNavItems(projects),
  ...flattenNavItems(navSecondary),
};

interface HeaderProps {
  user: {
    name: string
    email: string
    avatar: string
  },
  userType: string,
}

export function Header({ user, userType }: HeaderProps) {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames.length === 0 || pathnames[0] === "" || pathnames[0] === "#" || pathnames[0] === "home") {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }
    return (
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          let title = urlToTitleMap[to];
          if (!title) return null;
          return (
            <BreadcrumbItem key={to}>
              {isLast ? (
                <BreadcrumbPage>{title}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={to}>{title}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    );
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2 text-foreground" />
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>{generateBreadcrumbs()}</Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-56 pl-8" />
        </form>
        <a href="/user/cart">
          <Button size="icon" variant="ghost">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="sr-only">Shopping cart</span>
          </Button>
        </a>
        <a href="/user/notifications">
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 text-foreground">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userType === "Buyer" && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HandCoins />
                    Become a Seller
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function ProfileUpdating() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    city: "",
    district: "",
    phoneNumber: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated personal info:", personalInfo);
    // Here you would typically send this data to your backend using an API call
  };

  const handlePasswordUpdate = () => {
    console.log("Password update requested");
    // Here you would typically send this data to your backend using an API call
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto my-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-left text-primary">
        Profile Updating
      </h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-primary"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-primary"
          >
            Change Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-card-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-card-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenId" className="text-card-foreground">
                  Citizen Identification Number
                </Label>
                <Input
                  id="citizenId"
                  name="citizenId"
                  value={personalInfo.citizenId}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-card-foreground">
                    City/Province
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district" className="text-card-foreground">
                    District, Street, Number
                  </Label>
                  <Input
                    id="district"
                    name="district"
                    value={personalInfo.district}
                    onChange={handlePersonalInfoChange}
                    required
                    className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-card-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalInfoChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <Button
                onClick={handleUpdate}
                className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
              >
                UPDATE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-card-foreground">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="current"
                  type="password"
                  value={password.current}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-card-foreground">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="new"
                  type="password"
                  value={password.new}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-card-foreground">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirm"
                  type="password"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  required
                  className="bg-card text-card-foreground border-2 border-border focus:border-primary focus:ring-primary rounded-[30px]"
                />
              </div>
              <Button
                onClick={handlePasswordUpdate}
                className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground py-3 text-lg font-semibold transition-colors duration-200 rounded-[30px]"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}