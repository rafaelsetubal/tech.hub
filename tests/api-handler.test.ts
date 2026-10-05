import { describe, it, expect, beforeAll, vi } from 'vitest';

const sendMock = vi.fn(async () => ({ data: { id: 'test-email-id' }, error: null }));
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import handler from '../api/send-email';

beforeAll(() => {
  vi.stubEnv('RESEND_API_KEY', 're_test_placeholder');
});

describe('Resend API Handler (/api/send-email & /api/orcamento)', () => {
  it('should validate missing required fields', async () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = {
      method: 'POST',
      body: {},
    };

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        responseData = data;
        return mockRes;
      },
      end: () => mockRes,
    };

    await handler(mockReq as any, mockRes as any);

    expect(statusCode).toBe(400);
    expect(responseData?.success).toBe(false);
  });

  it('should successfully discard honeypot submissions', async () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = {
      method: 'POST',
      body: {
        nome: 'Spam Bot',
        empresa_site: 'http://spam-link.com',
        email: 'spam@bot.com',
      },
    };

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        responseData = data;
        return mockRes;
      },
      end: () => mockRes,
    };

    await handler(mockReq as any, mockRes as any);

    expect(statusCode).toBe(200);
    expect(responseData?.id).toBe('hp-discard');
  });

  it('should reject submission if Turnstile captcha verification fails', async () => {
    vi.stubEnv('TURNSTILE_SECRET', 'test_secret_key');
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] }),
    })) as any;

    let statusCode = 0;
    let responseData: any = null;

    const mockReq = {
      method: 'POST',
      body: {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        captchaToken: 'invalid_token',
      },
    };

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        responseData = data;
        return mockRes;
      },
      end: () => mockRes,
    };

    await handler(mockReq as any, mockRes as any);
    globalThis.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.stubEnv('RESEND_API_KEY', 're_test_placeholder');

    expect(statusCode).toBe(400);
    expect(responseData?.erro).toBe('captcha');
    expect(responseData?.error).toContain('Não conseguimos confirmar o envio');
  });

  it('should successfully send lead email via Resend and confirmation email to client', async () => {
    sendMock.mockClear();
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = {
      method: 'POST',
      body: {
        nome: 'Ana Cliente',
        business: 'Empresa Teste Automatizado',
        contact: 'orcamentos@techhubvision.com.br',
        email: 'cliente@exemplo.com.br',
        goal: 'Organizar minha operação',
        challenge: 'Teste de integração contínua do formulário via Resend.',
        whatsapp_confirmacao: true,
      },
    };

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        responseData = data;
        return mockRes;
      },
      end: () => mockRes,
    };

    await handler(mockReq as any, mockRes as any);

    expect(statusCode).toBe(200);
    expect(responseData?.success).toBe(true);
    expect(responseData?.id).toBeDefined();

    // Verify two emails were sent: 1 to Tech Hub team, 1 confirmation to client
    expect(sendMock).toHaveBeenCalledTimes(2);
    // Team lead notification:
    expect(sendMock.mock.calls[0][0].to).toBe('orcamentos@techhubvision.com.br');
    // Client auto-confirmation:
    expect(sendMock.mock.calls[1][0].to).toBe('cliente@exemplo.com.br');
    expect(sendMock.mock.calls[1][0].subject).toContain('Recebemos seu pedido, Ana Cliente');
  }, 15000);
});
