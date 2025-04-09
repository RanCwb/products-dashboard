"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ProductsTableProps {
  language: "pt" | "en"
}

type Product = {
  id: string
  name: string
  price: number
  category: "electronics" | "clothing" | "furniture"
  status: "in-stock" | "low-stock" | "out-of-stock"
  stock: number
}

export function ProductsTable({ language }: ProductsTableProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const translations = {
    pt: {
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
      search: "Buscar produtos...",
      edit: "Editar",
      delete: "Excluir",
      view: "Visualizar",
    },
    en: {
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
      search: "Search products...",
      edit: "Edit",
      delete: "Delete",
      view: "View",
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
    },
    {
      id: "2",
      name: language === "pt" ? "Notebook Ultra" : "Ultra Laptop",
      price: 2499.99,
      category: "electronics",
      status: "in-stock",
      stock: 28,
    },
    {
      id: "3",
      name: language === "pt" ? "Fones Sem Fio" : "Wireless Headphones",
      price: 199.99,
      category: "electronics",
      status: "low-stock",
      stock: 10,
    },
    {
      id: "4",
      name: language === "pt" ? "Camiseta Premium" : "Premium T-Shirt",
      price: 49.99,
      category: "clothing",
      status: "in-stock",
      stock: 120,
    },
    {
      id: "5",
      name: language === "pt" ? "Calça Jeans" : "Jeans",
      price: 89.99,
      category: "clothing",
      status: "in-stock",
      stock: 75,
    },
    {
      id: "6",
      name: language === "pt" ? "Sofá Moderno" : "Modern Sofa",
      price: 899.99,
      category: "furniture",
      status: "out-of-stock",
      stock: 0,
    },
    {
      id: "7",
      name: language === "pt" ? "Mesa de Jantar" : "Dining Table",
      price: 599.99,
      category: "furniture",
      status: "low-stock",
      stock: 5,
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

  return (
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
              <TableHead className="w-[300px]">{t.product}</TableHead>
              <TableHead>{t.price}</TableHead>
              <TableHead>{t.category}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.stock}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {language === "pt" ? "Nenhum produto encontrado." : "No products found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US", {
                      style: "currency",
                      currency: language === "pt" ? "BRL" : "USD",
                    }).format(product.price)}
                  </TableCell>
                  <TableCell>{getCategoryLabel(product.category)}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
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
                        <DropdownMenuItem>{t.view}</DropdownMenuItem>
                        <DropdownMenuItem>{t.edit}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">{t.delete}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
