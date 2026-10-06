import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProjectBrief } from '../src/components/ui/ProjectBrief';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

function contactStep() {
  fireEvent.change(screen.getByLabelText(/Como podemos ajudar/), { target: { value: 'Organizar pedidos' } });
  fireEvent.click(screen.getByRole('button', { name: 'Continuar para contato' }));
  fireEvent.change(screen.getByLabelText(/Seu nome ou negócio/), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText(/WhatsApp ou E-mail/), { target: { value: 'ana@example.com' } });
}

function mockWidget() {
  const callbacks: any[] = [];
  const widget = {
    render: vi.fn((_container, options) => { callbacks.push(options); return `widget-${callbacks.length}`; }),
    remove: vi.fn(), reset: vi.fn(),
  };
  vi.stubGlobal('turnstile', widget);
  return { widget, callbacks };
}

describe('Turnstile lifecycle', () => {
  it('waits for a slowly loaded script beyond the old 500ms limit', async () => {
    vi.stubGlobal('turnstile', undefined);
    render(<ProjectBrief />);
    contactStep();
    await new Promise(resolve => setTimeout(resolve, 650));
    const { widget } = mockWidget();
    await waitFor(() => expect(widget.render).toHaveBeenCalledTimes(1));
  });

  it('removes and recreates the widget when navigating between steps', () => {
    const { widget } = mockWidget();
    const view = render(<ProjectBrief />);
    contactStep();
    fireEvent.click(screen.getByRole('button', { name: /Voltar ao projeto/ }));
    expect(widget.remove).toHaveBeenCalledWith('widget-1');
    fireEvent.click(screen.getByRole('button', { name: 'Continuar para contato' }));
    expect(widget.render).toHaveBeenCalledTimes(2);
    view.unmount();
    expect(widget.remove).toHaveBeenCalledWith('widget-2');
  });

  it('blocks unverified sends and uses a fresh token after a failed delivery', async () => {
    vi.stubEnv('MODE', 'production');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Entrega indisponível' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal('fetch', fetch);
    const { widget, callbacks } = mockWidget();
    render(<ProjectBrief />);
    contactStep();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(fetch).not.toHaveBeenCalled();
    act(() => callbacks[0].callback('first-token'));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    await waitFor(() => expect(widget.reset).toHaveBeenCalledWith('widget-1'));
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
    expect(fetch).toHaveBeenCalledTimes(1);
    act(() => callbacks[0].callback('fresh-token'));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    await screen.findByRole('status');
    expect(JSON.parse(fetch.mock.calls[1][1].body).captchaToken).toBe('fresh-token');
  });
});
