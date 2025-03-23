import React from "react";
import {
  Home,
  ShoppingCart,
  Package,
  List,
  Bell,
  Search,
  Globe,
  User,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "../../lib/utils";

interface MainLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const MainLayout = ({
  children,
  title = "لوحة التحكم المالية",
}: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" dir="rtl">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-l border-gray-200 h-full">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 right-4 z-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "لوحة التحكم المالية",
      active: true,
    },
    { icon: <ShoppingCart className="h-5 w-5" />, label: "الكاشير" },
    { icon: <Package className="h-5 w-5" />, label: "إدارة المخزون" },
    { icon: <List className="h-5 w-5" />, label: "قائمة التسوق" },
    { icon: <Bell className="h-5 w-5" />, label: "الإشعارات" },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">مدير حسابات المنزل</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
              alt="User"
            />
            <AvatarFallback>مس</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">مستخدم النظام</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>الإعدادات</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "لوحة التحكم المالية" }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="بحث..." className="pr-10 w-full" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>العربية</DropdownMenuItem>
            <DropdownMenuItem>English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default MainLayout;
