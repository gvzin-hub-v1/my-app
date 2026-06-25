"use client"

import { useState, useCallback } from "react"
import { Sparkles, Copy, Download, Check, RefreshCw, Wand2, ChevronDown } from "lucide-react"
import { GeneratedPost, PostStyle, generatePost, styleConfig } from "@/lib/store"
import { PostPreview } from "@/components/post-preview"
import { cn } from "@/lib/utils"

interface CriarPostPageProps {
  onPostGenerated: (post: GeneratedPost) => void
  initialPrompt?: string
}

const styles: PostStyle[] = ["minimalista", "moderno", "neon", "corporativo", "criativo"]

const promptSuggestions = [
  "Lançamento de produto inovador para jovens empreendedores",
  "Motivação para segunda-feira e início de semana produtivo",
  "Promoção de 50% em serviços de consultoria empresarial",
  "Dica de bem-estar e saúde mental para profissionais",
  "Showcase de portfólio de design e criação visual",
]

export function CriarPostPage({ onPostGenerated, initialPrompt = "" }: CriarPostPageProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [style, setStyle] = useState<PostStyle>("moderno")
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [styleOpen, setStyleOpen] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    setGeneratedPost(null)

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800))

    const post = generatePost(prompt, style)
    setGeneratedPost(post)
    onPostGenerated(post)
    setIsLoading(false)
  }, [prompt, style, onPostGenerated])

  const handleCopy = useCallback(() => {
    if (!generatedPost) return
    const text = `${generatedPost.title}\n\n${generatedPost.body}\n\n${generatedPost.hashtags}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedPost])

  const handleDownload = useCallback(() => {
    if (!generatedPost) return
    const canvas = document.getElementById("post-preview-canvas") as HTMLElement
    if (!canvas) return

    // Use html2canvas if available, otherwise simple download
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(canvas, { scale: 2, useCORS: true, backgroundColor: null }).then((c) => {
        const link = document.createElement("a")
        link.download = `ai-post-${generatedPost.id}.png`
        link.href = c.toDataURL("image/png")
        link.click()
      })
    }).catch(() => {
      // Fallback: just copy text
      handleCopy()
    })
  }, [generatedPost, handleCopy])

  const selectedConfig = styleConfig[style]

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Criar Post</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Descreva sua ideia e a IA vai criar um post incrível para o Instagram
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="flex flex-col gap-5">
          {/* Prompt */}
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Descreva seu post</h2>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva o post que você quer criar..."
              className="min-h-[140px] w-full resize-none rounded-xl bg-muted/50 border border-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate()
              }}
            />

            {/* Suggestions */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                Sugestões
              </p>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setPrompt(s)}
                    className="rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-all"
                  >
                    {s.slice(0, 32)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Style selector */}
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Estilo visual</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {styles.map((s) => {
                const cfg = styleConfig[s]
                const isActive = style === s
                return (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200",
                      isActive
                        ? "border-primary/50 bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-accent"
                    )}
                  >
                    {/* Preview swatch */}
                    <div
                      className="h-8 w-full rounded-lg"
                      style={{ background: cfg.gradient }}
                    />
                    <span className={cn("text-[10px] font-medium capitalize text-center leading-tight",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>
                      {cfg.label}
                    </span>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected style info */}
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 border border-border">
              <div
                className="h-8 w-8 rounded-lg flex-shrink-0"
                style={{ background: selectedConfig.gradient }}
              />
              <div>
                <p className="text-sm font-medium text-foreground capitalize">{selectedConfig.label}</p>
                <p className="text-xs text-muted-foreground">Selecionado</p>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className={cn(
              "flex items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-semibold transition-all duration-200",
              prompt.trim() && !isLoading
                ? "bg-primary text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/25 active:scale-[0.98] cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Gerando post com IA...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Gerar Post com IA
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-muted-foreground -mt-2">
            Atalho: Ctrl+Enter (ou Cmd+Enter)
          </p>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Preview do Post</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              1080 × 1080
            </span>
          </div>

          <PostPreview post={generatedPost} isLoading={isLoading} />

          {/* Actions */}
          {generatedPost && !isLoading && (
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar texto
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/15 border border-primary/30 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-all"
              >
                <Download className="h-4 w-4" />
                Exportar PNG
              </button>
              <button
                onClick={handleGenerate}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
                title="Regenerar"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Post text preview */}
          {generatedPost && !isLoading && (
            <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Texto gerado
              </p>
              <h3 className="font-bold text-foreground text-sm">{generatedPost.title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {generatedPost.body}
              </p>
              <p className="text-xs text-primary/70 leading-relaxed">{generatedPost.hashtags}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
