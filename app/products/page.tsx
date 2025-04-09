"use client"

import { useState } from "react"
import { BarChart3, Download, Edit, MoreHorizontal, Plus, Search, Trash, Eye } from "lucide-react"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Product = {
  id: string
  name: string
  price: number
  category: "electronics" | "clothing" | "furniture" | "accessories"
  status: "in-stock" | "low-stock" | "out-of-stock"
  stock: number
  sku: string
  description: string
  image: string
}

export default function ProductsPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const translations = {
    pt: {
      products: "Produtos",
      search: "Buscar produtos...",
      product: "Produto",
      price: "Preço",
      status: "Status",
      category: "Categoria",
      stock: "Estoque",
      sku: "SKU",
      actions: "Ações",
      inStock: "Em Estoque",
      lowStock: "Estoque Baixo",
      outOfStock: "Sem Estoque",
      all: "Todos",
      electronics: "Eletrônicos",
      clothing: "Roupas",
      furniture: "Móveis",
      accessories: "Acessórios",
      filterByCategory: "Filtrar por Categoria",
      filterByStatus: "Filtrar por Status",
      addProduct: "Adicionar Produto",
      exportProducts: "Exportar Produtos",
      editProduct: "Editar Produto",
      deleteProduct: "Excluir Produto",
      productDetails: "Detalhes do Produto",
      productName: "Nome do Produto",
      productDescription: "Descrição do Produto",
      productPrice: "Preço do Produto",
      productCategory: "Categoria do Produto",
      productStatus: "Status do Produto",
      productStock: "Estoque do Produto",
      productSKU: "SKU do Produto",
      productImage: "Imagem do Produto",
      save: "Salvar",
      cancel: "Cancelar",
      confirmDelete: "Confirmar Exclusão",
      confirmDeleteMessage: "Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.",
      delete: "Excluir",
      basicInfo: "Informações Básicas",
      inventory: "Inventário",
      images: "Imagens",
      uploadImage: "Enviar Imagem",
      dragAndDrop: "Arraste e solte uma imagem aqui ou clique para selecionar",
      view: "Visualizar",
      edit: "Editar",
      details: "Detalhes",
    },
    en: {
      products: "Products",
      search: "Search products...",
      product: "Product",
      price: "Price",
      status: "Status",
      category: "Category",
      stock: "Stock",
      sku: "SKU",
      actions: "Actions",
      inStock: "In Stock",
      lowStock: "Low Stock",
      outOfStock: "Out of Stock",
      all: "All",
      electronics: "Electronics",
      clothing: "Clothing",
      furniture: "Furniture",
      accessories: "Accessories",
      filterByCategory: "Filter by Category",
      filterByStatus: "Filter by Status",
      addProduct: "Add Product",
      exportProducts: "Export Products",
      editProduct: "Edit Product",
      deleteProduct: "Delete Product",
      productDetails: "Product Details",
      productName: "Product Name",
      productDescription: "Product Description",
      productPrice: "Product Price",
      productCategory: "Product Category",
      productStatus: "Product Status",
      productStock: "Product Stock",
      productSKU: "Product SKU",
      productImage: "Product Image",
      save: "Save",
      cancel: "Cancel",
      confirmDelete: "Confirm Deletion",
      confirmDeleteMessage: "Are you sure you want to delete this product? This action cannot be undone.",
      delete: "Delete",
      basicInfo: "Basic Information",
      inventory: "Inventory",
      images: "Images",
      uploadImage: "Upload Image",
      dragAndDrop: "Drag and drop an image here or click to select",
      view: "View",
      edit: "Edit",
      details: "Details",
    },
  }

  const t = translations[language]

  const products: Product[] = [
    {
      id: "1",
      name: language === "pt" ? "Smartphone Premium" : "Premium Smartphone",
      price: 1299.99,
      category: "electronics",
      status: "in-stock",
      stock: 45,
      sku: "SP-1001",
      description:
        language === "pt"
          ? "Smartphone de última geração com câmera de alta resolução e processador potente."
          : "Latest generation smartphone with high-resolution camera and powerful processor.",
      image: "/placeholder.svg",
    },
    {
      id: "2",
      name: language === "pt" ? "Notebook Ultra" : "Ultra Laptop",
      price: 2499.99,
      category: "electronics",
      status: "in-stock",
      stock: 28,
      sku: "NB-2002",
      description:
        language === "pt"
          ? "Notebook ultrafino com tela de alta definição e bateria de longa duração."
          : "Ultra-thin laptop with high-definition display and long-lasting battery.",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      name: language === "pt" ? "Fones Sem Fio" : "Wireless Headphones",
      price: 199.99,
      category: "electronics",
      status: "low-stock",
      stock: 10,
      sku: "HP-3003",
      description:
        language === "pt"
          ? "Fones de ouvido sem fio com cancelamento de ruído e qualidade de som excepcional."
          : "Wireless headphones with noise cancellation and exceptional sound quality.",
      image: "/placeholder.svg",
    },
    {
      id: "4",
      name: language === "pt" ? "Camiseta Premium" : "Premium T-Shirt",
      price: 49.99,
      category: "clothing",
      status: "in-stock",
      stock: 120,
      sku: "TS-4004",
      description:
        language === "pt"
          ? "Camiseta de algodão de alta qualidade com design moderno."
          : "High-quality cotton t-shirt with modern design.",
      image: "/placeholder.svg",
    },
    {
      id: "5",
      name: language === "pt" ? "Calça Jeans" : "Jeans",
      price: 89.99,
      category: "clothing",
      status: "in-stock",
      stock: 75,
      sku: "JN-5005",
      description:
        language === "pt"
          ? "Calça jeans durável e confortável com estilo clássico."
          : "Durable and comfortable jeans with classic style.",
      image: "/placeholder.svg",
    },
    {
      id: "6",
      name: language === "pt" ? "Sofá Moderno" : "Modern Sofa",
      price: 899.99,
      category: "furniture",
      status: "out-of-stock",
      stock: 0,
      sku: "SF-6006",
      description:
        language === "pt"
          ? "Sofá moderno com estofamento de alta qualidade e design elegante."
          : "Modern sofa with high-quality upholstery and elegant design.",
      image: "/placeholder.svg",
    },
    {
      id: "7",
      name: language === "pt" ? "Mesa de Jantar" : "Dining Table",
      price: 599.99,
      category: "furniture",
      status: "low-stock",
      stock: 5,
      sku: "DT-7007",
      description:
        language === "pt"
          ? "Mesa de jantar espaçosa com acabamento em madeira natural."
          : "Spacious dining table with natural wood finish.",
      image: "/placeholder.svg",
    },
    {
      id: "8",
      name: language === "pt" ? "Relógio Elegante" : "Elegant Watch",
      price: 299.99,
      category: "accessories",
      status: "in-stock",
      stock: 30,
      sku: "WT-8008",
      description:
        language === "pt"
          ? "Relógio elegante com pulseira de couro e movimento preciso."
          : "Elegant watch with leather strap and precise movement.",
      image: "/placeholder.svg",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500 hover:bg-green-600">{t.inStock}</Badge>
      case "low-stock":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            {t.lowStock}
          </Badge>
        )
      case "out-of-stock":
        return <Badge variant="destructive">{t.outOfStock}</Badge>
      default:
        return null
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "electronics":
        return t.electronics
      case "clothing":
        return t.clothing
      case "furniture":
        return t.furniture
      case "accessories":
        return t.accessories
      default:
        return category
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesStatus && matchesSearch
  })

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
                <h2 className="text-2xl font-bold tracking-tight">{t.products}</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    {t.exportProducts}
                  </Button>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        {t.addProduct}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{t.addProduct}</DialogTitle>
                        <DialogDescription>
                          {language === "pt"
                            ? "Preencha os detalhes do produto abaixo. Clique em salvar quando terminar."
                            : "Fill in the product details below. Click save when you're done."}
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="basic">{t.basicInfo}</TabsTrigger>
                          <TabsTrigger value="inventory">{t.inventory}</TabsTrigger>
                          <TabsTrigger value="images">{t.images}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic" className="space-y-4 py-4">
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">{t.productName}</Label>
                              <Input id="name" placeholder={t.productName} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">{t.productDescription}</Label>
                              <Textarea id="description" placeholder={t.productDescription} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="price">{t.productPrice}</Label>
                              <Input id="price" type="number" placeholder="0.00" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="category">{t.productCategory}</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.productCategory} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="electronics">{t.electronics}</SelectItem>
                                  <SelectItem value="clothing">{t.clothing}</SelectItem>
                                  <SelectItem value="furniture">{t.furniture}</SelectItem>
                                  <SelectItem value="accessories">{t.accessories}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="inventory" className="space-y-4 py-4">
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="sku">{t.productSKU}</Label>
                              <Input id="sku" placeholder={t.productSKU} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="stock">{t.productStock}</Label>
                              <Input id="stock" type="number" placeholder="0" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="status">{t.productStatus}</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.productStatus} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="in-stock">{t.inStock}</SelectItem>
                                  <SelectItem value="low-stock">{t.lowStock}</SelectItem>
                                  <SelectItem value="out-of-stock">{t.outOfStock}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="images" className="space-y-4 py-4">
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label>{t.productImage}</Label>
                              <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed p-4 text-center">
                                <div className="space-y-2">
                                  <div className="flex justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-8 w-8 text-muted-foreground"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{t.dragAndDrop}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                          {t.cancel}
                        </Button>
                        <Button onClick={() => setIsAddProductOpen(false)}>{t.save}</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t.products}</CardTitle>
                  <CardDescription>
                    {language === "pt" ? "Gerencie e visualize todos os produtos" : "Manage and view all products"}
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
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="h-8 w-full md:w-[180px]">
                            <SelectValue placeholder={t.filterByCategory} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.all}</SelectItem>
                            <SelectItem value="electronics">{t.electronics}</SelectItem>
                            <SelectItem value="clothing">{t.clothing}</SelectItem>
                            <SelectItem value="furniture">{t.furniture}</SelectItem>
                            <SelectItem value="accessories">{t.accessories}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="h-8 w-full md:w-[180px]">
                            <SelectValue placeholder={t.filterByStatus} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.all}</SelectItem>
                            <SelectItem value="in-stock">{t.inStock}</SelectItem>
                            <SelectItem value="low-stock">{t.lowStock}</SelectItem>
                            <SelectItem value="out-of-stock">{t.outOfStock}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[80px]">{t.productImage}</TableHead>
                            <TableHead className="w-[250px]">{t.product}</TableHead>
                            <TableHead>{t.price}</TableHead>
                            <TableHead>{t.category}</TableHead>
                            <TableHead>{t.status}</TableHead>
                            <TableHead className="text-right">{t.stock}</TableHead>
                            <TableHead>{t.sku}</TableHead>
                            <TableHead className="text-right">{t.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="h-24 text-center">
                                {language === "pt" ? "Nenhum produto encontrado." : "No products found."}
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{formatCurrency(product.price)}</TableCell>
                                <TableCell>{getCategoryLabel(product.category)}</TableCell>
                                <TableCell>{getStatusBadge(product.status)}</TableCell>
                                <TableCell className="text-right">{product.stock}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">{t.actions}</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        {t.edit}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        {t.view}
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                        <DialogTrigger asChild>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => setSelectedProduct(product)}
                                          >
                                            <Trash className="mr-2 h-4 w-4" />
                                            {t.delete}
                                          </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>{t.confirmDelete}</DialogTitle>
                                            <DialogDescription>{t.confirmDeleteMessage}</DialogDescription>
                                          </DialogHeader>
                                          <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                              {t.cancel}
                                            </Button>
                                            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                                              {t.delete}
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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
