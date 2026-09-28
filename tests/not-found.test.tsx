import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import App from '../src/App';
import { NotFound } from '../src/pages/NotFound';

beforeEach(() => {
  document.head.innerHTML = '<title>Tech Hub | Gestão, processos e tecnologia</title><meta name="description" content="Descrição inicial"><meta name="robots" content="index,follow"><meta property="og:title" content="Tech Hub"><meta property="og:description" content="Descrição inicial">';
});

describe('404 route', () => {
  it.each(['/404', '/rota-inexistente'])('shows the designed not-found page at %s', path => {
    window.history.replaceState(null, '', path);
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Não achamos essa página.' })).toBeTruthy();
    expect(screen.getByRole('img', { name: /Ilustração de formas quebradas/ }).getAttribute('src')).toBe('/404-illustration.webp');
  });

  it('offers contact and home actions without sending form data', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /Conversar com a Tech Hub/ }).getAttribute('href')).toBe('/#cta-diagnostico');
    expect(screen.getByRole('link', { name: /Voltar para home/ }).getAttribute('href')).toBe('/');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex,follow');
  });

  it('has no axe structural violations', async () => {
    const { container } = render(<NotFound />);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(result.violations.map(violation => violation.id)).toEqual([]);
  });
});
