import { describe, it, expect, beforeAll, vi } from 'vitest';
vi.mock('resend', () => ({ Resend: class { emails = { send: vi.fn(async () => ({ data: { id: 'test-email-id' }, error: null })) }; } }));
import handler from '../api/send-email';

beforeAll(() => {
  vi.stubEnv('RESEND_API_KEY', 're_test_placeholder');
});

describe('Resend API Handler (/api/send-email)', () => {
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

  it('should successfully send lead email via Resend and return id', async () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = {
      method: 'POST',
      body: {
        business: 'Empresa Teste Automatizado',
        contact: 'orcamentos@techhubvision.com.br',
        goal: 'Organizar minha operação',
        challenge: 'Teste de integração contínua do formulário via Resend.',
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

    console.log('Vitest Resend Output:', responseData);
    expect(statusCode).toBe(200);
    expect(responseData?.success).toBe(true);
    expect(responseData?.id).toBeDefined();
  }, 15000);
});
