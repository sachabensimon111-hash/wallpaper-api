import Image from 'next/image'

export const metadata = {
    title: 'Motiv Daily — Fond d\'écran motivationnel',
    description: 'Un fond d\'écran inspirant généré par IA, chaque matin automatiquement.',
}

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
            justifyContent: 'center',
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

      <div style={{ maxWidth: '480px', width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '28px', border: '1px solid rgba(184,149,106,0.2)' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8956a', marginBottom: '16px' }}>
          → Automatiser sur iPhone
            </p>
        <ol style={{ fontSize: '0.9rem', lineHeight: '2', opacity: 0.7, paddingLeft: '20px' }}>
          <li>Ouvre l'app <strong>Raccourcis</strong></li>
                      <li>Nouvelle automatisation → <strong>Chaque jour à 7h00</strong></li>
                      <li>Ajouter action : <strong>Obtenir le contenu d'URL</strong></li>
                      <li>URL : <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>https://TON-PROJET.vercel.app/api/wallpaper</code></li>
          <li>Ajouter action : <strong>Définir le fond d'écran</strong></li>
                      <li>Activer et c'est tout</li>
            </ol>
            </div>

      <p style={{ opacity: 0.25, fontSize: '0.75rem' }}>
        Palettes disponibles : /api/wallpaper?palette=0 à 4
          </p>
          </main>
  )
}
