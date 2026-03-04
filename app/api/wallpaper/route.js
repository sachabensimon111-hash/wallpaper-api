import { ImageResponse } from '@vercel/og'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

// Palettes
const PALETTES = [
  { from: '#0c0c14', to: '#1a1228', accent: '#b8956a', text: '#f5efe6' },
  { from: '#0d1b12', to: '#0a2a1a', accent: '#7aab7a', text: '#eaf5ea' },
  { from: '#1a0e0e', to: '#2a1218', accent: '#c47a6a', text: '#f5ece9' },
  { from: '#0d1220', to: '#0a1a30', accent: '#6a9ab8', text: '#e9f0f5' },
  { from: '#1a1610', to: '#2a2216', accent: '#c4aa6a', text: '#f5f0e6' },
]

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

function formatDate(date) {
  const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

async function generateQuote(dayNum) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 200,
    messages: [{ role: 'user', content: `Tu es un générateur de phrases de motivation profondes et élégantes.\n\nGénère UNE SEULE phrase de motivation originale pour le jour ${dayNum} de l'année.\nLa phrase doit :\n- Être courte (max 18 mots)\n- Être poétique, puissante, mémorable\n- Inspirer l'action ou la sérénité\n- Être en français\n- Être originale (pas les phrases clichées habituelles)\n\nRéponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :\n{"quote":"la phrase ici","source":"auteur ou concept (ex: Sagesse stoïcienne, Marc Aurèle, Proverbe zen)"}` }]
  })
  return JSON.parse(response.content[0].text.trim())
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const paletteIndex = Math.min(parseInt(searchParams.get('palette') || '0'), 4)
  const palette = PALETTES[paletteIndex]
  const now = new Date()
  const dayNum = getDayOfYear(now)
  const dateStr = formatDate(now)

  let quoteData
  try {
    quoteData = await generateQuote(dayNum)
  } catch (err) {
    quoteData = { quote: 'Chaque matin est une nouvelle page blanche.', source: 'Motiv Daily' }
  }

  return new ImageResponse(
    (
      <div style={{ width: '1170px', height: '2532px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`, padding: '120px 140px', fontFamily: 'serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
          <div style={{ width: '1px', height: '80px', background: `linear-gradient(to bottom, transparent, ${palette.accent})`, marginBottom: '28px' }} />
          <div style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, fontFamily: 'sans-serif' }}>{dateStr}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', maxWidth: '860px', textAlign: 'center' }}>
          <div style={{ fontSize: '140px', lineHeight: '0.4', color: palette.accent, opacity: 0.15, fontFamily: 'serif', marginBottom: '40px', fontStyle: 'italic' }}>"</div>
          <div style={{ fontSize: '72px', fontWeight: '300', fontStyle: 'italic', lineHeight: '1.55', color: palette.text, letterSpacing: '0.01em', fontFamily: 'serif' }}>{quoteData.quote}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '72px' }}>
            <div style={{ width: '50px', height: '1px', background: palette.accent, opacity: 0.5 }} />
            <div style={{ fontSize: '26px', fontWeight: '300', letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.accent, opacity: 0.7, fontFamily: 'sans-serif' }}>{quoteData.source}</div>
            <div style={{ width: '50px', height: '1px', background: palette.accent, opacity: 0.5 }} />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <div style={{ fontSize: '22px', fontWeight: '200', letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.text, opacity: 0.2, fontFamily: 'sans-serif' }}>Jour {dayNum} · {now.getFullYear()}</div>
          <div style={{ width: '1px', height: '80px', background: `linear-gradient(to top, transparent, ${palette.accent})`, opacity: 0.5 }} />
        </div>
      </div>
    ),
    { width: 1170, height: 2532, headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400', 'Content-Type': 'image/png' } }
  )
}
