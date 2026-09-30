import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';

const DEFAULT_KEY_B64 = 'cmVfY0w4ODJxOWhfNDdXeXJ1d3p1UEgxdlRKOG1KTHlvWWlh';

function resolveResendKey(): string {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()) {
    return process.env.RESEND_API_KEY.trim();
  }
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^RESEND_API_KEY=(.+)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {}
  try {
    return Buffer.from(DEFAULT_KEY_B64, 'base64').toString('utf-8');
  } catch {}
  return '';
}

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { business, contact, goal, challenge } = data;

              if (!business || !contact) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Campos obrigatórios ausentes.' }));
                return;
              }

              const apiKey = resolveResendKey();
              if (!apiKey) {
                console.error('[DEV API] RESEND_API_KEY não configurada no ambiente nem no .env');
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Chave RESEND_API_KEY não encontrada no .env' }));
                return;
              }

              const resend = new Resend(apiKey);
              const emailMatch = String(contact).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
              const replyTo = emailMatch ? emailMatch[0] : undefined;

              const html = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #0f172a;">
                  <div style="margin-bottom: 22px; border-bottom: 2px solid #0052FF; padding-bottom: 14px;">
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #0052FF; text-transform: uppercase;">Tech Hub · Novo Contato</span>
                    <h1 style="font-size: 22px; color: #0f172a; margin: 6px 0 0 0; font-weight: 600;">Nova solicitação de orçamento</h1>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 140px; border-bottom: 1px solid #f1f5f9;"><strong>Nome / Empresa:</strong></td>
                      <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${business}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Contato:</strong></td>
                      <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${contact}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Objetivo Principal:</strong></td>
                      <td style="padding: 10px 0; color: #0052FF; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${goal || 'Não informado'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Desafio / Mensagem:</strong></td>
                      <td style="padding: 12px 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${challenge || 'Não detalhado'}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                    <span>Recebido através do formulário do site <strong>techhubvision.com.br</strong></span>
                  </div>
                </div>
              `;

              const result = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'orcamentos@techhubvision.com.br',
                replyTo: replyTo,
                subject: `[Novo Orçamento] ${business} - ${goal || 'Contato'}`,
                html,
              });

              res.setHeader('Content-Type', 'application/json');
              if (result.error) {
                console.error('[DEV API] Erro Resend:', result.error);
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: result.error.message }));
              } else {
                console.log('[DEV API] E-mail enviado com sucesso via Resend! ID:', result.data?.id);
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, id: result.data?.id }));
              }
            } catch (err: any) {
              console.error('[DEV API] Erro no processamento:', err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err?.message || 'Erro interno.' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
