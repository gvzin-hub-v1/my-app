"use client"

import { useState } from "react"
import { User, Bell, Palette, Key, Shield, CreditCard, Check, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar a criar",
    features: ["10 posts por mês", "5 estilos visuais", "Histórico 30 dias", "Export PNG básico"],
    current: true,
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "/mês",
    description: "Para criadores sérios",
    features: ["100 posts por mês", "Estilos premium", "Histórico ilimitado", "Export HD + PNG", "Suporte prioritário"],
    current: false,
    highlight: true,
  },
  {
    name: "Business",
    price: "R$ 149",
    period: "/mês",
    description: "Para equipes e agências",
    features: ["Posts ilimitados", "Marca personalizada", "API access", "Multi-usuários", "Dashboard analytics", "Suporte 24/7"],
    current: false,
    highlight: false,
  },
]

type Tab = "perfil" | "plano" | "notificacoes" | "aparencia" | "api"

const tabs = [
  { id: "perfil" as Tab, label: "Perfil", icon: User },
  { id: "plano" as Tab, label: "Plano", icon: CreditCard },
  { id: "notificacoes" as Tab, label: "Notificações", icon: Bell },
  { id: "aparencia" as Tab, label: "Aparência", icon: Palette },
  { id: "api" as Tab, label: "API Key", icon: Key },
]

export function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil")
  const [name, setName] = useState("Usuário Demo")
  const [email, setEmail] = useState("demo@aipoststudio.com")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm mt-1">Gerencie sua conta e preferências</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-52 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Perfil */}
          {activeTab === "perfil" && (
            <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-6">
              <h2 className="text-base font-semibold text-foreground">Informações do perfil</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                  U
                </div>
                <div>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 transition-all">
                    Alterar foto
                  </button>
                  <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG até 2MB</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Nome completo", value: name, setter: setName },
                  { label: "E-mail", value: email, setter: setEmail },
                ].map((field) => (
                  <div key={field.label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                    <input
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="rounded-xl border border-input bg-muted/50 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
                >
                  {saved ? <><Check className="h-4 w-4" /> Salvo!</> : "Salvar alterações"}
                </button>
                <button className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Plano */}
          {activeTab === "plano" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-card border border-border p-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-8 w-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">Plano atual: Free</h2>
                    <p className="text-xs text-muted-foreground">10 posts usados este mês</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={cn(
                      "relative rounded-2xl border p-5 flex flex-col gap-4 transition-all",
                      plan.highlight
                        ? "border-primary/50 bg-primary/5 shadow-xl shadow-primary/10"
                        : "border-border bg-card"
                    )}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground">
                        POPULAR
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-foreground text-base">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.period}</span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={cn(
                        "mt-auto rounded-xl py-2 text-sm font-semibold transition-all",
                        plan.current
                          ? "border border-border text-muted-foreground cursor-default"
                          : plan.highlight
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
                          : "border border-border text-foreground hover:border-primary/40 hover:bg-accent"
                      )}
                    >
                      {plan.current ? "Plano atual" : "Fazer upgrade"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notificações */}
          {activeTab === "notificacoes" && (
            <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-5">
              <h2 className="text-base font-semibold text-foreground">Notificações</h2>
              {[
                { label: "Resumo diário de posts", desc: "Receba um email com seus posts do dia" },
                { label: "Dicas de criação", desc: "Sugestões semanais para melhorar seus posts" },
                { label: "Novidades do produto", desc: "Fique por dentro das novas funcionalidades" },
                { label: "Alertas de limite", desc: "Aviso quando estiver próximo do limite do plano" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    className={cn(
                      "relative h-5 w-9 rounded-full transition-all",
                      i === 0 || i === 3 ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <div className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                      i === 0 || i === 3 ? "translate-x-4" : "translate-x-0.5"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Aparência */}
          {activeTab === "aparencia" && (
            <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-6">
              <h2 className="text-base font-semibold text-foreground">Aparência</h2>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">Tema</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Escuro", "Claro", "Sistema"].map((t, i) => (
                    <button
                      key={t}
                      className={cn(
                        "rounded-xl border py-3 text-sm font-medium transition-all",
                        i === 0
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 border border-border p-4">
                <p className="text-xs text-muted-foreground">
                  O AI Post Studio usa tema escuro por padrão, otimizado para criação de conteúdo.
                </p>
              </div>
            </div>
          )}

          {/* API */}
          {activeTab === "api" && (
            <div className="rounded-2xl bg-card border border-border p-6 flex flex-col gap-5">
              <h2 className="text-base font-semibold text-foreground">Chave de API</h2>
              <div className="rounded-xl bg-muted/50 border border-border p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use a chave de API para integrar o AI Post Studio com suas ferramentas favoritas via REST API.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Sua chave de API</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="aips_demo_••••••••••••••••"
                    readOnly
                    className="flex-1 rounded-xl border border-input bg-muted/50 px-3 py-2.5 text-sm font-mono text-muted-foreground focus:outline-none"
                  />
                  <button className="rounded-xl border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
                    Revelar
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-all">
                  Gerar nova chave
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
                  <Shield className="h-3.5 w-3.5" />
                  Revogar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
