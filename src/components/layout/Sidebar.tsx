import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingCart,
  Package,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  // Mock user data
  const user = {
    name: "محمد أحمد",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
    initials: "م أ",
  };

  const navItems = [
    { icon: <Home size={20} />, label: "لوحة التحكم", path: "/" },
    { icon: <CreditCard size={20} />, label: "الكاشير", path: "/cashier" },
    { icon: <Package size={20} />, label: "المخزون", path: "/inventory" },
    {
      icon: <ShoppingCart size={20} />,
      label: "قائمة التسوق",
      path: "/shopping-list",
    },
    { icon: <Bell size={20} />, label: "الإشعارات", path: "/notifications" },
    { icon: <Settings size={20} />, label: "الإعدادات", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "flex h-full w-[280px] flex-col bg-background border-r p-4 fixed left-0 top-0 bottom-0",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">HA</span>
        </div>
        <h1 className="text-xl font-bold">مدير الحسابات المنزلية</h1>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground group"
                    >
                      <span className="text-primary group-hover:text-primary">
                        {item.icon}
                      </span>
                      <span className="text-right">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center gap-3 px-3 py-3 rounded-md">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              حساب المستخدم
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
