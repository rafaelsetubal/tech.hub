import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const built = await readFile('dist/index.html', 'utf8');
const template = built.includes('data-prerendered="home"') ? await readFile('dist/spa.html', 'utf8') : built;
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { renderHome } = await server.ssrLoadModule('/src/prerender.tsx');
  let html = renderHome();
  for (const [source, entry] of Object.entries(manifest)) {
    if (source.startsWith('src/assets/')) html = html.replaceAll('/' + source, '/' + entry.file);
  }
  if (html.includes('/src/assets/')) throw new Error('Prerender contains an unresolved source asset');
  const css = new Set();
  const visited = new Set();
  function collect(key) {
    if (visited.has(key)) return;
    visited.add(key);
    const entry = manifest[key];
    if (!entry) return;
    for (const file of entry.css || []) css.add(file);
    for (const imported of entry.imports || []) collect(imported);
  }
  // Preserve the cascade: global styles first, then the route and its dependencies.
  for (const match of template.matchAll(/<link rel="stylesheet"[^>]*href="\/([^" ]+)"/g)) css.add(match[1]);
  collect('src/pages/Home.tsx');
  // A single style block gives the static page its complete geometry before paint.
  const styles = '<style>' + (await Promise.all([...css].map(file => readFile('dist/' + file, 'utf8')))).join('\n') + '</style>';
  // These markers let Vite recognize the inlined styles when hydrating the route.
  const links = [...css].map(file => '<link rel="stylesheet" href="/' + file + '" media="not all" fetchpriority="low">').join('\n');
  const homeTemplate = template.replace(/<link rel="stylesheet"[^>]+>/g, '').replace(/<script type="module"([^>]+)>/g, '<script type="module"$1 fetchpriority="low">');
  const root = /<div id="root">[\s\S]*<\/div>(\s*<\/body>)/;
  if (!root.test(template)) throw new Error('Built HTML root was not found');
  await writeFile('dist/spa.html', template);
  const page = homeTemplate.replace(root, (_match, closing) => '<div id="root" data-prerendered="home">' + html + '</div>' + closing);
  await writeFile('dist/index.html', page.replace('</head>', () => styles + links + '\n</head>'));
  console.log('Home prerendered with route CSS; other routes retain their independent SPA shell.');
} finally {
  await server.close();
}
