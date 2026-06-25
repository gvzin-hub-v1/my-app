"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Sparkles,
  LayoutTemplate,
  History,
  Settings,
  Zap,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

export type ActivePage = "dashboard" | "criar" | "templates" | "historico" | "configuracoes"

interface SidebarProps {
  activePage: ActivePage
  onNavigate: (page: ActivePage) => void
}

const navItems = [
  { id: "dashboard" as ActivePage, label: "Dashboard", icon: LayoutDashboard },
  { id: "criar" as ActivePage, label: "Criar Post", icon: Sparkles },
  { id: "templates" as ActivePage, label: "Templates", icon: LayoutTemplate },
  { id: "historico" as ActivePage, label: "Histórico", icon: History },
  { id: "configuracoes" as ActivePage, label: "Configurações", icon: Settings },
]

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
          <Zap className="h-4 w-4 text-primary-foreground" fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground tracking-tight leading-none">
            AI Post Studio
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Powered by AI</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3 pt-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                setMobileOpen(false)
              }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                )}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="ml-auto h-3 w-3 text-primary opacity-60" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Plan badge */}
      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <span className="text-xs font-semibold text-primary">Plano Free</span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed">
          10 posts restantes este mês.
        </p>
        <button className="w-full rounded-lg bg-primary py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
          Fazer upgrade
        </button>
      </div>

      {/* User */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Usuário Demo</p>
            <p className="text-[10px] text-muted-foreground truncate">demo@aipoststudio.com</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex lg:hidden h-9 w-9 items-center justify-center rounded-xl bg-card border border-border shadow-lg"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-shrink-0 flex-col bg-sidebar border-r border-sidebar-border sticky top-0">
        <SidebarContent />
      </aside>
    </>
  )
}
