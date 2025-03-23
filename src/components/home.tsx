import React from "react";
import WalletOverview from "./dashboard/WalletOverview";
import ExpenseCategories from "./dashboard/ExpenseCategories";
import SpendingAnalytics from "./dashboard/SpendingAnalytics";
import QuickActions from "./dashboard/QuickActions";
import RecentTransactions from "./dashboard/RecentTransactions";
import { PlusCircle, ShoppingCart, Package, Bell } from "lucide-react";

interface HomeProps {
  userName?: string;
}

const Home = ({ userName = "أحمد" }: HomeProps) => {
  // Quick actions configuration
  const quickActions = [
    {
      label: "إضافة مشتريات",
      icon: <PlusCircle className="ml-2 h-4 w-4" />,
      onClick: () => console.log("Add Purchase clicked"),
      variant: "default",
    },
    {
      label: "قائمة التسوق",
      icon: <ShoppingCart className="ml-2 h-4 w-4" />,
      onClick: () => console.log("Create Shopping List clicked"),
      variant: "secondary",
    },
    {
      label: "إضافة عنصر للمخزون",
      icon: <Package className="ml-2 h-4 w-4" />,
      onClick: () => console.log("Add Inventory Item clicked"),
      variant: "outline",
    },
    {
      label: "الإشعارات",
      icon: <Bell className="ml-2 h-4 w-4" />,
      onClick: () => console.log("View Notifications clicked"),
      variant: "ghost",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 rtl">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-right">مرحباً، {userName}</h1>
          <p className="text-gray-500 text-right mt-1">
            هذه نظرة عامة على حالتك المالية اليوم
          </p>
        </div>

        {/* Wallet Overview Section */}
        <div className="mb-8">
          <WalletOverview />
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <QuickActions actions={quickActions} />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ExpenseCategories />
          <SpendingAnalytics />
        </div>

        {/* Recent Transactions Section */}
        <div className="mb-8">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Home;
