import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface SpendingAnalyticsProps {
  data?: {
    months: string[];
    currentYearData: number[];
    previousYearData: number[];
  };
  className?: string;
}

const SpendingAnalytics = ({
  data = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    currentYearData: [
      1200, 1400, 1100, 1300, 1500, 1700, 1600, 1800, 1900, 2000, 1800, 1700,
    ],
    previousYearData: [
      1000, 1200, 900, 1100, 1300, 1500, 1400, 1600, 1700, 1800, 1600, 1500,
    ],
  },
  className,
}: SpendingAnalyticsProps) => {
  const [timeFilter, setTimeFilter] = useState("year");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Find the highest value to set the chart scale
  const maxValue = Math.max(...data.currentYearData, ...data.previousYearData);

  return (
    <Card className={cn("w-full h-full bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">تحليل الإنفاق</CardTitle>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value && value.trim() !== "" ? value : "all")
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="جميع الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="food">الطعام</SelectItem>
              <SelectItem value="utilities">المرافق</SelectItem>
              <SelectItem value="entertainment">الترفيه</SelectItem>
              <SelectItem value="transportation">المواصلات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={timeFilter}
          onValueChange={setTimeFilter}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="month">شهر</TabsTrigger>
            <TabsTrigger value="quarter">ربع سنوي</TabsTrigger>
            <TabsTrigger value="year">سنة</TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="h-[220px]">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <MonthlyChart data={data} maxValue={maxValue} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {[1, 7, 14, 21, 28].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quarter" className="h-[220px]">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <QuarterlyChart data={data} maxValue={maxValue} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
                  <div key={quarter}>{quarter}</div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="year" className="h-[220px]">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <YearlyChart data={data} maxValue={maxValue} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                {data.months.map((month) => (
                  <div
                    key={month}
                    className="text-center"
                    style={{ width: `${100 / data.months.length}%` }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center mt-4 space-x-4 rtl:space-x-reverse">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-sm">2023</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-muted-foreground mr-2"></div>
            <span className="text-sm">2022</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartProps {
  data: {
    months: string[];
    currentYearData: number[];
    previousYearData: number[];
  };
  maxValue: number;
}

const YearlyChart = ({ data, maxValue }: ChartProps) => {
  return (
    <div className="w-full h-full flex items-end">
      {data.months.map((month, index) => {
        const currentHeight = (data.currentYearData[index] / maxValue) * 100;
        const previousHeight = (data.previousYearData[index] / maxValue) * 100;

        return (
          <div
            key={month}
            className="flex-1 flex items-end justify-center space-x-1 rtl:space-x-reverse"
          >
            <div
              className="w-2 bg-muted-foreground rounded-t"
              style={{ height: `${previousHeight}%` }}
              title={`${data.previousYearData[index]} ريال`}
            />
            <div
              className="w-2 bg-primary rounded-t"
              style={{ height: `${currentHeight}%` }}
              title={`${data.currentYearData[index]} ريال`}
            />
          </div>
        );
      })}
    </div>
  );
};

const QuarterlyChart = ({ data, maxValue }: ChartProps) => {
  // Aggregate monthly data into quarters
  const quarters = [
    { current: 0, previous: 0 },
    { current: 0, previous: 0 },
    { current: 0, previous: 0 },
    { current: 0, previous: 0 },
  ];

  for (let i = 0; i < 12; i++) {
    const quarterIndex = Math.floor(i / 3);
    quarters[quarterIndex].current += data.currentYearData[i];
    quarters[quarterIndex].previous += data.previousYearData[i];
  }

  const quarterMaxValue = Math.max(
    ...quarters.map((q) => q.current),
    ...quarters.map((q) => q.previous),
  );

  return (
    <div className="w-full h-full flex items-end">
      {quarters.map((quarter, index) => {
        const currentHeight = (quarter.current / quarterMaxValue) * 100;
        const previousHeight = (quarter.previous / quarterMaxValue) * 100;

        return (
          <div
            key={`Q${index + 1}`}
            className="flex-1 flex items-end justify-center space-x-2 rtl:space-x-reverse"
          >
            <div
              className="w-6 bg-muted-foreground rounded-t"
              style={{ height: `${previousHeight}%` }}
              title={`${quarter.previous} ريال`}
            />
            <div
              className="w-6 bg-primary rounded-t"
              style={{ height: `${currentHeight}%` }}
              title={`${quarter.current} ريال`}
            />
          </div>
        );
      })}
    </div>
  );
};

const MonthlyChart = ({ data, maxValue }: ChartProps) => {
  // Mock data for daily spending in the current month
  const dailyData = Array.from({ length: 28 }, () =>
    Math.floor(Math.random() * (maxValue / 30) + maxValue / 60),
  );

  const dailyPreviousData = Array.from({ length: 28 }, () =>
    Math.floor(Math.random() * (maxValue / 30) + maxValue / 60),
  );

  const dailyMaxValue = Math.max(...dailyData, ...dailyPreviousData);

  return (
    <div className="w-full h-full flex items-end">
      {dailyData.map((value, index) => {
        const currentHeight = (value / dailyMaxValue) * 100;
        const previousHeight = (dailyPreviousData[index] / dailyMaxValue) * 100;

        // Only show every 3rd bar for clarity
        if (index % 3 === 0 || index === dailyData.length - 1) {
          return (
            <div
              key={index}
              className="flex-1 flex items-end justify-center space-x-0.5 rtl:space-x-reverse"
            >
              <div
                className="w-1 bg-muted-foreground rounded-t"
                style={{ height: `${previousHeight}%` }}
                title={`${dailyPreviousData[index]} ريال`}
              />
              <div
                className="w-1 bg-primary rounded-t"
                style={{ height: `${currentHeight}%` }}
                title={`${value} ريال`}
              />
            </div>
          );
        }
        return <div key={index} className="flex-1" />;
      })}
    </div>
  );
};

export default SpendingAnalytics;
