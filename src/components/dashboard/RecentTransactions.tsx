import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Filter, Calendar, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  wallet: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onFilterChange?: (filters: any) => void;
  onPageChange?: (page: number) => void;
}

const RecentTransactions = ({
  transactions = [
    {
      id: "1",
      date: "2023-06-01",
      description: "البقالة الأسبوعية",
      amount: -250,
      category: "طعام",
      wallet: "الرئيسية",
    },
    {
      id: "2",
      date: "2023-06-02",
      description: "راتب الشهر",
      amount: 5000,
      category: "دخل",
      wallet: "الرئيسية",
    },
    {
      id: "3",
      date: "2023-06-03",
      description: "فاتورة الكهرباء",
      amount: -150,
      category: "مرافق",
      wallet: "الرئيسية",
    },
    {
      id: "4",
      date: "2023-06-04",
      description: "وقود السيارة",
      amount: -200,
      category: "نقل",
      wallet: "الثانوية",
    },
    {
      id: "5",
      date: "2023-06-05",
      description: "مشتريات البقالة",
      amount: -180,
      category: "طعام",
      wallet: "الرئيسية",
    },
    {
      id: "6",
      date: "2023-06-06",
      description: "اشتراك النادي الرياضي",
      amount: -300,
      category: "صحة",
      wallet: "الثانوية",
    },
    {
      id: "7",
      date: "2023-06-07",
      description: "مكافأة العمل",
      amount: 1000,
      category: "دخل",
      wallet: "الرئيسية",
    },
  ],
  onFilterChange = () => {},
  onPageChange = () => {},
}: RecentTransactionsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // Filter transactions based on search term, category, and wallet
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchTerm === "" ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || transaction.category === selectedCategory;

    const matchesWallet =
      selectedWallet === "" || transaction.wallet === selectedWallet;

    return matchesSearch && matchesCategory && matchesWallet;
  });

  // Sort transactions if sort config is set
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;

    if (sortConfig.key === "amount") {
      return sortConfig.direction === "ascending"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get unique categories and wallets for filters
  const categories = Array.from(new Set(transactions.map((t) => t.category)));
  const wallets = Array.from(new Set(transactions.map((t) => t.wallet)));

  // Handle sorting
  const requestSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" | null = "ascending";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      category: selectedCategory,
      wallet: selectedWallet,
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-right">المعاملات الأخيرة</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>تصفية حسب التاريخ</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في المعاملات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-right"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">جميع الفئات</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع المحافظ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">جميع المحافظ</SelectItem>
              {wallets.map((wallet) => (
                <SelectItem key={wallet} value={wallet}>
                  {wallet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={applyFilters} className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>تطبيق التصفية</span>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableCaption>قائمة المعاملات المالية الأخيرة</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  <div className="flex items-center justify-between">
                    التاريخ
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("description")}
                >
                  <div className="flex items-center justify-between">
                    الوصف
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  <div className="flex items-center justify-between">
                    الفئة
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("wallet")}
                >
                  <div className="flex items-center justify-between">
                    المحفظة
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => requestSort("amount")}
                >
                  <div className="flex items-center justify-between">
                    المبلغ
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.wallet}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} ر.س
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    لا توجد معاملات تطابق معايير البحث
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RecentTransactions;
