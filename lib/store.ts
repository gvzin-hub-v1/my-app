"use client"

export type PostStyle = "minimalista" | "moderno" | "neon" | "corporativo" | "criativo"

export interface GeneratedPost {
  id: string
  title: string
  body: string
  hashtags: string
  style: PostStyle
  prompt: string
  createdAt: Date
  gradient: string
}

export interface AppStats {
  postsToday: number
  totalPosts: number
  plan: "Free" | "Pro" | "Business"
}

// Post style configs
export const styleConfig: Record<
  PostStyle,
  { label: string; gradient: string; textColor: string; accentColor: string; fontClass: string }
> = {
  minimalista: {
    label: "Minimalista",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    textColor: "#e8e8f0",
    accentColor: "#a78bfa",
    fontClass: "font-light tracking-widest",
  },
  moderno: {
    label: "Moderno",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    textColor: "#ffffff",
    accentColor: "#818cf8",
    fontClass: "font-bold tracking-tight",
  },
  neon: {
    label: "Neon",
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #0d0221 50%, #180033 100%)",
    textColor: "#ffffff",
    accentColor: "#a855f7",
    fontClass: "font-black tracking-tight",
  },
  corporativo: {
    label: "Corporativo",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1a2f4f 50%, #0f2240 100%)",
    textColor: "#e2e8f0",
    accentColor: "#60a5fa",
    fontClass: "font-semibold tracking-normal",
  },
  criativo: {
    label: "Criativo",
    gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    textColor: "#ffffff",
    accentColor: "#f0abfc",
    fontClass: "font-extrabold tracking-tight",
  },
}

// Simulated AI post generation
const postTemplates: Record<
  PostStyle,
  { titles: string[]; bodies: string[]; hashtags: string }
> = {
  minimalista: {
    titles: ["menos é mais.", "essência pura.", "a arte da simplicidade."],
    bodies: [
      "O verdadeiro luxo está no que você não precisa dizer.\nCada detalhe importa, cada silêncio fala.",
      "Quando você remove o supérfluo, o essencial brilha.\nSimplicidade não é ausência — é presença consciente.",
      "Design não é sobre adicionar.\nÉ sobre saber o que tirar.",
    ],
    hashtags: "#design #minimalismo #lifestyle #aesthetic #simple #clean #art #inspiration",
  },
  moderno: {
    titles: ["O futuro é agora.", "Inovação sem limites.", "Transforme sua visão."],
    bodies: [
      "A modernidade não espera por ninguém.\nEsta é sua chance de liderar a mudança e definir o que vem a seguir.",
      "Cada dia é uma nova oportunidade de reinventar o possível.\nSeja a versão mais ousada de si mesmo.",
      "Tecnologia, criatividade e propósito.\nA combinação perfeita para o mundo de amanhã.",
    ],
    hashtags: "#innovation #future #tech #modern #startup #growth #entrepreneur #digital",
  },
  neon: {
    titles: ["BRILHE FORTE.", "SEM LIMITES.", "VOCÊ É A LUZ."],
    bodies: [
      "⚡ Não peça permissão para brilhar.\nO mundo precisa da sua energia, da sua chama, do seu brilho único.",
      "🔥 Quando todos duvidarem,\nbrilhe ainda mais forte.\nSua luz não pede licença.",
      "💜 A noite mais escura\nnão pode apagar uma luz que vem de dentro.\nIlumine tudo ao redor.",
    ],
    hashtags:
      "#neon #glow #energy #vibes #aesthetic #nightlife #bold #fierce #unstoppable #shine",
  },
  corporativo: {
    titles: [
      "Resultados que importam.",
      "Excelência em cada detalhe.",
      "Sua empresa no próximo nível.",
    ],
    bodies: [
      "Empresas de sucesso não acontecem por acaso.\nSão construídas com estratégia, execução e as pessoas certas ao seu lado.",
      "O crescimento sustentável começa com decisões fundamentadas.\nConheça as melhores práticas do mercado.",
      "Liderança não é cargo — é responsabilidade.\nComo você está exercendo a sua hoje?",
    ],
    hashtags: "#business #corporate #leadership #growth #strategy #success #management #results",
  },
  criativo: {
    titles: ["Crie sem medo.", "Arte que respira.", "Imagine. Crie. Inspire."],
    bodies: [
      "🎨 A criatividade é o único recurso que se multiplica quando você usa.\nCrie mais. Inspire mais. Viva mais.",
      "✨ Sua imaginação não tem paredes.\nPor que construir limites onde não existem?\nCrie sem fronteiras.",
      "🌈 Cada obra começa com uma ideia impossível.\nAs mãos que criam mudam o mundo.",
    ],
    hashtags: "#creative #art #design #artist #create #inspire #imagination #colorful #creative",
  },
}

export function generatePost(prompt: string, style: PostStyle): GeneratedPost {
  const templates = postTemplates[style]
  const config = styleConfig[style]

  const titleIdx = Math.floor(Math.random() * templates.titles.length)
  const bodyIdx = Math.floor(Math.random() * templates.bodies.length)

  // Incorporate the prompt into the body
  const promptSnippet = prompt.length > 0 ? `\n\n"${prompt.slice(0, 80)}${prompt.length > 80 ? "..." : ""}"` : ""

  return {
    id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title: templates.titles[titleIdx],
    body: templates.bodies[bodyIdx] + promptSnippet,
    hashtags: templates.hashtags,
    style,
    prompt,
    createdAt: new Date(),
    gradient: config.gradient,
  }
}

// Local storage helpers
const STORAGE_KEY = "ai_post_studio_history"

export function loadHistory(): GeneratedPost[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as GeneratedPost[]
    return parsed.map((p) => ({ ...p, createdAt: new Date(p.createdAt) }))
  } catch {
    return []
  }
}

export function saveHistory(posts: GeneratedPost[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.slice(0, 50)))
  } catch {
    // ignore
  }
}
