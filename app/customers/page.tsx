"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR, enUS } from "date-fns/locale"
import { BarChart3, Download, Eye, MoreHorizontal, Search, User, UserPlus } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Customer = {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  orders: number
  totalSpent: number
  lastOrder: Date
  joinDate: Date
  country: string
  phone: string
}

export default function CustomersPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const translations = {
    pt: {
      customers: "Clientes",
      search: "Buscar clientes...",
      name: "Nome",
      email: "Email",
      status: "Status",
      orders: "Pedidos",
      totalSpent: "Total Gasto",
      lastOrder: "Último Pedido",
      joinDate: "Data de Cadastro",
      actions: "Ações",
      active: "Ativo",
      inactive: "Inativo",
      all: "Todos",
      filterByStatus: "Filtrar por Status",
      addCustomer: "Adicionar Cliente",
      exportCustomers: "Exportar Clientes",
      customerDetails: "Detalhes do Cliente",
      viewCustomer: "Ver Cliente",
      editCustomer: "Editar Cliente",
      deleteCustomer: "Excluir Cliente",
      overview: "Visão Geral",
      orderHistory: "Histórico de Pedidos",
      notes: "Anotações",
      country: "País",
      phone: "Telefone",
      address: "Endereço",
      orderNumber: "Número do Pedido",
      orderDate: "Data do Pedido",
      orderTotal: "Total do Pedido",
      orderStatus: "Status do Pedido",
      noOrders: "Nenhum pedido encontrado.",
      addNote: "Adicionar Anotação",
      noNotes: "Nenhuma anotação encontrada.",
      pending: "Pendente",
      processing: "Processando",
      shipped: "Enviado",
      delivered: "Entregue",
      cancelled: "Cancelado",
      customerSince: "Cliente desde",
      totalOrders: "Total de Pedidos",
      averageOrderValue: "Valor Médio do Pedido",
      lastActivity: "Última Atividade",
      contactInformation: "Informações de Contato",
      shippingAddress: "Endereço de Entrega",
      billingAddress: "Endereço de Cobrança",
    },
    en: {
      customers: "Customers",
      search: "Search customers...",
      name: "Name",
      email: "Email",
      status: "Status",
      orders: "Orders",
      totalSpent: "Total Spent",
      lastOrder: "Last Order",
      joinDate: "Join Date",
      actions: "Actions",
      active: "Active",
      inactive: "Inactive",
      all: "All",
      filterByStatus: "Filter by Status",
      addCustomer: "Add Customer",
      exportCustomers: "Export Customers",
      customerDetails: "Customer Details",
      viewCustomer: "View Customer",
      editCustomer: "Edit Customer",
      deleteCustomer: "Delete Customer",
      overview: "Overview",
      orderHistory: "Order History",
      notes: "Notes",
      country: "Country",
      phone: "Phone",
      address: "Address",
      orderNumber: "Order Number",
      orderDate: "Order Date",
      orderTotal: "Order Total",
      orderStatus: "Order Status",
      noOrders: "No orders found.",
      addNote: "Add Note",
      noNotes: "No notes found.",
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      customerSince: "Customer since",
      totalOrders: "Total Orders",
      averageOrderValue: "Average Order Value",
      lastActivity: "Last Activity",
      contactInformation: "Contact Information",
      shippingAddress: "Shipping Address",
      billingAddress: "Billing Address",
    },
  }

  const t = translations[language]

  const customers: Customer[] = [
    {
      id: "1",
      name: "Sophia Anderson",
      email: "sophia.anderson@example.com",
      status: "active",
      orders: 12,
      totalSpent: 2450.75,
      lastOrder: new Date(2023, 5, 15),
      joinDate: new Date(2022, 2, 10),
      country: language === "pt" ? "Estados Unidos" : "United States",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james.wilson@example.com",
      status: "active",
      orders: 8,
      totalSpent: 1320.5,
      lastOrder: new Date(2023, 5, 10),
      joinDate: new Date(2022, 4, 15),
      country: language === "pt" ? "Canadá" : "Canada",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Emma Martinez",
      email: "emma.martinez@example.com",
      status: "inactive",
      orders: 3,
      totalSpent: 599.99,
      lastOrder: new Date(2023, 4, 20),
      joinDate: new Date(2022, 6, 5),
      country: language === "pt" ? "México" : "Mexico",
      phone: "+52 (555) 345-6789",
    },
    {
      id: "4",
      name: "Lucas Thompson",
      email: "lucas.thompson@example.com",
      status: "active",
      orders: 5,
      totalSpent: 875.25,
      lastOrder: new Date(2023, 5, 5),
      joinDate: new Date(2022, 8, 20),
      country: language === "pt" ? "Reino Unido" : "United Kingdom",
      phone: "+44 (555) 456-7890",
    },
    {
      id: "5",
      name: "Olivia Johnson",
      email: "olivia.johnson@example.com",
      status: "active",
      orders: 15,
      totalSpent: 3250.0,
      lastOrder: new Date(2023, 5, 18),
      joinDate: new Date(2021, 10, 15),
      country: language === "pt" ? "Austrália" : "Australia",
      phone: "+61 (555) 567-8901",
    },
    {
      id: "6",
      name: "Noah Garcia",
      email: "noah.garcia@example.com",
      status: "inactive",
      orders: 2,
      totalSpent: 350.5,
      lastOrder: new Date(2023, 3, 10),
      joinDate: new Date(2023, 1, 5),
      country: language === "pt" ? "Espanha" : "Spain",
      phone: "+34 (555) 678-9012",
    },
    {
      id: "7",
      name: "Ava Rodriguez",
      email: "ava.rodriguez@example.com",
      status: "active",
      orders: 7,
      totalSpent: 1150.75,
      lastOrder: new Date(2023, 5, 12),
      joinDate: new Date(2022, 5, 10),
      country: language === "pt" ? "Brasil" : "Brazil",
      phone: "+55 (555) 789-0123",
    },
    {
      id: "8",
      name: "Ethan Brown",
      email: "ethan.brown@example.com",
      status: "active",
      orders: 9,
      totalSpent: 1875.25,
      lastOrder: new Date(2023, 5, 8),
      joinDate: new Date(2022, 3, 15),
      country: language === "pt" ? "França" : "France",
      phone: "+33 (555) 890-1234",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">{t.active}</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            {t.inactive}
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
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
                <h2 className="text-2xl font-bold tracking-tight">{t.customers}</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    {t.exportCustomers}
                  </Button>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t.addCustomer}
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t.customers}</CardTitle>
                  <CardDescription>
                    {language === "pt" ? "Gerencie e visualize todos os clientes" : "Manage and view all customers"}
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
                            <SelectItem value="active">{t.active}</SelectItem>
                            <SelectItem value="inactive">{t.inactive}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>{t.name}</TableHead>
                            <TableHead>{t.email}</TableHead>
                            <TableHead>{t.status}</TableHead>
                            <TableHead className="text-center">{t.orders}</TableHead>
                            <TableHead>{t.totalSpent}</TableHead>
                            <TableHead>{t.lastOrder}</TableHead>
                            <TableHead className="text-right">{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCustomers.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="h-24 text-center">
                                {language === "pt" ? "Nenhum cliente encontrado." : "No customers found."}
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredCustomers.map((customer) => (
                              <TableRow key={customer.id}>
                                <TableCell>
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`/placeholder.svg?text=${getInitials(customer.name)}`} />
                                    <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                                  </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                                <TableCell className="text-center">{customer.orders}</TableCell>
                                <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                                <TableCell>{formatDate(customer.lastOrder)}</TableCell>
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
                                          <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            {t.viewCustomer}
                                          </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem>
                                          <User className="mr-2 h-4 w-4" />
                                          {t.editCustomer}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                    {selectedCustomer && (
                                      <DialogContent className="max-w-4xl">
                                        <DialogHeader>
                                          <DialogTitle>{t.customerDetails}</DialogTitle>
                                          <DialogDescription>
                                            {selectedCustomer.name} - {selectedCustomer.email}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <Tabs defaultValue="overview" className="w-full">
                                          <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                                            <TabsTrigger value="orders">{t.orderHistory}</TabsTrigger>
                                            <TabsTrigger value="notes">{t.notes}</TabsTrigger>
                                          </TabsList>
                                          <TabsContent value="overview" className="space-y-4 py-4">
                                            <div className="grid gap-6 md:grid-cols-2">
                                              <Card>
                                                <CardHeader>
                                                  <CardTitle>{t.overview}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                  <div className="space-y-4">
                                                    <div className="flex items-center">
                                                      <Avatar className="h-16 w-16 mr-4">
                                                        <AvatarImage
                                                          src={`/placeholder.svg?text=${getInitials(
                                                            selectedCustomer.name,
                                                          )}`}
                                                        />
                                                        <AvatarFallback>
                                                          {getInitials(selectedCustomer.name)}
                                                        </AvatarFallback>
                                                      </Avatar>
                                                      <div>
                                                        <h3 className="text-lg font-medium">{selectedCustomer.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                          {selectedCustomer.email}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.customerSince}
                                                        </p>
                                                        <p>{formatDate(selectedCustomer.joinDate)}</p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.status}
                                                        </p>
                                                        <p>{getStatusBadge(selectedCustomer.status)}</p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.totalOrders}
                                                        </p>
                                                        <p>{selectedCustomer.orders}</p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.totalSpent}
                                                        </p>
                                                        <p>{formatCurrency(selectedCustomer.totalSpent)}</p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.averageOrderValue}
                                                        </p>
                                                        <p>
                                                          {formatCurrency(
                                                            selectedCustomer.totalSpent / selectedCustomer.orders,
                                                          )}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.lastActivity}
                                                        </p>
                                                        <p>{formatDate(selectedCustomer.lastOrder)}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </CardContent>
                                              </Card>
                                              <div className="space-y-4">
                                                <Card>
                                                  <CardHeader>
                                                    <CardTitle>{t.contactInformation}</CardTitle>
                                                  </CardHeader>
                                                  <CardContent>
                                                    <div className="space-y-2">
                                                      <div className="grid grid-cols-2 gap-1">
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.email}
                                                        </p>
                                                        <p className="text-sm">{selectedCustomer.email}</p>
                                                      </div>
                                                      <div className="grid grid-cols-2 gap-1">
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.phone}
                                                        </p>
                                                        <p className="text-sm">{selectedCustomer.phone}</p>
                                                      </div>
                                                      <div className="grid grid-cols-2 gap-1">
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                          {t.country}
                                                        </p>
                                                        <p className="text-sm">{selectedCustomer.country}</p>
                                                      </div>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                                <Card>
                                                  <CardHeader>
                                                    <CardTitle>{t.shippingAddress}</CardTitle>
                                                  </CardHeader>
                                                  <CardContent>
                                                    <div className="space-y-1 text-sm">
                                                      <p>{selectedCustomer.name}</p>
                                                      <p>123 Main Street</p>
                                                      <p>Apt 4B</p>
                                                      <p>New York, NY 10001</p>
                                                      <p>{selectedCustomer.country}</p>
                                                    </div>
                                                  </CardContent>
                                                </Card>
                                              </div>
                                            </div>
                                          </TabsContent>
                                          <TabsContent value="orders" className="space-y-4 py-4">
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead>{t.orderNumber}</TableHead>
                                                  <TableHead>{t.orderDate}</TableHead>
                                                  <TableHead>{t.orderStatus}</TableHead>
                                                  <TableHead className="text-right">{t.orderTotal}</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {Array.from({ length: selectedCustomer.orders }).map((_, index) => {
                                                  const orderDate = new Date(
                                                    selectedCustomer.lastOrder.getTime() -
                                                      index * 1000 * 60 * 60 * 24 * 30,
                                                  )
                                                  const orderTotal =
                                                    selectedCustomer.totalSpent / selectedCustomer.orders
                                                  const statuses = ["delivered", "shipped", "processing", "pending"]
                                                  const status = statuses[index % statuses.length]

                                                  const getOrderStatusBadge = (status: string) => {
                                                    switch (status) {
                                                      case "pending":
                                                        return (
                                                          <Badge
                                                            variant="outline"
                                                            className="text-yellow-600 border-yellow-600"
                                                          >
                                                            {t.pending}
                                                          </Badge>
                                                        )
                                                      case "processing":
                                                        return (
                                                          <Badge
                                                            variant="outline"
                                                            className="text-blue-600 border-blue-600"
                                                          >
                                                            {t.processing}
                                                          </Badge>
                                                        )
                                                      case "shipped":
                                                        return (
                                                          <Badge
                                                            variant="outline"
                                                            className="text-purple-600 border-purple-600"
                                                          >
                                                            {t.shipped}
                                                          </Badge>
                                                        )
                                                      case "delivered":
                                                        return (
                                                          <Badge className="bg-green-500 hover:bg-green-600">
                                                            {t.delivered}
                                                          </Badge>
                                                        )
                                                      default:
                                                        return null
                                                    }
                                                  }

                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell>
                                                        #{(1000 + index).toString().padStart(4, "0")}
                                                      </TableCell>
                                                      <TableCell>{formatDate(orderDate)}</TableCell>
                                                      <TableCell>{getOrderStatusBadge(status)}</TableCell>
                                                      <TableCell className="text-right">
                                                        {formatCurrency(orderTotal)}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                })}
                                              </TableBody>
                                            </Table>
                                          </TabsContent>
                                          <TabsContent value="notes" className="space-y-4 py-4">
                                            <div className="flex justify-between">
                                              <h3 className="text-lg font-medium">{t.notes}</h3>
                                              <Button size="sm">{t.addNote}</Button>
                                            </div>
                                            <div className="rounded-md border p-4 text-center text-muted-foreground">
                                              {t.noNotes}
                                            </div>
                                          </TabsContent>
                                        </Tabs>
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
