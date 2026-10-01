import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const DEFAULT_KEY_B64 = 'cmVfY0w4ODJxOWhfNDdXeXJ1d3p1UEgxdlRKOG1KTHlvWWlh';

function resolveApiKey(): string {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()) {
    return process.env.RESEND_API_KEY.trim();
  }
  try {
    const decoded = Buffer.from(DEFAULT_KEY_B64, 'base64').toString('utf-8');
    if (decoded && decoded.startsWith('re_')) {
      return decoded;
    }
  } catch {}
  return '';
}

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve) => {
    let chunks = '';
    req.on?.('data', (c: any) => {
      chunks += c;
    });
    req.on?.('end', () => {
      try {
        resolve(JSON.parse(chunks || '{}'));
      } catch {
        resolve({});
      }
    });
    if (!req.on) {
      resolve({});
    }
  });
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido.' });
  }

  try {
    const apiKey = resolveApiKey();
    if (!apiKey) {
      console.error('RESEND_API_KEY não configurada no ambiente.');
      return res.status(500).json({
        success: false,
        error: 'Serviço de e-mail temporariamente indisponível.',
      });
    }

    const resend = new Resend(apiKey);
    const body = await parseBody(req);
    
    // Honeypot spam check
    if (body?.empresa_site) {
      return res.status(200).json({ success: true, id: 'hp-discard' });
    }

    const nome = String(body?.nome || body?.business || '').trim();
    const empresa = String(body?.empresa || '').trim();
    const email = String(body?.email || (String(body?.contact || '').includes('@') ? body?.contact : '')).trim();
    const whatsapp = String(body?.whatsapp || (!String(body?.contact || '').includes('@') ? body?.contact : '')).trim();
    const servico = String(body?.servico || body?.goal || '').trim();
    const temSite = String(body?.tem_site || '').trim();
    const prazo = String(body?.prazo || '').trim();
    const mensagem = String(body?.mensagem || body?.challenge || '').trim();

    if (!nome || (!email && !whatsapp)) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, informe seu nome e ao menos uma forma de contato (e-mail ou WhatsApp).',
      });
    }

    const replyTo = email ? email : undefined;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #0f172a;">
        <div style="margin-bottom: 22px; border-bottom: 2px solid #0052FF; padding-bottom: 14px;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #0052FF; text-transform: uppercase;">Tech Hub · Novo Orçamento</span>
          <h1 style="font-size: 22px; color: #0f172a; margin: 6px 0 0 0; font-weight: 600;">Nova solicitação de projeto</h1>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 140px; border-bottom: 1px solid #f1f5f9;"><strong>Nome:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${escapeHtml(nome)}</td>
          </tr>
          ${empresa ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Empresa / Negócio:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(empresa)}</td>
          </tr>` : ''}
          ${email ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>E-mail:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(email)}</td>
          </tr>` : ''}
          ${whatsapp ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>WhatsApp:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(whatsapp)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Serviço / Objetivo:</strong></td>
            <td style="padding: 10px 0; color: #0052FF; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${escapeHtml(servico || 'Não informado')}</td>
          </tr>
          ${temSite ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Já tem site / domínio?</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(temSite)}</td>
          </tr>` : ''}
          ${prazo ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Para quando precisa:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(prazo)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Mensagem / Desafio:</strong></td>
            <td style="padding: 12px 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(mensagem || 'Não detalhado')}</td>
          </tr>
        </table>
        
        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          <span>Recebido automaticamente através do formulário do site <strong>techhubvision.com.br</strong></span>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'orcamentos@techhubvision.com.br',
      replyTo: replyTo,
      subject: `[Novo Orçamento] ${nome}${empresa ? ` (${empresa})` : ''} - ${servico || 'Contato'}`,
      html,
    });

    if (error) {
      console.error('Erro Resend:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Erro no handler /api/send-email:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro interno ao processar envio.',
    });
  }
}
