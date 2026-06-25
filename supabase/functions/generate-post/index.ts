import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateRequest {
  prompt: string;
  style: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: { message: string };
}

const styleInstructions: Record<string, string> = {
  minimalista:
    "Use um tom minimalista e elegante. Título curto e impactante. Corpo conciso, com frases curtas e reflexivas.",
  moderno:
    "Use um tom moderno e inovador. Título dinâmico. Corpo com linguagem contemporânea e visionária.",
  neon:
    "Use um tom ousado e energético. Título em MAIÚSCULAS. Corpo com emojis e linguagem vibrante.",
  corporativo:
    "Use um tom corporativo e profissional. Título focado em resultados. Corpo com linguagem de negócios.",
  criativo:
    "Use um tom criativo e artístico. Título imaginativo. Corpo com linguagem expressiva e inspiradora.",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY not configured",
        simulated: true,
      }),
      {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { prompt, style } = (await req.json()) as GenerateRequest;

    if (!prompt || !prompt.trim()) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const styleGuide = styleInstructions[style] ?? styleInstructions.moderno;

    const systemPrompt = `Você é um especialista em criação de conteúdo para Instagram. Crie um post em português do Brasil com base na descrição do usuário.

${styleGuide}

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem texto adicional):
{
  "title": "título curto e impactante do post",
  "body": "corpo do post com 2-4 frases, pode usar quebras de linha (\\n)",
  "hashtags": "5-10 hashtags relevantes separadas por espaço, começando com #"
}

Descrição do usuário: "${prompt}"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1024,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to call Gemini API", details: errText }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data: GeminiResponse = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return new Response(
        JSON.stringify({ error: "Empty response from Gemini" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the JSON response from Gemini
    let parsed: { title: string; body: string; hashtags: string };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // If Gemini returned text instead of JSON, try to extract
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse Gemini response as JSON");
      }
    }

    return new Response(
      JSON.stringify({
        title: parsed.title ?? "Post gerado",
        body: parsed.body ?? "",
        hashtags: parsed.hashtags ?? "",
        style,
        simulated: false,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
