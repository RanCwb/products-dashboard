"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardNavProps {
  language: "pt" | "en"
}

export function DashboardNav({ language }: DashboardNavProps) {
  const pathname = usePathname()

  const translations = {
    pt: {
      dashboard: "Painel",
      overview: "Visão Geral",
      analytics: "Análises",
      products: "Produtos",
      customers: "Clientes",
      orders: "Pedidos",
    },
    en: {
      dashboard: "Dashboard",
      overview: "Overview",
      analytics: "Analytics",
      products: "Products",
      customers: "Customers",
      orders: "Orders",
    },
  }

  const t = translations[language]

  const routes = [
    {
      href: "/",
      label: t.overview,
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/analytics",
      label: t.analytics,
      icon: BarChart3,
      active: pathname === "/analytics",
    },
    {
      href: "/products",
      label: t.products,
      icon: Package,
      active: pathname === "/products",
    },
    {
      href: "/customers",
      label: t.customers,
      icon: Users,
      active: pathname === "/customers",
    },
    {
      href: "/orders",
      label: t.orders,
      icon: ShoppingCart,
      active: pathname === "/orders",
    },
  ]

  return (
    <nav className="hidden border-r bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{t.dashboard}</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
