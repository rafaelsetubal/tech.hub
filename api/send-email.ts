import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY não configurada no ambiente.');
      return res.status(500).json({
        success: false,
        error: 'Serviço de e-mail temporariamente indisponível.',
      });
    }

    const resend = new Resend(apiKey);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { business, contact, goal, challenge } = body || {};

    if (!business || !contact) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, informe seu nome/empresa e uma forma de contato.',
      });
    }

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
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${escapeHtml(business)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Contato:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(contact)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Objetivo Principal:</strong></td>
            <td style="padding: 10px 0; color: #0052FF; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${escapeHtml(goal || 'Não informado')}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Desafio / Mensagem:</strong></td>
            <td style="padding: 12px 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(challenge || 'Não detalhado')}</td>
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
      subject: `[Novo Orçamento] ${business} - ${goal || 'Contato'}`,
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
