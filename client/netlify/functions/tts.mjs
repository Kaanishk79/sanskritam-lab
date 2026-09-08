const GOOGLE_TTS = "https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=";

export default async (req) => {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  if (!q) {
    return new Response(JSON.stringify({ error: "missing q" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const text = q.slice(0, 200);
  try {
    const upstream = await fetch(GOOGLE_TTS + encodeURIComponent(text), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: "upstream " + upstream.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "fetch failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/tts",
};
