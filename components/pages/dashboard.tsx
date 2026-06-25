"use client"

import { useMemo } from "react"
import { GeneratedPost, styleConfig } from "@/lib/store"
import {
  Sparkles,
  FileText,
  TrendingUp,
  Crown,
  ArrowRight,
  Star,
  Zap,
  Plus,
  ChevronRight,
  Clock,
  BarChart3,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardProps {
  history: GeneratedPost[]
  onNavigate: (page: "criar" | "templates") => void
  postsToday: number
}

const tips = [
  "Use descrições detalhadas para posts mais personalizados.",
  "Experimente o estilo Neon para posts que chamam atenção.",
  "Posts corporativos funcionam melhor com chamadas para ação.",
  "Templates de Motivacional têm maior engajamento nas segundas-feiras.",
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

function relativeTime(date: Date) {
  const diff = Date.now() - new Date(date).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return "agora"
  if (min < 60) return `${min}min atrás`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h}h atrás`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d atrás`
  return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

export function DashboardPage({ history, onNavigate, postsToday }: DashboardProps) {
  const tip = tips[Math.floor(Date.now() / 86400000) % tips.length]

  const usagePct = Math.min(postsToday * 10, 100)
  const monthlyLimit = 10
  const recentPosts = history.slice(0, 4)

  const styleBreakdown = useMemo(() => {
    const counts: Record<string, number> = {}
    history.forEach((p) => {
      counts[p.style] = (counts[p.style] ?? 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
  }, [history])

  const stats = [
    {
      label: "Posts hoje",
      value: postsToday,
      icon: Sparkles,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      change: "+2 em relação a ontem",
      trend: "up" as const,
    },
    {
      label: "Total de posts",
      value: history.length,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      change: "desde o início",
      trend: "neutral" as const,
    },
    {
      label: "Taxa de uso",
      value: `${usagePct}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      change: "do plano mensal",
      trend: "up" as const,
    },
    {
      label: "Plano atual",
      value: "Free",
      icon: Crown,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      change: "10 posts/mês",
      trend: "neutral" as const,
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
            {getGreeting()}, Usuário
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Aqui está um resumo da sua atividade de criação.
          </p>
        </div>
        <button
          onClick={() => onNavigate("criar")}
          className="group flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Novo post
          <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-card border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("rounded-lg p-2 border", stat.bg, stat.border)}>
                  <Icon className={cn("h-3.5 w-3.5", stat.color)} />
                </div>
                {stat.trend === "up" && (
                  <span className="text-[10px] font-medium text-emerald-400/80 flex items-center gap-0.5">
                    <TrendingUp className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5 tracking-tight tabular-nums">{stat.value}</p>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1.5">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Usage progress card */}
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Uso do plano este mês</h2>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            <span className="text-foreground font-semibold">{postsToday}</span> / {monthlyLimit} posts
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700 ease-out"
            style={{ width: `${Math.max(usagePct, 2)}%` }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-2.5">
          {monthlyLimit - postsToday > 0
            ? `Você ainda pode criar ${monthlyLimit - postsToday} posts este mês.`
            : "Você atingiu o limite do plano Free. Considere fazer upgrade."}
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Hero CTA */}
        <div className="md:col-span-2 relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 flex flex-col gap-2.5">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-primary" fill="currentColor" />
            </div>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              Gerar agora
            </span>
          </div>
          <h2 className="relative text-lg font-bold text-foreground tracking-tight">
            Crie um post em segundos
          </h2>
          <p className="relative text-sm text-muted-foreground leading-relaxed">
            Descreva o que você quer, escolha o estilo e deixe a IA fazer o resto.
          </p>
          <button
            onClick={() => onNavigate("criar")}
            className="relative mt-1 flex w-fit items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Começar agora
            <ArrowRight className="h-3 w-3 opacity-70" />
          </button>
        </div>

        {/* Tip */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
            </div>
            <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
              Dica do dia
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{tip}</p>
          <button
            onClick={() => onNavigate("templates")}
            className="mt-auto flex items-center gap-1 text-xs text-primary font-medium hover:underline self-start"
          >
            Ver templates
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Recent posts + style breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent posts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Posts recentes</h2>
            </div>
            <button
              onClick={() => onNavigate("criar" as never)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Ver histórico
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {recentPosts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 flex flex-col items-center gap-3 text-center">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Nenhum post ainda</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Crie seu primeiro post com IA agora mesmo.
                </p>
              </div>
              <button
                onClick={() => onNavigate("criar")}
                className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
              >
                Criar primeiro post
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              {recentPosts.map((post) => {
                const config = styleConfig[post.style]
                return (
                  <button
                    key={post.id}
                    onClick={() => onNavigate("criar")}
                    className="group flex w-full items-center gap-3 p-3 hover:bg-accent/50 transition-colors text-left"
                  >
                    <div
                      className="h-10 w-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: config.gradient }}
                    >
                      <span
                        className="text-[9px] font-bold uppercase"
                        style={{ color: config.accentColor }}
                      >
                        {post.style.slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {post.body.split("\n")[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">
                        {relativeTime(post.createdAt)}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Style breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Estilos mais usados</h2>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
            {styleBreakdown.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">
                Crie posts para ver suas estatísticas de estilo.
              </p>
            ) : (
              styleBreakdown.map(([style, count]) => {
                const config = styleConfig[style as keyof typeof styleConfig]
                const pct = Math.round((count / history.length) * 100)
                return (
                  <div key={style} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ background: config.gradient }}
                        />
                        <span className="text-xs font-medium text-foreground capitalize">{config.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{count} posts</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: config.accentColor }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
