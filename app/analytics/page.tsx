"use client"

import { useState } from "react"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { BarChart3, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [period, setPeriod] = useState<string>("month")

  const translations = {
    pt: {
      analytics: "Análises",
      overview: "Visão Geral",
      salesPerformance: "Desempenho de Vendas",
      revenueByCategory: "Receita por Categoria",
      customerAcquisition: "Aquisição de Clientes",
      conversionRate: "Taxa de Conversão",
      topSellingProducts: "Produtos Mais Vendidos",
      salesByChannel: "Vendas por Canal",
      search: "Buscar...",
      today: "Hoje",
      thisWeek: "Esta Semana",
      thisMonth: "Este Mês",
      thisYear: "Este Ano",
      lastMonth: "Mês Passado",
      last3Months: "Últimos 3 Meses",
      last6Months: "Últimos 6 Meses",
      lastYear: "Último Ano",
      compareWith: "Comparar com",
      noComparison: "Sem comparação",
      previousPeriod: "Período anterior",
      sameTimePreviousYear: "Mesmo período do ano anterior",
      revenue: "Receita",
      orders: "Pedidos",
      customers: "Clientes",
      averageOrderValue: "Valor Médio do Pedido",
      conversionRateLabel: "Taxa de Conversão",
      electronics: "Eletrônicos",
      clothing: "Roupas",
      furniture: "Móveis",
      accessories: "Acessórios",
      website: "Website",
      mobileApp: "Aplicativo Móvel",
      marketplace: "Marketplace",
      socialMedia: "Redes Sociais",
      newCustomers: "Novos Clientes",
      returningCustomers: "Clientes Recorrentes",
      visitors: "Visitantes",
      conversionRateValue: "Taxa de Conversão",
      exportData: "Exportar Dados",
      printReport: "Imprimir Relatório",
    },
    en: {
      analytics: "Analytics",
      overview: "Overview",
      salesPerformance: "Sales Performance",
      revenueByCategory: "Revenue by Category",
      customerAcquisition: "Customer Acquisition",
      conversionRate: "Conversion Rate",
      topSellingProducts: "Top Selling Products",
      salesByChannel: "Sales by Channel",
      search: "Search...",
      today: "Today",
      thisWeek: "This Week",
      thisMonth: "This Month",
      thisYear: "This Year",
      lastMonth: "Last Month",
      last3Months: "Last 3 Months",
      last6Months: "Last 6 Months",
      lastYear: "Last Year",
      compareWith: "Compare with",
      noComparison: "No comparison",
      previousPeriod: "Previous period",
      sameTimePreviousYear: "Same time previous year",
      revenue: "Revenue",
      orders: "Orders",
      customers: "Customers",
      averageOrderValue: "Average Order Value",
      conversionRateLabel: "Conversion Rate",
      electronics: "Electronics",
      clothing: "Clothing",
      furniture: "Furniture",
      accessories: "Accessories",
      website: "Website",
      mobileApp: "Mobile App",
      marketplace: "Marketplace",
      socialMedia: "Social Media",
      newCustomers: "New Customers",
      returningCustomers: "Returning Customers",
      visitors: "Visitors",
      conversionRateValue: "Conversion Rate",
      exportData: "Export Data",
      printReport: "Print Report",
    },
  }

  const t = translations[language]

  // Chart data
  const salesPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: language === "pt" ? "Receita Atual" : "Current Revenue",
        data: [18000, 22000, 19500, 24000, 25500, 27000, 29500, 32000, 31000, 33500, 36000, 38500],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
      },
      {
        label: language === "pt" ? "Receita Anterior" : "Previous Revenue",
        data: [15000, 19000, 17000, 21000, 22000, 23500, 26000, 28000, 27000, 29500, 31000, 33000],
        borderColor: "rgb(156, 163, 175)",
        backgroundColor: "rgba(156, 163, 175, 0.5)",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  }

  const categoryData = {
    labels: [t.electronics, t.clothing, t.furniture, t.accessories],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(79, 70, 229, 0.8)",
          "rgba(67, 56, 202, 0.8)",
          "rgba(55, 48, 163, 0.8)",
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  }

  const channelData = {
    labels: [t.website, t.mobileApp, t.marketplace, t.socialMedia],
    datasets: [
      {
        label: language === "pt" ? "Vendas" : "Sales",
        data: [45, 25, 20, 10],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(79, 70, 229, 0.8)",
          "rgba(67, 56, 202, 0.8)",
          "rgba(55, 48, 163, 0.8)",
        ],
      },
    ],
  }

  const customerAcquisitionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: t.newCustomers,
        data: [120, 150, 180, 170, 160, 190, 210, 230, 240, 250, 270, 290],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
      {
        label: t.returningCustomers,
        data: [80, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
  }

  const conversionRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: t.visitors,
        type: "bar" as const,
        data: [1200, 1300, 1400, 1350, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200],
        backgroundColor: "rgba(156, 163, 175, 0.5)",
        yAxisID: "y",
      },
      {
        label: t.conversionRateValue,
        type: "line" as const,
        data: [3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.7],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        yAxisID: "y1",
        tension: 0.3,
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

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  const conversionChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: language === "pt" ? "Visitantes" : "Visitors",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "%",
        },
        min: 0,
        max: 10,
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
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <h2 className="text-2xl font-bold tracking-tight">{t.analytics}</h2>
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                  <Tabs value={period} onValueChange={setPeriod} className="w-full md:w-auto">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="week">{t.thisWeek}</TabsTrigger>
                      <TabsTrigger value="month">{t.thisMonth}</TabsTrigger>
                      <TabsTrigger value="quarter">{t.last3Months}</TabsTrigger>
                      <TabsTrigger value="year">{t.thisYear}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Select defaultValue="previous">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder={t.compareWith} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t.noComparison}</SelectItem>
                      <SelectItem value="previous">{t.previousPeriod}</SelectItem>
                      <SelectItem value="lastYear">{t.sameTimePreviousYear}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.revenue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 452.890</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% {language === "pt" ? "em relação ao período anterior" : "from previous period"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.orders}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">
                      +12.2% {language === "pt" ? "em relação ao período anterior" : "from previous period"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.customers}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +6.1% {language === "pt" ? "em relação ao período anterior" : "from previous period"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.averageOrderValue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 192.80</div>
                    <p className="text-xs text-muted-foreground">
                      +2.5% {language === "pt" ? "em relação ao período anterior" : "from previous period"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>{t.salesPerformance}</CardTitle>
                    <CardDescription>
                      {language === "pt"
                        ? "Comparação de receita com o período anterior"
                        : "Revenue comparison with previous period"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Line data={salesPerformanceData} options={chartOptions} height={80} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>{t.revenueByCategory}</CardTitle>
                    <CardDescription>
                      {language === "pt"
                        ? "Distribuição de receita por categoria de produto"
                        : "Revenue distribution by product category"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-[220px] w-[220px]">
                      <Doughnut data={categoryData} options={doughnutOptions} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.customerAcquisition}</CardTitle>
                    <CardDescription>
                      {language === "pt"
                        ? "Novos clientes vs clientes recorrentes"
                        : "New customers vs returning customers"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={customerAcquisitionData} options={chartOptions} height={250} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.conversionRate}</CardTitle>
                    <CardDescription>
                      {language === "pt" ? "Visitantes vs taxa de conversão" : "Visitors vs conversion rate"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={conversionRateData} options={conversionChartOptions} height={250} />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.salesByChannel}</CardTitle>
                    <CardDescription>
                      {language === "pt" ? "Distribuição de vendas por canal" : "Sales distribution by channel"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Bar data={channelData} options={chartOptions} height={250} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{t.topSellingProducts}</CardTitle>
                      <CardDescription>
                        {language === "pt" ? "Produtos com melhor desempenho" : "Best performing products"}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {language === "pt" ? "Smartphone Premium" : "Premium Smartphone"}
                          </div>
                          <div>1,250 {language === "pt" ? "unidades" : "units"}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[80%] rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{language === "pt" ? "Notebook Ultra" : "Ultra Laptop"}</div>
                          <div>980 {language === "pt" ? "unidades" : "units"}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[65%] rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {language === "pt" ? "Fones Sem Fio" : "Wireless Headphones"}
                          </div>
                          <div>750 {language === "pt" ? "unidades" : "units"}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[50%] rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{language === "pt" ? "Smart TV 4K" : "4K Smart TV"}</div>
                          <div>620 {language === "pt" ? "unidades" : "units"}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[40%] rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{language === "pt" ? "Câmera Digital" : "Digital Camera"}</div>
                          <div>540 {language === "pt" ? "unidades" : "units"}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[35%] rounded-full bg-indigo-500"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">{t.exportData}</Button>
                <Button variant="outline">{t.printReport}</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
