export const metadata = {
  title: 'Motiv Daily — Fond d\'écran motivationnel',
  description: 'Un fond d\'écran inspirant généré par IA, chaque matin automatiquement.',
}

const CATEGORIES = [
  { id: 'stoicisme', label: 'Stoïcisme', emoji: '🏛️' },
  { id: 'zen', label: 'Zen', emoji: '🧘' },
  { id: 'ambition', label: 'Ambition', emoji: '🚀' },
  { id: 'resilience', label: 'Résilience', emoji: '💪' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'confiance', label: 'Confiance en soi', emoji: '✨' },
  { id: 'discipline', label: 'Discipline', emoji: '🎯' },
  { id: 'creativite', label: 'Créativité', emoji: '🎨' },
  { id: 'amour', label: 'Amour', emoji: '❤️' },
  { id: 'sagesse', label: 'Sagesse', emoji: '🦉' },
  { id: 'courage', label: 'Courage', emoji: '🦁' },
  { id: 'liberte', label: 'Liberté', emoji: '🕊️' },
  { id: 'patience', label: 'Patience', emoji: '🌱' },
  { id: 'leadership', label: 'Leadership', emoji: '👑' },
  { id: 'minimalisme', label: 'Minimalisme', emoji: '💭' },
  { id: 'aventure', label: 'Aventure', emoji: '⛰️' },
  { id: 'sport', label: 'Sport', emoji: '🏆' },
  { id: 'entrepreneuriat', label: 'Entrepreneuriat', emoji: '📈' },
  { id: 'serenite', label: 'Sérénité', emoji: '🌊' },
  { id: 'humour', label: 'Humour', emoji: '😄' },
]

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0c0c14 0%, #1a1228 100%)',
      color: '#f5efe6',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 24px',
      gap: '40px',
    }}>
      <h1 style={{ fontFamily: 'serif', fontWeight: 300, fontSize: '2.4rem', color: '#b8956a', letterSpacing: '0.05em' }}>
        Motiv Daily
      </h1>
      <p style={{ opacity: 0.5, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Un fond d'écran · Une phrase · Chaque matin
      </p>

      <img
        src="/api/wallpaper"
        alt="Fond du jour"
        style={{ width: '240px', borderRadius: '16px', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
      />

      {/* Catégories avec bouton Installer */}
      <div style={{ maxWidth: '640px', width: '100%' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8956a', marginBottom: '20px', textAlign: 'center' }}>
          → Choisis ta catégorie et installe en 1 tap
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/api/shortcut?category=${cat.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '24px',
                border: '1px solid rgba(184,149,106,0.3)',
                background: 'rgba(255,255,255,0.04)',
                color: '#f5efe6',
                textDecoration: 'none',
                fontSize: '0.85rem',
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </a>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', opacity: 0.4 }}>
          Ouvre depuis ton iPhone → le raccourci s'installe automatiquement
        </p>
      </div>

      {/* Instructions manuelles */}
      <details style={{ maxWidth: '480px', width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '28px', border: '1px solid rgba(184,149,106,0.2)' }}>
        <summary style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8956a', cursor: 'pointer', listStyle: 'none' }}>
          → Installation manuelle (optionnel)
        </summary>
        <ol style={{ fontSize: '0.9rem', lineHeight: '2', opacity: 0.7, paddingLeft: '20px', marginTop: '16px' }}>
          <li>Ouvre l'app <strong>Raccourcis</strong></li>
          <li>Nouvelle automatisation → <strong>Chaque jour à 7h00</strong></li>
          <li>Ajouter action : <strong>Obtenir le contenu d'URL</strong></li>
          <li>URL : <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>https://wallpaper-api-sand.vercel.app/api/wallpaper?category=stoicisme</code></li>
          <li>Ajouter action : <strong>Définir le fond d'écran</strong></li>
          <li>Activer et c'est tout ✓</li>
        </ol>
      </details>

      <p style={{ opacity: 0.25, fontSize: '0.75rem' }}>
        Palettes : ?palette=0 à 4 · Catégories : ?category=stoicisme, zen, ambition...
      </p>
    </main>
  )
}
