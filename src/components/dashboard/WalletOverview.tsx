import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  PlusCircle,
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletData {
  id: string;
  name: string;
  balance: number;
  currency: string;
  trend: "up" | "down" | "neutral";
  percentChange: number;
  recentTransactions: {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: "income" | "expense";
  }[];
}

interface WalletOverviewProps {
  wallets?: WalletData[];
  onAddWallet?: () => void;
  onConvertCurrency?: () => void;
  onViewWallet?: (walletId: string) => void;
}

const WalletOverview = ({
  wallets = [
    {
      id: "wallet-1",
      name: "المحفظة الرئيسية",
      balance: 12500,
      currency: "ريال",
      trend: "up",
      percentChange: 2.5,
      recentTransactions: [
        {
          id: "tx-1",
          description: "راتب الشهر",
          amount: 5000,
          date: "2023-06-01",
          type: "income",
        },
        {
          id: "tx-2",
          description: "مشتريات البقالة",
          amount: -350,
          date: "2023-06-03",
          type: "expense",
        },
      ],
    },
    {
      id: "wallet-2",
      name: "محفظة الادخار",
      balance: 8750,
      currency: "ريال",
      trend: "up",
      percentChange: 5.2,
      recentTransactions: [
        {
          id: "tx-3",
          description: "تحويل من المحفظة الرئيسية",
          amount: 1000,
          date: "2023-06-02",
          type: "income",
        },
      ],
    },
    {
      id: "wallet-3",
      name: "محفظة الطوارئ",
      balance: 3200,
      currency: "ريال",
      trend: "down",
      percentChange: 1.8,
      recentTransactions: [
        {
          id: "tx-4",
          description: "إصلاح السيارة",
          amount: -800,
          date: "2023-06-04",
          type: "expense",
        },
      ],
    },
  ],
  onAddWallet = () => console.log("Add wallet clicked"),
  onConvertCurrency = () => console.log("Convert currency clicked"),
  onViewWallet = (walletId: string) =>
    console.log(`View wallet ${walletId} clicked`),
}: WalletOverviewProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-right">نظرة عامة على المحافظ</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onConvertCurrency}>
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            تحويل العملات
          </Button>
          <Button size="sm" onClick={onAddWallet}>
            <PlusCircle className="h-4 w-4 mr-2" />
            إضافة محفظة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-right text-lg">
                  {wallet.name}
                </CardTitle>
                <Wallet className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {wallet.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      wallet.trend === "up" ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {wallet.percentChange}%
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {wallet.balance.toLocaleString()} {wallet.currency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    الرصيد الحالي
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-right mb-2">
                  آخر المعاملات
                </div>
                <div className="space-y-2">
                  {wallet.recentTransactions.slice(0, 2).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-2 bg-muted/50 rounded-md"
                    >
                      <span
                        className={cn(
                          "font-medium",
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-red-500",
                        )}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {transaction.amount.toLocaleString()} {wallet.currency}
                      </span>
                      <div className="text-right">
                        <div className="text-sm">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString(
                            "ar-SA",
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => onViewWallet(wallet.id)}
              >
                عرض التفاصيل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WalletOverview;
