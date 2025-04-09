"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR, enUS } from "date-fns/locale"
import { BarChart3, Calendar, Download, Eye, MoreHorizontal, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Order = {
  id: string
  orderNumber: string
  customer: string
  date: Date
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  items: number
}

export default function OrdersPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const translations = {
    pt: {
      orders: "Pedidos",
      search: "Buscar pedidos...",
      orderNumber: "Número do Pedido",
      customer: "Cliente",
      date: "Data",
      total: "Total",
      status: "Status",
      paymentStatus: "Status de Pagamento",
      items: "Itens",
      actions: "Ações",
      all: "Todos",
      pending: "Pendente",
      processing: "Processando",
      shipped: "Enviado",
      delivered: "Entregue",
      cancelled: "Cancelado",
      paid: "Pago",
      failed: "Falhou",
      filterByStatus: "Filtrar por Status",
      filterByPayment: "Filtrar por Pagamento",
      exportOrders: "Exportar Pedidos",
      viewOrder: "Ver Pedido",
      printOrder: "Imprimir Pedido",
      cancelOrder: "Cancelar Pedido",
      orderDetails: "Detalhes do Pedido",
      customerInformation: "Informações do Cliente",
      shippingAddress: "Endereço de Entrega",
      billingAddress: "Endereço de Cobrança",
      paymentMethod: "Método de Pagamento",
      orderItems: "Itens do Pedido",
      product: "Produto",
      quantity: "Quantidade",
      price: "Preço",
      subtotal: "Subtotal",
      shipping: "Frete",
      tax: "Impostos",
      orderTotal: "Total do Pedido",
      close: "Fechar",
      orderHistory: "Histórico do Pedido",
      orderCreated: "Pedido criado",
      paymentConfirmed: "Pagamento confirmado",
      orderProcessing: "Pedido em processamento",
      orderShipped: "Pedido enviado",
      orderDelivered: "Pedido entregue",
      creditCard: "Cartão de Crédito",
      paymentDetails: "Detalhes do Pagamento",
      transactionId: "ID da Transação",
      name: "Nome",
      email: "Email",
      phone: "Telefone",
    },
    en: {
      orders: "Orders",
      search: "Search orders...",
      orderNumber: "Order Number",
      customer: "Customer",
      date: "Date",
      total: "Total",
      status: "Status",
      paymentStatus: "Payment Status",
      items: "Items",
      actions: "Actions",
      all: "All",
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      paid: "Paid",
      failed: "Failed",
      filterByStatus: "Filter by Status",
      filterByPayment: "Filter by Payment",
      exportOrders: "Export Orders",
      viewOrder: "View Order",
      printOrder: "Print Order",
      cancelOrder: "Cancel Order",
      orderDetails: "Order Details",
      customerInformation: "Customer Information",
      shippingAddress: "Shipping Address",
      billingAddress: "Billing Address",
      paymentMethod: "Payment Method",
      orderItems: "Order Items",
      product: "Product",
      quantity: "Quantity",
      price: "Price",
      subtotal: "Subtotal",
      shipping: "Shipping",
      tax: "Tax",
      orderTotal: "Order Total",
      close: "Close",
      orderHistory: "Order History",
      orderCreated: "Order created",
      paymentConfirmed: "Payment confirmed",
      orderProcessing: "Order processing",
      orderShipped: "Order shipped",
      orderDelivered: "Order delivered",
      creditCard: "Credit Card",
      paymentDetails: "Payment Details",
      transactionId: "Transaction ID",
      name: "Name",
      email: "Email",
      phone: "Phone",
    },
  }

  const t = translations[language]

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "#ORD-2023-1001",
      customer: "Sophia Anderson",
      date: new Date(2023, 5, 15),
      total: 299.99,
      status: "delivered",
      paymentStatus: "paid",
      items: 3,
    },
    {
      id: "2",
      orderNumber: "#ORD-2023-1002",
      customer: "James Wilson",
      date: new Date(2023, 5, 16),
      total: 149.5,
      status: "shipped",
      paymentStatus: "paid",
      items: 2,
    },
    {
      id: "3",
      orderNumber: "#ORD-2023-1003",
      customer: "Emma Martinez",
      date: new Date(2023, 5, 17),
      total: 599.99,
      status: "processing",
      paymentStatus: "paid",
      items: 1,
    },
    {
      id: "4",
      orderNumber: "#ORD-2023-1004",
      customer: "Lucas Thompson",
      date: new Date(2023, 5, 18),
      total: 89.95,
      status: "pending",
      paymentStatus: "pending",
      items: 2,
    },
    {
      id: "5",
      orderNumber: "#ORD-2023-1005",
      customer: "Olivia Johnson",
      date: new Date(2023, 5, 19),
      total: 349.99,
      status: "delivered",
      paymentStatus: "paid",
      items: 4,
    },
    {
      id: "6",
      orderNumber: "#ORD-2023-1006",
      customer: "Noah Garcia",
      date: new Date(2023, 5, 20),
      total: 199.95,
      status: "cancelled",
      paymentStatus: "failed",
      items: 3,
    },
    {
      id: "7",
      orderNumber: "#ORD-2023-1007",
      customer: "Ava Rodriguez",
      date: new Date(2023, 5, 21),
      total: 129.99,
      status: "shipped",
      paymentStatus: "paid",
      items: 2,
    },
    {
      id: "8",
      orderNumber: "#ORD-2023-1008",
      customer: "Ethan Brown",
      date: new Date(2023, 5, 22),
      total: 499.99,
      status: "processing",
      paymentStatus: "paid",
      items: 1,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            {t.pending}
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            {t.processing}
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-600">
            {t.shipped}
          </Badge>
        )
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">{t.delivered}</Badge>
      case "cancelled":
        return <Badge variant="destructive">{t.cancelled}</Badge>
      default:
        return null
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">{t.paid}</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            {t.pending}
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">{t.failed}</Badge>
      default:
        return null
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesPayment && matchesSearch
  })

  const formatDate = (date: Date) => {
    return format(date, "PPP", { locale: language === "pt" ? ptBR : enUS })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: language === "pt" ? "BRL" : "USD",
    }).format(amount)
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
                <h2 className="text-2xl font-bold tracking-tight">{t.orders}</h2>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  {t.exportOrders}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t.orders}</CardTitle>
                  <CardDescription>
                    {language === "pt" ? "Gerencie e visualize todos os pedidos" : "Manage and view all orders"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="flex flex-1 items-center space-x-2">
                        <Input
                          placeholder={t.search}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="h-8 w-full md:w-[250px]"
                        />
                      </div>
                      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="h-8 w-full md:w-[180px]">
                            <SelectValue placeholder={t.filterByStatus} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.all}</SelectItem>
                            <SelectItem value="pending">{t.pending}</SelectItem>
                            <SelectItem value="processing">{t.processing}</SelectItem>
                            <SelectItem value="shipped">{t.shipped}</SelectItem>
                            <SelectItem value="delivered">{t.delivered}</SelectItem>
                            <SelectItem value="cancelled">{t.cancelled}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                          <SelectTrigger className="h-8 w-full md:w-[180px]">
                            <SelectValue placeholder={t.filterByPayment} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.all}</SelectItem>
                            <SelectItem value="paid">{t.paid}</SelectItem>
                            <SelectItem value="pending">{t.pending}</SelectItem>
                            <SelectItem value="failed">{t.failed}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t.orderNumber}</TableHead>
                            <TableHead>{t.customer}</TableHead>
                            <TableHead>{t.date}</TableHead>
                            <TableHead>{t.total}</TableHead>
                            <TableHead>{t.status}</TableHead>
                            <TableHead>{t.paymentStatus}</TableHead>
                            <TableHead className="text-center">{t.items}</TableHead>
                            <TableHead className="text-right">{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="h-24 text-center">
                                {language === "pt" ? "Nenhum pedido encontrado." : "No orders found."}
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{formatDate(order.date)}</TableCell>
                                <TableCell>{formatCurrency(order.total)}</TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                                <TableCell className="text-center">{order.items}</TableCell>
                                <TableCell className="text-right">
                                  <Dialog>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">{t.actions}</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                                        <DialogTrigger asChild>
                                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            {t.viewOrder}
                                          </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem>
                                          <Calendar className="mr-2 h-4 w-4" />
                                          {t.printOrder}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <X className="mr-2 h-4 w-4" />
                                          {t.cancelOrder}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                    {selectedOrder && (
                                      <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                          <DialogTitle>
                                            {t.orderDetails} - {selectedOrder.orderNumber}
                                          </DialogTitle>
                                          <DialogDescription>{formatDate(selectedOrder.date)}</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-6 py-4 md:grid-cols-2">
                                          <div className="space-y-4">
                                            <div>
                                              <h3 className="text-lg font-medium">{t.customerInformation}</h3>
                                              <div className="mt-2 space-y-1 text-sm">
                                                <p>
                                                  <span className="font-medium">{t.name}:</span>{" "}
                                                  {selectedOrder.customer}
                                                </p>
                                                <p>
                                                  <span className="font-medium">{t.email}:</span>{" "}
                                                  {selectedOrder.customer.toLowerCase().replace(" ", ".")}@example.com
                                                </p>
                                                <p>
                                                  <span className="font-medium">{t.phone}:</span> +1 (555) 123-4567
                                                </p>
                                              </div>
                                            </div>
                                            <div>
                                              <h3 className="text-lg font-medium">{t.shippingAddress}</h3>
                                              <div className="mt-2 space-y-1 text-sm">
                                                <p>{selectedOrder.customer}</p>
                                                <p>123 Main Street</p>
                                                <p>Apt 4B</p>
                                                <p>New York, NY 10001</p>
                                                <p>United States</p>
                                              </div>
                                            </div>
                                            <div>
                                              <h3 className="text-lg font-medium">{t.paymentMethod}</h3>
                                              <div className="mt-2 space-y-1 text-sm">
                                                <p>{t.creditCard}</p>
                                                <p>**** **** **** 4242</p>
                                                <p>
                                                  <span className="font-medium">{t.transactionId}:</span> TXN-
                                                  {Math.floor(Math.random() * 1000000)
                                                    .toString()
                                                    .padStart(6, "0")}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="space-y-4">
                                            <div>
                                              <h3 className="text-lg font-medium">{t.orderItems}</h3>
                                              <div className="mt-2">
                                                <Table>
                                                  <TableHeader>
                                                    <TableRow>
                                                      <TableHead>{t.product}</TableHead>
                                                      <TableHead className="text-right">{t.quantity}</TableHead>
                                                      <TableHead className="text-right">{t.price}</TableHead>
                                                    </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                    {Array.from({ length: selectedOrder.items }).map((_, index) => (
                                                      <TableRow key={index}>
                                                        <TableCell>
                                                          {language === "pt"
                                                            ? `Produto ${index + 1}`
                                                            : `Product ${index + 1}`}
                                                        </TableCell>
                                                        <TableCell className="text-right">1</TableCell>
                                                        <TableCell className="text-right">
                                                          {formatCurrency(selectedOrder.total / selectedOrder.items)}
                                                        </TableCell>
                                                      </TableRow>
                                                    ))}
                                                  </TableBody>
                                                </Table>
                                              </div>
                                            </div>
                                            <div className="rounded-md border p-4">
                                              <div className="space-y-2">
                                                <div className="flex justify-between">
                                                  <span>{t.subtotal}</span>
                                                  <span>{formatCurrency(selectedOrder.total * 0.85)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span>{t.shipping}</span>
                                                  <span>{formatCurrency(selectedOrder.total * 0.05)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span>{t.tax}</span>
                                                  <span>{formatCurrency(selectedOrder.total * 0.1)}</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-2 font-medium">
                                                  <span>{t.orderTotal}</span>
                                                  <span>{formatCurrency(selectedOrder.total)}</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <h3 className="text-lg font-medium">{t.orderHistory}</h3>
                                              <div className="mt-2 space-y-3">
                                                <div className="flex">
                                                  <div className="mr-4 flex flex-col items-center">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                      <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                                    </div>
                                                    <div className="h-full w-px bg-muted"></div>
                                                  </div>
                                                  <div>
                                                    <p className="font-medium">{t.orderCreated}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                      {formatDate(selectedOrder.date)}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex">
                                                  <div className="mr-4 flex flex-col items-center">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                      <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                                    </div>
                                                    <div className="h-full w-px bg-muted"></div>
                                                  </div>
                                                  <div>
                                                    <p className="font-medium">{t.paymentConfirmed}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                      {formatDate(
                                                        new Date(selectedOrder.date.getTime() + 1000 * 60 * 60),
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="flex">
                                                  <div className="mr-4 flex flex-col items-center">
                                                    <div
                                                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        selectedOrder.status === "pending"
                                                          ? "bg-muted text-muted-foreground"
                                                          : "bg-green-100 text-green-600"
                                                      }`}
                                                    >
                                                      <span
                                                        className={`h-2 w-2 rounded-full ${
                                                          selectedOrder.status === "pending"
                                                            ? "bg-muted-foreground"
                                                            : "bg-green-600"
                                                        }`}
                                                      ></span>
                                                    </div>
                                                    <div className="h-full w-px bg-muted"></div>
                                                  </div>
                                                  <div>
                                                    <p
                                                      className={
                                                        selectedOrder.status === "pending"
                                                          ? "text-muted-foreground"
                                                          : "font-medium"
                                                      }
                                                    >
                                                      {t.orderProcessing}
                                                    </p>
                                                    {selectedOrder.status !== "pending" && (
                                                      <p className="text-sm text-muted-foreground">
                                                        {formatDate(
                                                          new Date(selectedOrder.date.getTime() + 1000 * 60 * 60 * 24),
                                                        )}
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex">
                                                  <div className="mr-4 flex flex-col items-center">
                                                    <div
                                                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        selectedOrder.status === "pending" ||
                                                        selectedOrder.status === "processing"
                                                          ? "bg-muted text-muted-foreground"
                                                          : "bg-green-100 text-green-600"
                                                      }`}
                                                    >
                                                      <span
                                                        className={`h-2 w-2 rounded-full ${
                                                          selectedOrder.status === "pending" ||
                                                          selectedOrder.status === "processing"
                                                            ? "bg-muted-foreground"
                                                            : "bg-green-600"
                                                        }`}
                                                      ></span>
                                                    </div>
                                                    <div className="h-full w-px bg-muted"></div>
                                                  </div>
                                                  <div>
                                                    <p
                                                      className={
                                                        selectedOrder.status === "pending" ||
                                                        selectedOrder.status === "processing"
                                                          ? "text-muted-foreground"
                                                          : "font-medium"
                                                      }
                                                    >
                                                      {t.orderShipped}
                                                    </p>
                                                    {selectedOrder.status !== "pending" &&
                                                      selectedOrder.status !== "processing" && (
                                                        <p className="text-sm text-muted-foreground">
                                                          {formatDate(
                                                            new Date(
                                                              selectedOrder.date.getTime() + 1000 * 60 * 60 * 48,
                                                            ),
                                                          )}
                                                        </p>
                                                      )}
                                                  </div>
                                                </div>
                                                <div className="flex">
                                                  <div className="mr-4 flex flex-col items-center">
                                                    <div
                                                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        selectedOrder.status === "delivered"
                                                          ? "bg-green-100 text-green-600"
                                                          : "bg-muted text-muted-foreground"
                                                      }`}
                                                    >
                                                      <span
                                                        className={`h-2 w-2 rounded-full ${
                                                          selectedOrder.status === "delivered"
                                                            ? "bg-green-600"
                                                            : "bg-muted-foreground"
                                                        }`}
                                                      ></span>
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <p
                                                      className={
                                                        selectedOrder.status === "delivered"
                                                          ? "font-medium"
                                                          : "text-muted-foreground"
                                                      }
                                                    >
                                                      {t.orderDelivered}
                                                    </p>
                                                    {selectedOrder.status === "delivered" && (
                                                      <p className="text-sm text-muted-foreground">
                                                        {formatDate(
                                                          new Date(selectedOrder.date.getTime() + 1000 * 60 * 60 * 96),
                                                        )}
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex justify-end">
                                          <Button variant="outline">{t.close}</Button>
                                        </div>
                                      </DialogContent>
                                    )}
                                  </Dialog>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
