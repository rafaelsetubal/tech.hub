import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectBrief } from '../src/components/ui/ProjectBrief';

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('Shared brief steps', () => {
  it.each(['home', 'sites'] as const)('preserves project and contact drafts when navigating on %s', async pagina => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetch);
    const user = userEvent.setup();
    render(<ProjectBrief pagina={pagina} />);
    await user.selectOptions(screen.getByLabelText('Seu objetivo principal'), 'Página de venda');
    await user.type(screen.getByLabelText(/Como podemos ajudar/), 'Quero apresentar uma nova oferta.');
    await user.click(screen.getByText('Detalhes adicionais (opcional)'));
    await user.click(screen.getByLabelText('Tenho só o domínio'));
    await user.selectOptions(screen.getByLabelText(/Para quando/), 'Em até 1 mês');
    await user.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    expect(fetch).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: /Etapa 2/ }));
    await user.type(screen.getByLabelText(/Seu nome ou negócio/), 'Ana');
    await user.type(screen.getByLabelText(/WhatsApp ou E-mail/), 'ana@exemplo.com');
    await user.click(screen.getByRole('button', { name: /Voltar ao projeto/ }));
    expect((screen.getByLabelText(/Como podemos ajudar/) as HTMLTextAreaElement).value).toBe('Quero apresentar uma nova oferta.');
    expect((screen.getByLabelText('Seu objetivo principal') as HTMLSelectElement).value).toBe('Página de venda');
    await user.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    expect((screen.getByLabelText(/Seu nome ou negócio/) as HTMLInputElement).value).toBe('Ana');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    await screen.findByRole('status');
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(payload).toMatchObject({ nome: 'Ana', whatsapp: 'ana@exemplo.com', servico: 'Página de venda', tem_site: 'Tenho só o domínio', prazo: 'Em até 1 mês', mensagem: 'Quero apresentar uma nova oferta.', pagina });
    expect(fetch).toHaveBeenCalledTimes(1);
  }, 15000);

  it('validates each visible step without submitting incomplete data', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const user = userEvent.setup();
    render(<ProjectBrief />);
    await user.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    expect(screen.getByRole('heading', { name: /Etapa 1/ })).toBeTruthy();
    await user.type(screen.getByLabelText(/Como podemos ajudar/), 'Organizar pedidos.');
    expect((screen.getByLabelText(/Como podemos ajudar/) as HTMLTextAreaElement).validity.valid).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(screen.getByRole('heading', { name: /Etapa 2/ })).toBeTruthy();
    expect((screen.getByLabelText(/Seu nome ou negócio/) as HTMLInputElement).validity.valid).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  }, 15000);

  it('keeps the completed draft after a failed send and retries the same payload', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Indisponível' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetch);
    const user = userEvent.setup();
    render(<ProjectBrief />);
    await user.type(screen.getByLabelText(/Como podemos ajudar/), 'Organizar minha equipe.');
    await user.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    await user.type(screen.getByLabelText(/Seu nome ou negócio/), 'Ana');
    await user.type(screen.getByLabelText(/WhatsApp ou E-mail/), 'ana@exemplo.com');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    await screen.findByRole('alert');
    expect((screen.getByLabelText(/Seu nome ou negócio/) as HTMLInputElement).value).toBe('Ana');
    await user.click(screen.getByRole('button', { name: 'Tentar de novo' }));
    await screen.findByRole('status');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[1][1].body).toBe(fetch.mock.calls[0][1].body);
  }, 15000);
});
