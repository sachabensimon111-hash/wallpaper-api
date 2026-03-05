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

function generateShortcutPlist(category, label) {
  const url = `https://wallpaper-api-sand.vercel.app/api/wallpaper?category=${category}`
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>WFWorkflowMinimumClientVersionString</key>
  <string>900</string>
  <key>WFWorkflowMinimumClientVersion</key>
  <integer>900</integer>
  <key>WFWorkflowIcon</key>
  <dict>
    <key>WFWorkflowIconStartColor</key>
    <integer>463140863</integer>
    <key>WFWorkflowIconGlyphNumber</key>
    <integer>59511</integer>
  </dict>
  <key>WFWorkflowTypes</key>
  <array/>
  <key>WFWorkflowInputContentItemClasses</key>
  <array>
    <string>WFImageContentItem</string>
  </array>
  <key>WFWorkflowImportQuestions</key>
  <array/>
  <key>WFWorkflowActions</key>
  <array>
    <dict>
      <key>WFWorkflowActionIdentifier</key>
      <string>is.workflow.actions.downloadurl</string>
      <key>WFWorkflowActionParameters</key>
      <dict>
        <key>WFURL</key>
        <string>${url}</string>
      </dict>
    </dict>
    <dict>
      <key>WFWorkflowActionIdentifier</key>
      <string>is.workflow.actions.setwallpaper</string>
      <key>WFWorkflowActionParameters</key>
      <dict>
        <key>WFWallpaperLocation</key>
        <string>Both</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'stoicisme'
  const label = CATEGORIES[category] || 'Stoicisme'

  const plist = generateShortcutPlist(category, label)
  const name = `Motiv Daily - ${label}`

  // If user agent is iOS, redirect to shortcuts:// import
  const ua = request.headers.get('user-agent') || ''
  const isIOS = /iPhone|iPad|iPod/.test(ua)

  if (isIOS) {
    const shortcutFileUrl = `https://wallpaper-api-sand.vercel.app/api/shortcut?category=${category}&download=1`
    const importUrl = `shortcuts://import-shortcut?url=${encodeURIComponent(shortcutFileUrl)}&name=${encodeURIComponent(name)}`
    return Response.redirect(importUrl, 302)
  }

  // If download param, serve the plist file directly
  if (searchParams.get('download')) {
    return new Response(plist, {
      headers: {
        'Content-Type': 'application/x-apple-shortcut',
        'Content-Disposition': `attachment; filename="motiv-daily-${category}.shortcut"`,
      },
    })
  }

  // Default: show instructions page
  return new Response(JSON.stringify({
    message: 'Ouvre ce lien depuis ton iPhone pour installer le raccourci automatiquement.',
    shortcutUrl: `https://wallpaper-api-sand.vercel.app/api/shortcut?category=${category}`,
    categories: Object.keys(CATEGORIES),
  }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
