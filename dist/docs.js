const games = [
    ['ML', 'Mobile Legends', '/ml'],
    ['FF', 'Free Fire', '/ff'],
    ['GI', 'Genshin Impact', '/gi'],
    ['HSR', 'Honkai: Star Rail', '/hsr'],
    ['VAL', 'Valorant', '/valo'],
    ['ZZZ', 'Zenless Zone Zero', '/zzz'],
];
const arrow = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>`;
export function docsPage() {
    const gameCards = games.map(([short, name, path]) => `
    <a class="game-card" href="${path}?id=PLAYER_ID" aria-label="Open ${name} endpoint">
      <span class="game-mark">${short}</span>
      <span class="game-name">${name}</span>
      <span class="card-arrow">${arrow}</span>
    </a>`).join('');
    const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Validasi nickname game dengan API yang sederhana dan cepat." />
  <title>Validator — Game ID API</title>
  <style>
    :root { color-scheme: light; --ink:#111; --muted:#707070; --line:#e6e6e6; --paper:#fff; --soft:#f7f7f5; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; color:var(--ink); background:var(--paper); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; -webkit-font-smoothing:antialiased; }
    a { color:inherit; text-decoration:none; }
    .shell { width:min(1120px, calc(100% - 40px)); margin:0 auto; }
    header { height:76px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); }
    .brand { display:flex; align-items:center; gap:10px; font-size:15px; font-weight:700; letter-spacing:-.02em; }
    .brand-mark { display:grid; place-items:center; width:27px; height:27px; color:white; background:var(--ink); border-radius:7px; font-size:12px; }
    nav { display:flex; align-items:center; gap:26px; color:#595959; font-size:13px; }
    nav a:hover, .text-link:hover { color:var(--ink); }
    .github { display:flex; align-items:center; gap:7px; color:var(--ink); font-weight:600; }
    .github svg { width:15px; height:15px; }
    .hero { padding:106px 0 92px; border-bottom:1px solid var(--line); }
    .eyebrow { display:flex; align-items:center; gap:9px; color:#777; font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; }
    .eyebrow i { width:7px; height:7px; border-radius:50%; background:#44a067; box-shadow:0 0 0 4px #e8f4ec; }
    h1 { max-width:780px; margin:24px 0 20px; font-size:clamp(42px, 7vw, 76px); line-height:.98; letter-spacing:-.075em; font-weight:650; }
    .hero-copy { max-width:520px; margin:0; color:var(--muted); font-size:17px; line-height:1.65; letter-spacing:-.015em; }
    .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
    .button { display:inline-flex; align-items:center; gap:9px; padding:12px 16px; border:1px solid var(--ink); border-radius:7px; font-size:13px; font-weight:650; transition:transform .2s, background .2s; }
    .button:hover { transform:translateY(-2px); }
    .button.primary { color:white; background:var(--ink); }
    .button.secondary { border-color:var(--line); }
    .button svg { width:15px; height:15px; }
    section { padding:76px 0; }
    .section-head { display:flex; align-items:end; justify-content:space-between; gap:24px; margin-bottom:25px; }
    .section-kicker { margin:0 0 8px; color:#888; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
    h2 { margin:0; font-size:29px; letter-spacing:-.05em; }
    .text-link { color:#666; font-size:13px; font-weight:600; }
    .game-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; }
    .game-card { position:relative; display:flex; align-items:center; gap:13px; min-height:78px; padding:15px; border:1px solid var(--line); border-radius:9px; transition:border-color .2s, background .2s, transform .2s; }
    .game-card:hover { background:var(--soft); border-color:#bcbcbc; transform:translateY(-2px); }
    .game-mark { display:grid; place-items:center; flex:none; width:40px; height:40px; border-radius:7px; background:var(--soft); font-size:10px; font-weight:800; letter-spacing:-.04em; }
    .game-name { font-size:14px; font-weight:600; }
    .card-arrow { margin-left:auto; color:#999; }
    .card-arrow svg { width:16px; height:16px; }
    .quickstart { display:grid; grid-template-columns:1fr 1fr; gap:44px; padding:30px; background:var(--soft); border-radius:12px; }
    .quickstart h2 { font-size:27px; }
    .quickstart p { max-width:390px; color:var(--muted); font-size:14px; line-height:1.65; }
    pre { overflow:auto; margin:0; padding:20px; color:#e8e8e8; background:#171717; border-radius:8px; font:12px/1.75 ui-monospace, SFMono-Regular, Menlo, monospace; }
    .cmd-muted { color:#8d8d8d; }
    footer { padding:23px 0 35px; border-top:1px solid var(--line); color:#888; font-size:12px; display:flex; justify-content:space-between; gap:20px; }
    @media (max-width:700px) { .shell { width:min(100% - 28px, 1120px); } header { height:64px; } nav a:not(.github) { display:none; } .hero { padding:75px 0 68px; } h1 { font-size:48px; } .hero-copy { font-size:15px; } section { padding:55px 0; } .section-head { align-items:start; flex-direction:column; gap:13px; } .game-grid { grid-template-columns:1fr 1fr; } .game-card { min-height:70px; padding:11px; gap:9px; } .game-mark { width:34px; height:34px; } .game-name { font-size:12px; } .quickstart { grid-template-columns:1fr; gap:22px; padding:22px; } footer { flex-direction:column; gap:8px; } }
    @media (max-width:390px) { .game-grid { grid-template-columns:1fr; } }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <a class="brand" href="/"><span class="brand-mark">V</span><span>Validator</span></a>
      <nav><a href="#endpoints">Endpoints</a><a href="#quickstart">Quick start</a><a class="github" href="https://github.com/cmnty-aps/validate-game" target="_blank" rel="noreferrer">GitHub ${arrow}</a></nav>
    </header>
    <main>
      <section class="hero">
        <div class="eyebrow"><i></i> Game ID validation API</div>
        <h1>Know who’s<br />behind the ID.</h1>
        <p class="hero-copy">API ringan untuk mencari nickname in-game dari player ID. Cepat, sederhana, dan siap dipakai di aplikasi kamu.</p>
        <div class="actions"><a class="button primary" href="#quickstart">Mulai dengan cepat ${arrow}</a><a class="button secondary" href="#endpoints">Lihat endpoint</a></div>
      </section>
      <section id="endpoints">
        <div class="section-head"><div><p class="section-kicker">Supported games</p><h2>Semua endpoint, satu tempat.</h2></div><a class="text-link" href="https://github.com/cmnty-aps/validate-game#daftar-game" target="_blank" rel="noreferrer">Lihat dokumentasi lengkap ${arrow}</a></div>
        <div class="game-grid">${gameCards}</div>
      </section>
      <section id="quickstart">
        <div class="quickstart"><div><p class="section-kicker">Quick start</p><h2>Mulai dalam satu request.</h2><p>Gunakan endpoint GET untuk validasi paling cepat, atau POST untuk menjaga parameter tetap berada di request body.</p><a class="text-link" href="https://github.com/cmnty-aps/validate-game#metode-request" target="_blank" rel="noreferrer">Baca cara penggunaan ${arrow}</a></div><pre><span class="cmd-muted">$</span> curl "https://api.isan.eu.org/nickname/ml?id=1114917746&amp;server=13486"\n\n{\n  "success": true,\n  "game": "Mobile Legends",\n  "name": "PlayerName"\n}</pre></div>
      </section>
    </main>
    <footer><span>© 2024 Validator API</span><span>Built for simple, reliable validation.</span></footer>
  </div>
</body>
</html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
}
export default docsPage;
