"use client"

import { useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProductsTable } from "@/components/products-table"
import { UserNav } from "@/components/user-nav"
import { BarChart3, CreditCard, DollarSign, Search, ShoppingCart, Users } from "lucide-react"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function DashboardPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")

  const translations = {
    pt: {
      dashboard: "Painel de Controle",
      overview: "Visão Geral",
      analytics: "Análises",
      products: "Produtos",
      customers: "Clientes",
      orders: "Pedidos",
      totalRevenue: "Receita Total",
      salesThisMonth: "Vendas este mês",
      totalSales: "Total de Vendas",
      activeUsers: "Usuários Ativos",
      revenueOverTime: "Receita ao Longo do Tempo",
      topSellingProducts: "Produtos Mais Vendidos",
      recentOrders: "Pedidos Recentes",
      search: "Buscar...",
      viewAll: "Ver Todos",
      lastUpdated: "Última atualização",
      today: "Hoje",
      thisWeek: "Esta Semana",
      thisMonth: "Este Mês",
      thisYear: "Este Ano",
      product: "Produto",
      price: "Preço",
      status: "Status",
      category: "Categoria",
      stock: "Estoque",
      actions: "Ações",
      inStock: "Em Estoque",
      lowStock: "Estoque Baixo",
      outOfStock: "Sem Estoque",
      all: "Todos",
      electronics: "Eletrônicos",
      clothing: "Roupas",
      furniture: "Móveis",
      filterByCategory: "Filtrar por Categoria",
      filterByStatus: "Filtrar por Status",
    },
    en: {
      dashboard: "Dashboard",
      overview: "Overview",
      analytics: "Analytics",
      products: "Products",
      customers: "Customers",
      orders: "Orders",
      totalRevenue: "Total Revenue",
      salesThisMonth: "Sales This Month",
      totalSales: "Total Sales",
      activeUsers: "Active Users",
      revenueOverTime: "Revenue Over Time",
      topSellingProducts: "Top Selling Products",
      recentOrders: "Recent Orders",
      search: "Search...",
      viewAll: "View All",
      lastUpdated: "Last Updated",
      today: "Today",
      thisWeek: "This Week",
      thisMonth: "This Month",
      thisYear: "This Year",
      product: "Product",
      price: "Price",
      status: "Status",
      category: "Category",
      stock: "Stock",
      actions: "Actions",
      inStock: "In Stock",
      lowStock: "Low Stock",
      outOfStock: "Out of Stock",
      all: "All",
      electronics: "Electronics",
      clothing: "Clothing",
      furniture: "Furniture",
      filterByCategory: "Filter by Category",
      filterByStatus: "Filter by Status",
    },
  }

  const t = translations[language]

  // Chart data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: language === "pt" ? "Receita" : "Revenue",
        data: [18000, 22000, 19500, 24000, 25500, 27000, 29500, 32000, 31000, 33500, 36000, 38500],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
      },
    ],
  }

  const topProductsData = {
    labels: [
      language === "pt" ? "Smartphone Premium" : "Premium Smartphone",
      language === "pt" ? "Notebook Ultra" : "Ultra Laptop",
      language === "pt" ? "Fones Sem Fio" : "Wireless Headphones",
      language === "pt" ? "Smart TV 4K" : "4K Smart TV",
      language === "pt" ? "Câmera Digital" : "Digital Camera",
    ],
    datasets: [
      {
        label: language === "pt" ? "Vendas" : "Sales",
        data: [1250, 980, 750, 620, 540],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(79, 70, 229, 0.8)",
          "rgba(67, 56, 202, 0.8)",
          "rgba(55, 48, 163, 0.8)",
          "rgba(49, 46, 129, 0.8)",
        ],
      },
    ],
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-2 font-semibold">
              <BarChart3 className="h-6 w-6" />
              <span className="hidden md:inline-block">
                {language === "pt" ? "Painel Administrativo" : "Admin Dashboard"}
              </span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder={t.search} className="w-full rounded-md pl-8 md:w-64" />
              </div>
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="grid flex-1 md:grid-cols-[220px_1fr]">
          <DashboardNav language={language} />
          <main className="flex-1 p-4 md:p-6">
            <div className="flex flex-col space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{t.overview}</h2>
                <div className="flex items-center gap-2">
                  <Tabs defaultValue="today" className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="today">{t.today}</TabsTrigger>
                      <TabsTrigger value="week">{t.thisWeek}</TabsTrigger>
                      <TabsTrigger value="month">{t.thisMonth}</TabsTrigger>
                      <TabsTrigger value="year">{t.thisYear}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.totalRevenue}</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 452.890</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% {language === "pt" ? "em relação ao mês passado" : "from last month"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.salesThisMonth}</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +12.2% {language === "pt" ? "em relação ao mês passado" : "from last month"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.totalSales}</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +8.4% {language === "pt" ? "em relação ao mês passado" : "from last month"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.activeUsers}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +6.1% {language === "pt" ? "em relação ao mês passado" : "from last month"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>{t.revenueOverTime}</CardTitle>
                    <CardDescription>
                      {language === "pt"
                        ? "Receita mensal durante o ano atual"
                        : "Monthly revenue for the current year"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Line data={revenueData} options={chartOptions} height={80} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>{t.topSellingProducts}</CardTitle>
                    <CardDescription>
                      {language === "pt" ? "Produtos mais vendidos este mês" : "Top selling products this month"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar
                      data={topProductsData}
                      options={{
                        ...chartOptions,
                        indexAxis: "y" as const,
                      }}
                      height={220}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{t.products}</CardTitle>
                      <CardDescription>
                        {language === "pt" ? "Gerencie seus produtos e estoque" : "Manage your products and inventory"}
                      </CardDescription>
                    </div>
                    <Button variant="outline">{t.viewAll}</Button>
                  </CardHeader>
                  <CardContent>
                    <ProductsTable language={language} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
