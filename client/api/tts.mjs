const GOOGLE_TTS = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q='

export default async function handler(req, res) {
  const q = typeof req.query.q === 'string' ? req.query.q : ''
  if (!q) {
    res.status(400).json({ error: 'missing q' })
    return
  }
  const text = q.slice(0, 200)
  try {
    const upstream = await fetch(GOOGLE_TTS + encodeURIComponent(text), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    })
    if (!upstream.ok) {
      res.status(502).json({ error: 'upstream ' + upstream.status })
      return
    }
    const buf = Buffer.from(await upstream.arrayBuffer())
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.send(buf)
  } catch (e) {
    res.status(502).json({ error: 'fetch failed' })
  }
}
