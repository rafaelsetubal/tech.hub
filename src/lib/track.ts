// src/lib/track.ts — Eventos prontos para Google Tag Manager / GA4 (Especificação 5)
export function track(evento: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event: evento,
    pagina: window.location.pathname === '/' ? 'home' : 'sites',
    ...params,
  });
}
