import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#050c17" />
      <stop offset="45%" stop-color="#081220" />
      <stop offset="100%" stop-color="#0a1930" />
    </linearGradient>

    <radialGradient id="glowTopRight" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.35" />
      <stop offset="45%" stop-color="#00BAFF" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#081220" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glowBottomLeft" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#081220" stop-opacity="0" />
    </radialGradient>

    <!-- Symbol Gradients -->
    <linearGradient id="symbolGradMain" x1="0" y1="220" x2="205" y2="81" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0059FF" />
      <stop offset="42%" stop-color="#4169FF" />
      <stop offset="72%" stop-color="#00BAFF" />
      <stop offset="100%" stop-color="#D8D3FF" />
    </linearGradient>

    <linearGradient id="symbolGradSub" x1="150" y1="143" x2="216" y2="77" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7F7FFC" />
      <stop offset="38%" stop-color="#9FA2FC" />
      <stop offset="68%" stop-color="#00FFA2" />
      <stop offset="100%" stop-color="#EAF2FF" />
    </linearGradient>

    <!-- Card & Border Gradients -->
    <linearGradient id="cardGrad" x1="0" y1="0" x2="420" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#142342" stop-opacity="0.90" />
      <stop offset="100%" stop-color="#0b1628" stop-opacity="0.96" />
    </linearGradient>

    <linearGradient id="borderGrad" x1="0" y1="0" x2="420" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#00BAFF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.15" />
    </linearGradient>

    <linearGradient id="textGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>

    <linearGradient id="accentGrad" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00BAFF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>

    <filter id="dropGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#0059FF" flood-opacity="0.4" />
    </filter>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="30" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowTopRight)" />
  <rect width="1200" height="630" fill="url(#glowBottomLeft)" />

  <!-- Subtle Blueprint Grid Lines -->
  <g opacity="0.04" stroke="#FFFFFF" stroke-width="1">
    <line x1="84" y1="0" x2="84" y2="630" />
    <line x1="284" y1="0" x2="284" y2="630" />
    <line x1="484" y1="0" x2="484" y2="630" />
    <line x1="684" y1="0" x2="684" y2="630" />
    <line x1="884" y1="0" x2="884" y2="630" />
    <line x1="1084" y1="0" x2="1084" y2="630" />
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="280" x2="1200" y2="280" />
    <line x1="0" y1="440" x2="1200" y2="440" />
  </g>

  <!-- Left Content Area -->
  <g transform="translate(84, 76)">
    <!-- Header: Logo Brand & Tagline -->
    <g transform="translate(0, 0)">
      <!-- Symbol Scaled -->
      <g transform="translate(0, -6) scale(0.24)" filter="url(#dropGlow)">
        <path d="M129.451 217.411C123.102 222.721 105.905 220.601 98.8179 217.015C77.672 206.314 84.3229 185.76 79.0827 167.343C77.5093 161.814 73.1903 155.837 68.7482 152.23C53.6609 138.354 33.6483 148.2 16.949 139.987C-0.136224 131.585 -4.09175 108.946 4.12118 92.8541C15.159 71.2278 36.6338 78.4444 55.4484 74.8354C58.5229 74.2462 64.407 70.1043 67.2631 68.3039C87.1082 57.5679 77.7672 31.7163 85.6099 16.921C99.34 -8.97919 139.812 -4.02705 148.206 24.1425C151.264 34.4081 150.281 42.2856 145.857 51.2032C134.986 74.2844 114.125 65.6927 96.0354 71.0895C68.742 79.2317 67.423 110.463 74.6705 132.247C99.0056 166.323 119.675 134.399 143.004 165.259C155.95 182.385 148.906 209.326 129.451 217.411Z" fill="url(#symbolGradMain)"/>
        <path d="M178.832 77.5667C196.9 75.2696 213.418 88.0255 215.752 106.078C218.084 124.131 205.353 140.663 187.293 143.03C169.185 145.403 152.588 132.636 150.248 114.534C147.909 96.4324 160.715 79.8701 178.832 77.5667Z" fill="url(#symbolGradSub)"/>
      </g>

      <!-- Brand Text -->
      <text x="64" y="27" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="28" letter-spacing="-0.03em" fill="#FFFFFF">TECH</text>
      <text x="146" y="27" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="20" letter-spacing="0.28em" fill="#94A3B8">HUB</text>

      <!-- Divider -->
      <line x1="228" y1="10" x2="228" y2="34" stroke="#334155" stroke-width="1.5" />

      <!-- Tagline Pill -->
      <g transform="translate(244, 7)">
        <rect width="230" height="28" rx="14" fill="#00BAFF" fill-opacity="0.1" stroke="#00BAFF" stroke-opacity="0.35" stroke-width="1"/>
        <circle cx="14" cy="14" r="3.5" fill="#00FFA2" />
        <text x="26" y="18.5" font-family="monospace, system-ui" font-size="11" font-weight="600" letter-spacing="0.14em" fill="#38BDF8">TECNOLOGIA QUE FAZ SENTIDO</text>
      </g>
    </g>

    <!-- Main Headline -->
    <g transform="translate(0, 110)">
      <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.035em" fill="url(#textGrad)">
        <tspan x="0" y="0">Organizamos processos,</tspan>
        <tspan x="0" y="54">conectamos ferramentas</tspan>
        <tspan x="0" y="108" fill="url(#accentGrad)">e criamos sites para PMEs.</tspan>
      </text>

      <text x="0" y="166" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94A3B8" letter-spacing="-0.01em">
        Sem jargão. Sem ferramentas que ninguém usa.
      </text>
      <text x="0" y="196" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94A3B8" letter-spacing="-0.01em">
        Tudo o que sua equipe precisa para trabalhar no mesmo rumo.
      </text>
    </g>

    <!-- Value Badges -->
    <g transform="translate(0, 360)">
      <!-- Badge 1 -->
      <g transform="translate(0, 0)">
        <rect width="180" height="38" rx="19" fill="#142342" stroke="#3B82F6" stroke-opacity="0.4" stroke-width="1"/>
        <text x="18" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">⚡ Gestão &amp; Processos</text>
      </g>

      <!-- Badge 2 -->
      <g transform="translate(192, 0)">
        <rect width="194" height="38" rx="19" fill="#142342" stroke="#3B82F6" stroke-opacity="0.4" stroke-width="1"/>
        <text x="18" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">🔗 Automações &amp; Squads</text>
      </g>

      <!-- Badge 3 -->
      <g transform="translate(398, 0)">
        <rect width="196" height="38" rx="19" fill="#142342" stroke="#3B82F6" stroke-opacity="0.4" stroke-width="1"/>
        <text x="18" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">💻 Sites de Alta Conversão</text>
      </g>
    </g>

    <!-- Domain Footer -->
    <g transform="translate(0, 442)">
      <text font-family="monospace, system-ui" font-size="14" font-weight="600" letter-spacing="0.1em" fill="#64748B">
        techhubvision.com.br
      </text>
    </g>
  </g>

  <!-- Right Visual: Operational Glass Card & Vector Flow Composition -->
  <g transform="translate(730, 80)">
    <!-- Decorative Glowing Orbit Behind Card -->
    <circle cx="200" cy="230" r="190" stroke="#00BAFF" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="4 6"/>
    <circle cx="200" cy="230" r="235" stroke="#3B82F6" stroke-opacity="0.09" stroke-width="1"/>

    <!-- Main Glass Card -->
    <rect x="0" y="30" width="390" height="420" rx="24" fill="url(#cardGrad)" stroke="url(#borderGrad)" stroke-width="1.5" filter="url(#cardShadow)"/>

    <!-- Card Top Header -->
    <g transform="translate(28, 64)">
      <!-- Mini Browser / Indicator Dots -->
      <circle cx="0" cy="0" r="4.5" fill="#EF4444" />
      <circle cx="15" cy="0" r="4.5" fill="#F59E0B" />
      <circle cx="30" cy="0" r="4.5" fill="#10B981" />
      <text x="52" y="4" font-family="monospace, system-ui" font-size="11" font-weight="600" fill="#64748B" letter-spacing="0.08em">TECH HUB OPERATIONAL FLOW</text>
    </g>

    <!-- Card Inner Content: Flow Nodes -->
    <g transform="translate(28, 100)">
      <!-- Step 1: Diagnóstico -->
      <rect x="0" y="0" width="334" height="74" rx="14" fill="#0b1628" fill-opacity="0.75" stroke="#1e293b" stroke-width="1"/>
      <circle cx="28" cy="37" r="14" fill="#1e3a8a" />
      <text x="23" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#60A5FA">1</text>
      <text x="56" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Diagnóstico &amp; Mapeamento</text>
      <text x="56" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94A3B8">Identificação clara de gargalos e rotinas</text>
      <circle cx="308" cy="37" r="4" fill="#00FFA2" />

      <!-- Connector line -->
      <line x1="28" y1="74" x2="28" y2="94" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3 3"/>

      <!-- Step 2: Conexão & Ferramentas -->
      <rect x="0" y="94" width="334" height="74" rx="14" fill="#0b1628" fill-opacity="0.75" stroke="#1e293b" stroke-width="1"/>
      <circle cx="28" cy="131" r="14" fill="#1e3a8a" />
      <text x="23" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#60A5FA">2</text>
      <text x="56" y="124" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Automação &amp; Ferramentas</text>
      <text x="56" y="144" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94A3B8">Sistemas que conversam sem retrabalho</text>
      <circle cx="308" cy="131" r="4" fill="#00FFA2" />

      <!-- Connector line -->
      <line x1="28" y1="168" x2="28" y2="188" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3 3"/>

      <!-- Step 3: Operação Autônoma -->
      <rect x="0" y="188" width="334" height="74" rx="14" fill="#0b1628" fill-opacity="0.75" stroke="#2563EB" stroke-opacity="0.4" stroke-width="1"/>
      <circle cx="28" cy="225" r="14" fill="#2563EB" />
      <text x="23" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">3</text>
      <text x="56" y="218" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Operação Clara &amp; Equipe Alinhada</text>
      <text x="56" y="238" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#38BDF8">Autonomia total para crescer sem travar</text>
      <circle cx="308" cy="225" r="4" fill="#00FFA2" />
    </g>

    <!-- Bottom Stat Floating Pill -->
    <g transform="translate(42, 388)">
      <rect width="306" height="42" rx="21" fill="#1E293B" stroke="#38BDF8" stroke-opacity="0.3" stroke-width="1"/>
      <circle cx="22" cy="21" r="4" fill="#00FFA2" />
      <text x="36" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F1F5F9">Equipe no mesmo rumo · Sem jargão</text>
    </g>
  </g>
</svg>
`;

async function main() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngPath = path.join(publicDir, 'og-image.png');
  const jpgPath = path.join(publicDir, 'og-image.jpg');

  console.log('Rendering SVG to PNG (1200x630)...');
  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(pngPath);

  const pngStats = fs.statSync(pngPath);
  console.log('Generated PNG:', pngPath, (pngStats.size / 1024).toFixed(1) + ' KB');

  console.log('Rendering SVG to JPEG (1200x630)...');
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(jpgPath);

  const jpgStats = fs.statSync(jpgPath);
  console.log('Generated JPEG:', jpgPath, (jpgStats.size / 1024).toFixed(1) + ' KB');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
