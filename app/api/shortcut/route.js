export const runtime = 'edge'

const CATEGORIES = {
  stoicisme: 'Stoïcisme',
  zen: 'Zen',
  ambition: 'Ambition',
  resilience: 'Résilience',
  gratitude: 'Gratitude',
  confiance: 'Confiance en soi',
  discipline: 'Discipline',
  creativite: 'Créativité',
  amour: 'Amour',
  sagesse: 'Sagesse',
  courage: 'Courage',
  liberte: 'Liberté',
  patience: 'Patience',
  leadership: 'Leadership',
  minimalisme: 'Minimalisme',
  aventure: 'Aventure',
  sport: 'Sport',
  entrepreneuriat: 'Entrepreneuriat',
  serenite: 'Sérénité',
  humour: 'Humour',
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'stoicisme'
  const label = CATEGORIES[category] || 'Stoïcisme'
  const wallpaperUrl = `https://wallpaper-api-sand.vercel.app/api/wallpaper?category=${category}`

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Installer Motiv Daily - ${label}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      background: linear-gradient(160deg, #0c0c14 0%, #1a1228 100%);
      color: #f5efe6;
      font-family: -apple-system, system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      gap: 32px;
      text-align: center;
    }
    h1 {
      font-family: Georgia, serif;
      font-weight: 300;
      font-size: 1.8rem;
      color: #b8956a;
    }
    .cat-badge {
      display: inline-block;
      padding: 8px 20px;
      border-radius: 24px;
      border: 1px solid rgba(184,149,106,0.4);
      background: rgba(184,149,106,0.1);
      font-size: 1rem;
      color: #b8956a;
    }
    .steps {
      max-width: 340px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      text-align: left;
    }
    .step-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(184,149,106,0.15);
      color: #b8956a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    .step-text {
      font-size: 0.95rem;
      line-height: 1.5;
      opacity: 0.85;
      padding-top: 4px;
    }
    .step-text strong { color: #b8956a; }
    .btn {
      display: block;
      width: 100%;
      max-width: 340px;
      padding: 16px;
      border-radius: 14px;
      border: none;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }
    .btn-primary {
      background: linear-gradient(135deg, #b8956a, #8a6d4a);
      color: #0c0c14;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.06);
      color: #f5efe6;
      border: 1px solid rgba(184,149,106,0.3);
      margin-top: -8px;
    }
    .url-box {
      max-width: 340px;
      width: 100%;
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
      padding: 12px 16px;
      font-family: monospace;
      font-size: 0.7rem;
      word-break: break-all;
      opacity: 0.5;
      user-select: all;
    }
    .copied {
      color: #4ade80;
      font-size: 0.85rem;
      display: none;
    }
    .sub { opacity: 0.4; font-size: 0.75rem; }
  </style>
</head>
<body>
  <h1>Motiv Daily</h1>
  <div class="cat-badge">${label}</div>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-text">Copie l'URL ci-dessous <strong>(bouton Copier)</strong></div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-text">Ouvre <strong>Raccourcis</strong> et crée un nouveau raccourci</div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-text">Ajoute <strong>Obtenir le contenu de l'URL</strong> puis <strong>Définir le fond d'écran</strong></div>
    </div>
  </div>

  <div class="url-box" id="url">${wallpaperUrl}</div>
  <span class="copied" id="copied">✓ Copié !</span>

  <button class="btn btn-primary" onclick="copyUrl()">Copier l'URL</button>
  <a class="btn btn-secondary" href="shortcuts://create-shortcut">Ouvrir Raccourcis</a>

  <p class="sub">Astuce : automatise ce raccourci chaque jour à 7h</p>

  <script>
    function copyUrl() {
      const url = document.getElementById('url').textContent;
      navigator.clipboard.writeText(url).then(() => {
        document.getElementById('copied').style.display = 'block';
        setTimeout(() => {
          document.getElementById('copied').style.display = 'none';
        }, 2000);
      });
    }
  </script>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
