import React from "react";
import { Button } from "../ui/button";
import { PlusCircle, ShoppingCart, Package, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  actions?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive";
  }[];
}

const QuickActions = ({
  actions = [
    {
      label: "Add Purchase",
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Add Purchase clicked"),
      variant: "default",
    },
    {
      label: "Create Shopping List",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Create Shopping List clicked"),
      variant: "secondary",
    },
    {
      label: "Add Inventory Item",
      icon: <Package className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Add Inventory Item clicked"),
      variant: "outline",
    },
    {
      label: "View Notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
      onClick: () => console.log("View Notifications clicked"),
      variant: "ghost",
    },
  ],
}: QuickActionProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3 justify-start">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "default"}
            onClick={action.onClick}
            className={cn(
              "flex items-center justify-center",
              "min-w-[150px] md:min-w-[180px]",
            )}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
