"use client"

import { useState, useCallback, useEffect } from "react"
import { Sidebar, ActivePage } from "@/components/sidebar"
import { DashboardPage } from "@/components/pages/dashboard"
import { CriarPostPage } from "@/components/pages/criar-post"
import { TemplatesPage } from "@/components/pages/templates"
import { HistoricoPage } from "@/components/pages/historico"
import { ConfiguracoesPage } from "@/components/pages/configuracoes"
import { GeneratedPost, PostStyle, loadHistory, saveHistory } from "@/lib/store"

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard")
  const [history, setHistory] = useState<GeneratedPost[]>([])
  const [postsToday, setPostsToday] = useState(0)
  const [templatePrompt, setTemplatePrompt] = useState<{ prompt: string; style: PostStyle } | null>(null)

  // Load history from localStorage on mount
  useEffect(() => {
    const loaded = loadHistory()
    setHistory(loaded)

    const today = new Date().toDateString()
    const todayCount = loaded.filter(
      (p) => new Date(p.createdAt).toDateString() === today
    ).length
    setPostsToday(todayCount)
  }, [])

  const handlePostGenerated = useCallback((post: GeneratedPost) => {
    setHistory((prev) => {
      const updated = [post, ...prev]
      saveHistory(updated)
      return updated
    })
    setPostsToday((prev) => prev + 1)
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    setPostsToday(0)
    saveHistory([])
  }, [])

  const handleNavigate = useCallback((page: ActivePage) => {
    setActivePage(page)
    setTemplatePrompt(null)
  }, [])

  const handleUseTemplate = useCallback((prompt: string, style: PostStyle) => {
    setTemplatePrompt({ prompt, style })
    setActivePage("criar")
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1 overflow-y-auto min-h-screen">
        {activePage === "dashboard" && (
          <DashboardPage
            history={history}
            onNavigate={(page) => setActivePage(page as ActivePage)}
            postsToday={postsToday}
          />
        )}
        {activePage === "criar" && (
          <CriarPostPage
            onPostGenerated={handlePostGenerated}
            initialPrompt={templatePrompt?.prompt ?? ""}
            key={templatePrompt ? `${templatePrompt.prompt}-${templatePrompt.style}` : "criar"}
          />
        )}
        {activePage === "templates" && (
          <TemplatesPage onUseTemplate={handleUseTemplate} />
        )}
        {activePage === "historico" && (
          <HistoricoPage
            history={history}
            onClearHistory={handleClearHistory}
            onNavigate={(page) => setActivePage(page as ActivePage)}
          />
        )}
        {activePage === "configuracoes" && <ConfiguracoesPage />}
      </main>
    </div>
  )
}
