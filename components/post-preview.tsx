"use client"

import { GeneratedPost, styleConfig } from "@/lib/store"
import { cn } from "@/lib/utils"

interface PostPreviewProps {
  post: GeneratedPost | null
  isLoading?: boolean
  className?: string
}

function LoadingSkeleton() {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shimmer flex flex-col items-center justify-center gap-4 p-8">
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="h-3 w-3/4 rounded-full bg-white/10 shimmer" />
        <div className="h-3 w-1/2 rounded-full bg-white/10 shimmer" />
        <div className="h-16 w-full rounded-xl bg-white/5 shimmer mt-4" />
        <div className="h-2 w-2/3 rounded-full bg-white/8 shimmer" />
        <div className="h-2 w-1/2 rounded-full bg-white/8 shimmer" />
      </div>
      {/* Spinner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 bg-muted/30 text-center p-8">
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center float">
        <svg className="h-7 w-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={1.5} />
          <path d="M3 9l4-4 4 4 4-5 4 5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="14" r="2" strokeWidth={1.5} />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Preview aparecerá aqui</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Preencha o formulário e clique em<br />"Gerar Post com IA"
        </p>
      </div>
    </div>
  )
}

export function PostPreview({ post, isLoading, className }: PostPreviewProps) {
  if (isLoading) return <LoadingSkeleton />
  if (!post) return <EmptyState />

  const config = styleConfig[post.style]
  const isNeon = post.style === "neon"
  const isCriativo = post.style === "criativo"

  return (
    <div
      id="post-preview-canvas"
      className={cn("relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl", className)}
      style={{ background: config.gradient }}
    >
      {/* Neon glow effects */}
      {isNeon && (
        <>
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full blur-3xl opacity-30"
            style={{ background: config.accentColor }} />
          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-20"
            style={{ background: "#818cf8" }} />
        </>
      )}

      {/* Criativo shapes */}
      {isCriativo && (
        <>
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-20 blur-2xl"
            style={{ background: config.accentColor }} />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-15 blur-2xl"
            style={{ background: "#a78bfa" }} />
        </>
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${config.textColor} 1px, transparent 1px), linear-gradient(90deg, ${config.textColor} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center"
              style={{ background: config.accentColor }}
            >
              <svg className="h-3 w-3" fill="white" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: config.accentColor }}
            >
              AI Post Studio
            </span>
          </div>
          <div
            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: config.accentColor, borderColor: `${config.accentColor}40` }}
          >
            {post.style}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 my-4">
          {/* Decorative line */}
          <div
            className="h-px w-12"
            style={{ background: `linear-gradient(90deg, ${config.accentColor}, transparent)` }}
          />

          {/* Title */}
          <h2
            className={cn("text-2xl leading-tight", config.fontClass)}
            style={{ color: config.textColor }}
          >
            {post.title}
          </h2>

          {/* Body */}
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: `${config.textColor}cc` }}
          >
            {post.body}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2">
          {/* Separator */}
          <div
            className="h-px w-full"
            style={{ background: `${config.accentColor}25` }}
          />
          {/* Hashtags */}
          <p
            className="text-[10px] leading-relaxed font-medium"
            style={{ color: `${config.accentColor}99` }}
          >
            {post.hashtags.split(" ").slice(0, 6).join(" ")}
          </p>
        </div>
      </div>

      {/* Neon border glow */}
      {isNeon && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 40px ${config.accentColor}15` }}
        />
      )}
    </div>
  )
}
