import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function resolveApiKey(): string {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()) {
    return process.env.RESEND_API_KEY.trim();
  }
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
    return res.status(405).json({ success: false, ok: false, error: 'Método não permitido.' });
  }

  try {
    const body = await parseBody(req);

    // 1. Honeypot anti-spam check
    if (body?.empresa_site) {
      return res.status(200).json({ success: true, ok: true, id: 'hp-discard' });
    }

    // 2. Cloudflare Turnstile Captcha verification
    const captchaToken = body?.captchaToken || body?.['cf-turnstile-response'] || '';
    const turnstileSecret = process.env.TURNSTILE_SECRET;

    if (turnstileSecret && captchaToken) {
      try {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: captchaToken,
          }),
        });
        const verifyData: any = await verifyRes.json();
        if (!verifyData.success) {
          return res.status(400).json({
            ok: false,
            success: false,
            erro: 'captcha',
            error: 'Não conseguimos confirmar o envio. Atualize a página e tente de novo, ou fale com a gente pelo WhatsApp.',
          });
        }
      } catch (captchaErr) {
        console.error('Erro na validação do Turnstile:', captchaErr);
      }
    } else if (turnstileSecret && !captchaToken && process.env.NODE_ENV !== 'test') {
      return res.status(400).json({
        ok: false,
        success: false,
        erro: 'captcha',
        error: 'Não conseguimos confirmar o envio. Atualize a página e tente de novo, ou fale com a gente pelo WhatsApp.',
      });
    }

    const apiKey = resolveApiKey();
    if (!apiKey) {
      console.error('RESEND_API_KEY não configurada no ambiente.');
      return res.status(500).json({
        success: false,
        ok: false,
        error: 'Serviço de e-mail temporariamente indisponível.',
      });
    }

    const resend = new Resend(apiKey);

    const nome = String(body?.nome || body?.business || '').trim();
    const empresa = String(body?.empresa || '').trim();
    const email = String(body?.email || (String(body?.contact || '').includes('@') ? body?.contact : '')).trim();
    const whatsapp = String(body?.whatsapp || (!String(body?.contact || '').includes('@') ? body?.contact : '')).trim();
    const servico = String(body?.servico || body?.goal || '').trim();
    const temSite = String(body?.tem_site || '').trim();
    const prazo = String(body?.prazo || '').trim();
    const mensagem = String(body?.mensagem || body?.challenge || '').trim();
    const wppConfirmation = Boolean(body?.whatsapp_confirmacao || body?.wpp_confirmation);

    if (!nome || (!email && !whatsapp)) {
      return res.status(400).json({
        success: false,
        ok: false,
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
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><strong>Confirmar no WhatsApp:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;">${wppConfirmation ? 'Sim (autorizado pelo cliente)' : 'Não solicitado'}</td>
          </tr>
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
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: 'orcamentos@techhubvision.com.br',
      replyTo: replyTo,
      subject: `[Novo Orçamento] ${nome}${empresa ? ` (${empresa})` : ''} - ${servico || 'Contato'}`,
      html,
    });

    if (error) {
      console.error('Erro Resend:', error);
      return res.status(500).json({ success: false, ok: false, error: error.message });
    }

    // 5. Enviar confirmação automática para o e-mail do solicitante
    if (email) {
      try {
        const fromEmail = process.env.RESEND_FROM || 'Tech Hub <contato@techhubvision.com.br>';
        const confirmationSubject = `Recebemos seu pedido, ${nome}`;
        const servicoDesc = servico || 'seu projeto';
        const confirmationText = `Olá, ${nome}!\n\nRecebemos seu pedido de orçamento para ${servicoDesc} e já estamos olhando com carinho.\n\nA gente responde em até 2 horas, em horário comercial, pelo e-mail ou WhatsApp que você informou.\n\nSe quiser adiantar a conversa, é só chamar no WhatsApp: (31) 98699-4675.\n\nAté já,\nMichelli e Rafael\nTech Hub · Tecnologia que faz sentido.\ntechhubvision.com.br`;

        const confirmationHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; color: #081220; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px;">
            <p style="font-size: 16px; margin-top: 0;">Olá, <strong>${escapeHtml(nome)}</strong>!</p>
            <p style="font-size: 15px;">Recebemos seu pedido de orçamento para <strong>${escapeHtml(servicoDesc)}</strong> e já estamos olhando com carinho.</p>
            <p style="font-size: 15px;">A gente responde em até 2 horas, em horário comercial, pelo e-mail ou WhatsApp que você informou.</p>
            <p style="font-size: 15px;">Se quiser adiantar a conversa, é só chamar no WhatsApp: <a href="https://wa.me/5531986994675" style="color: #0052FF; font-weight: 600; text-decoration: none;">(31) 98699-4675</a>.</p>
            <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #475569;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #081220;">Até já,</p>
              <p style="margin: 0 0 10px 0; color: #081220;">Michelli e Rafael</p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">Tech Hub · Tecnologia que faz sentido.<br/><a href="https://techhubvision.com.br" style="color: #0052FF; text-decoration: none;">techhubvision.com.br</a></p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: fromEmail,
          to: email,
          replyTo: 'orcamentos@techhubvision.com.br',
          subject: confirmationSubject,
          text: confirmationText,
          html: confirmationHtml,
        });
      } catch (clientEmailErr) {
        console.error('Aviso: Falha ao enviar confirmação automática para o cliente:', clientEmailErr);
      }
    }

    return res.status(200).json({ success: true, ok: true, id: data?.id });
  } catch (err: any) {
    console.error('Erro no handler /api/send-email:', err);
    return res.status(500).json({
      success: false,
      ok: false,
      error: err?.message || 'Erro interno ao processar envio.',
    });
  }
}
