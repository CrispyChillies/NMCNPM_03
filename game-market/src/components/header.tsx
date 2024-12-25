import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Bell, Search, ShoppingCart, User, HandCoins, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from 'react';

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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/game/all?query=${searchQuery}`);
  };

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
        <form className="relative" onSubmit={handleSearchSubmit}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-56 pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            <span className="sr-only">Notification</span>
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
            {userType === "user" && (
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