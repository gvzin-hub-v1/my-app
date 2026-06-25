"use client"

import { useState } from "react"
import { GeneratedPost, styleConfig } from "@/lib/store"
import { Download, Copy, Trash2, Search, Filter, Check, History, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface HistoricoPageProps {
  history: GeneratedPost[]
  onClearHistory: () => void
  onNavigate: (page: "criar") => void
}

export function HistoricoPage({ history, onClearHistory, onNavigate }: HistoricoPageProps) {
  const [search, setSearch] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = history.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase()) ||
      p.style.toLowerCase().includes(search.toLowerCase())
  )

  const handleCopy = (post: GeneratedPost) => {
    const text = `${post.title}\n\n${post.body}\n\n${post.hashtags}`
    navigator.clipboard.writeText(text)
    setCopiedId(post.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (post: GeneratedPost) => {
    const text = `${post.title}\n\n${post.body}\n\n${post.hashtags}`
    const blob = new Blob([text], { type: "text/plain" })
    const link = document.createElement("a")
    link.download = `post-${post.id}.txt`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Histórico</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {history.length} {history.length === 1 ? "post criado" : "posts criados"} no total
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2 text-sm text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all self-start sm:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpar histórico
          </button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center float">
              <History className="h-9 w-9 text-muted-foreground" />
            </div>
            <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Nenhum post no histórico</h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-sm leading-relaxed">
              Seus posts gerados com IA aparecem aqui. Comece criando seu primeiro post agora!
            </p>
          </div>
          <button
            onClick={() => onNavigate("criar")}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Criar primeiro post
          </button>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar posts..."
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">Nenhum post encontrado para &ldquo;{search}&rdquo;</p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((post) => {
              const config = styleConfig[post.style]
              return (
                <div
                  key={post.id}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Mini preview */}
                  <div
                    className="relative h-40 w-full flex flex-col justify-between p-5 overflow-hidden"
                    style={{ background: config.gradient }}
                  >
                    {/* Grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: `linear-gradient(${config.textColor} 1px, transparent 1px), linear-gradient(90deg, ${config.textColor} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative z-10">
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest"
                        style={{ color: config.accentColor }}
                      >
                        {post.style}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <p
                        className={cn("text-sm font-bold leading-tight line-clamp-2", config.fontClass)}
                        style={{ color: config.textColor }}
                      >
                        {post.title}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.body.split("\n")[0]}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground/70">
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="bg-muted px-2 py-0.5 rounded-full capitalize">{post.style}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1 border-t border-border">
                      <button
                        onClick={() => handleCopy(post)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                      >
                        {copiedId === post.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copiar
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(post)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Baixar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
