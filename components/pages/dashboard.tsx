"use client"

import { GeneratedPost } from "@/lib/store"
import { Sparkles, FileText, TrendingUp, Crown, ArrowRight, Star, Zap } from "lucide-react"
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

export function DashboardPage({ history, onNavigate, postsToday }: DashboardProps) {
  const tip = tips[Math.floor(Date.now() / 86400000) % tips.length]

  const stats = [
    {
      label: "Posts hoje",
      value: postsToday,
      icon: Sparkles,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      change: "+2 em relação a ontem",
    },
    {
      label: "Total de posts",
      value: history.length,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      change: "desde o início",
    },
    {
      label: "Taxa de uso",
      value: `${Math.min(postsToday * 10, 100)}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      change: "do plano mensal",
    },
    {
      label: "Plano atual",
      value: "Free",
      icon: Crown,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      change: "10 posts/mês",
    },
  ]

  const recentPosts = history.slice(0, 3)

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Bom dia! 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Pronto para criar conteúdo incrível para o Instagram?
          </p>
        </div>
        <button
          onClick={() => onNavigate("criar")}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/25 pulse-glow self-start sm:self-auto"
        >
          <Sparkles className="h-4 w-4" />
          Criar novo post
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-card border border-border p-5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("rounded-xl p-2.5 border", stat.bg, stat.border)}>
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hero CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent p-6 flex flex-col gap-3">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Gerar agora
            </span>
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Crie um post em segundos
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Descreva o que você quer, escolha o estilo e deixa a IA fazer a magia.
          </p>
          <button
            onClick={() => onNavigate("criar")}
            className="mt-2 flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Começar agora
          </button>
        </div>

        {/* Tip */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" fill="currentColor" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Dica do dia
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed font-medium">{tip}</p>
          <button
            onClick={() => onNavigate("templates")}
            className="mt-auto flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
          >
            Ver templates
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Posts recentes</h2>
          <button
            onClick={() => onNavigate("criar" as never)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Ver histórico →
          </button>
        </div>

        {recentPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 flex flex-col items-center gap-4 text-center">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Nenhum post ainda</p>
              <p className="text-sm text-muted-foreground mt-1">
                Crie seu primeiro post com IA agora mesmo!
              </p>
            </div>
            <button
              onClick={() => onNavigate("criar")}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
            >
              Criar primeiro post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onClick={() => onNavigate("criar")}
              >
                <div
                  className="h-28 w-full flex items-center justify-center p-4"
                  style={{ background: post.gradient }}
                >
                  <p className="text-white text-xs font-bold text-center line-clamp-2 drop-shadow">
                    {post.title}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.body.split("\n")[0]}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] capitalize bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {post.style}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
