"use client"

import { Sparkles, TrendingUp, Heart, Briefcase, Smile, ArrowRight, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { PostStyle } from "@/lib/store"

interface TemplatesPageProps {
  onUseTemplate: (prompt: string, style: PostStyle) => void
}

const templates = [
  {
    id: "vendas",
    label: "Vendas",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400",
    style: "corporativo" as PostStyle,
    tags: ["Conversão", "Promoção", "ROI"],
    prompt: "Promoção especial de 40% de desconto no meu produto, válida por tempo limitado, destaque a urgência e valor",
    description: "Posts focados em conversão, promoções e chamadas para ação que geram vendas reais.",
    example: "🔥 Oferta exclusiva até meia-noite...",
  },
  {
    id: "motivacional",
    label: "Motivacional",
    icon: Zap,
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20 hover:border-amber-500/50",
    iconColor: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-400",
    style: "criativo" as PostStyle,
    tags: ["Inspiração", "Mindset", "Crescimento"],
    prompt: "Mensagem motivacional poderosa para empreendedores que querem alcançar seus sonhos e superar obstáculos",
    description: "Conteúdo inspirador que conecta com a audiência e impulsiona engajamento orgânico.",
    example: "Você tem tudo que precisa para...",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Heart,
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20 hover:border-rose-500/50",
    iconColor: "text-rose-400",
    badge: "bg-rose-500/15 text-rose-400",
    style: "neon" as PostStyle,
    tags: ["Saúde", "Exercício", "Bem-estar"],
    prompt: "Dica de treino eficiente para quem tem pouco tempo, focando em resultados rápidos e saúde mental",
    description: "Posts para personal trainers, academias e entusiastas de saúde e bem-estar.",
    example: "3 exercícios que vão transformar...",
  },
  {
    id: "negocios",
    label: "Negócios",
    icon: Briefcase,
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20 hover:border-blue-500/50",
    iconColor: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400",
    style: "corporativo" as PostStyle,
    tags: ["B2B", "Liderança", "Estratégia"],
    prompt: "Compartilhar lição de liderança empresarial aprendida na prática, focando em resultados e equipe",
    description: "Conteúdo profissional para líderes, consultores e empresas que querem se destacar.",
    example: "O erro que aprendi na liderança...",
  },
  {
    id: "memes",
    label: "Memes",
    icon: Smile,
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20 hover:border-purple-500/50",
    iconColor: "text-purple-400",
    badge: "bg-purple-500/15 text-purple-400",
    style: "neon" as PostStyle,
    tags: ["Viral", "Humor", "Relatable"],
    prompt: "Post divertido e relatable sobre a vida do empreendedor digital, com humor inteligente e identificação",
    description: "Posts virais com humor que geram compartilhamentos e aumentam o alcance orgânico.",
    example: "Quando o cliente pede o projeto...",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    icon: Star,
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/20 hover:border-pink-500/50",
    iconColor: "text-pink-400",
    badge: "bg-pink-500/15 text-pink-400",
    style: "minimalista" as PostStyle,
    tags: ["Estilo", "Bem-viver", "Aesthetic"],
    prompt: "Compartilhar rotina matinal que aumenta produtividade e qualidade de vida com dicas práticas",
    description: "Conteúdo de estilo de vida que inspira e cria conexão emocional com a audiência.",
    example: "Minha rotina que mudou tudo...",
  },
]

export function TemplatesPage({ onUseTemplate }: TemplatesPageProps) {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground text-sm">
          Escolha um template e comece a criar posts incríveis em segundos
        </p>
      </div>

      {/* Featured banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 via-primary/8 to-transparent p-6">
        <div className="absolute right-0 top-0 h-full w-64 opacity-10"
          style={{
            background: "radial-gradient(ellipse at right, oklch(0.62 0.22 270), transparent)",
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Templates prontos para usar</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Cada template já vem com prompt otimizado e estilo visual configurado.
              Clique em usar e edite como quiser.
            </p>
          </div>
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {templates.map((template) => {
          const Icon = template.icon
          return (
            <div
              key={template.id}
              className={cn(
                "group relative rounded-2xl border bg-card p-5 flex flex-col gap-4 transition-all duration-300 cursor-pointer",
                template.border,
                "hover:shadow-xl hover:-translate-y-1"
              )}
              onClick={() => onUseTemplate(template.prompt, template.style)}
            >
              {/* Hover glow */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
                  template.color
                )}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                    template.color
                  )}>
                    <Icon className={cn("h-5 w-5", template.iconColor)} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                    template.badge
                  )}>
                    {template.style}
                  </span>
                </div>

                {/* Title & desc */}
                <h3 className="text-base font-bold text-foreground mb-1.5">{template.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>

                {/* Example */}
                <div className="mt-4 rounded-xl bg-muted/50 px-3 py-2.5 border border-border">
                  <p className="text-xs text-muted-foreground italic">
                    &ldquo;{template.example}&rdquo;
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className={cn(
                  "mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all",
                  "bg-card border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
                  template.iconColor
                )}>
                  <Sparkles className="h-3.5 w-3.5" />
                  Usar template
                  <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-dashed border-border p-8 flex flex-col items-center text-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">Tem uma ideia própria?</h3>
        <p className="text-sm text-muted-foreground">
          Crie um post 100% personalizado descrevendo o que você quer
        </p>
        <button
          onClick={() => onUseTemplate("", "moderno")}
          className="rounded-xl bg-primary/10 border border-primary/30 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-all"
        >
          Criar do zero
        </button>
      </div>
    </div>
  )
}
