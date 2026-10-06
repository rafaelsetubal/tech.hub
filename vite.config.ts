import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';
import { partytownSnippet } from '@qwik.dev/partytown/integration';


import sendEmailHandler from './api/send-email';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if ((url === '/api/send-email' || url === '/api/orcamento') && req.method === 'POST') {
          const vercelRes: any = {
            statusCode: 200,
            setHeader: (k: string, v: string) => res.setHeader(k, v),
            status(code: number) {
              res.statusCode = code;
              return this;
            },
            json(data: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            },
            end(data?: any) {
              res.end(data);
            },
          };
          try {
            await sendEmailHandler(req, vercelRes);
          } catch (err: any) {
            console.error('[DEV API] Erro no handler:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Erro interno.' }));
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin(), { name: 'analytics-worker', configurePreviewServer(server) { server.middlewares.use((req, _res, next) => { const pathname = (req.url || '/').split('?')[0]; if (pathname !== '/' && !pathname.includes('.') && !pathname.startsWith('/api/')) req.url = '/spa.html'; next(); }); }, transformIndexHtml(html) { return html.replace('<!-- analytics-worker -->', '<script>window.partytown = { forward: ["dataLayer.push"] };</script><script>' + partytownSnippet() + '</script>'); } }],
  build: { manifest: true },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
