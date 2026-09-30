import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import handler from '../api/send-email';

beforeAll(() => {
  if (!process.env.RESEND_API_KEY) {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/RESEND_API_KEY=(.+)/);
        if (match) process.env.RESEND_API_KEY = match[1].trim();
      }
    } catch {}
  }
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
