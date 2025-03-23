import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface ExpenseCategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseCategoriesProps {
  data?: ExpenseCategoryData[];
  title?: string;
  currency?: string;
}

const ExpenseCategories = ({
  data = [
    { name: "الطعام", value: 1200, color: "#FF6384" },
    { name: "المواصلات", value: 800, color: "#36A2EB" },
    { name: "المرافق", value: 600, color: "#FFCE56" },
    { name: "الترفيه", value: 400, color: "#4BC0C0" },
    { name: "التسوق", value: 350, color: "#9966FF" },
    { name: "أخرى", value: 250, color: "#FF9F40" },
  ],
  title = "فئات المصروفات",
  currency = "ر.س",
}: ExpenseCategoriesProps) => {
  // Calculate total expenses
  const totalExpenses = data.reduce((sum, category) => sum + category.value, 0);

  // Sort data by value in descending order for the list
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-right">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row h-full">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 h-[200px] mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} ${currency}`, "القيمة"]}
                  labelFormatter={(name) => `${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="w-full md:w-1/2 overflow-y-auto max-h-[200px] pr-2 md:pr-0 md:pl-4 text-right">
            <div className="font-semibold mb-2 text-sm text-gray-500">
              إجمالي المصروفات: {totalExpenses} {currency}
            </div>
            <Separator className="mb-2" />
            <ul className="space-y-2">
              {sortedData.map((category, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {category.value} {currency}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({((category.value / totalExpenses) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{category.name}</span>
                    <div
                      className="w-3 h-3 rounded-full ml-2"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCategories;
