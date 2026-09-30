import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { HomeFaq, HOME_FAQS } from '../src/components/sections/HomeFaq';
import { CasesSection } from '../src/components/sections/CasesSection';
import { Home } from '../src/pages/Home';

describe('Etapa 2 - Home FAQ & Social Proof', () => {
  it('renders all 5 FAQ questions and answers on HomeFaq', () => {
    const { container } = render(<HomeFaq />);

    // Verify all 5 questions are present
    expect(HOME_FAQS).toHaveLength(5);
    for (const item of HOME_FAQS) {
      expect(screen.getByText(item.question)).toBeTruthy();
      expect(screen.getByText(item.answer)).toBeTruthy();
    }

    // Verify FAQPage JSON-LD schema
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const schema = JSON.parse(script!.textContent || '{}');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(5);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe(HOME_FAQS[0].question);
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(HOME_FAQS[0].answer);
  });

  it('renders WhatsApp support link with duvida context in HomeFaq', () => {
    render(<HomeFaq />);
    const link = screen.getByRole('link', { name: /Tirar dúvidas diretamente pelo WhatsApp/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toContain('https://wa.me/5531986994675');
    expect(decodeURIComponent(link.getAttribute('href')!)).toContain('Fiquei com uma dúvida');
  });

  it('passes axe accessibility checks on HomeFaq', async () => {
    const { container } = render(<HomeFaq />);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(result.violations.map((v) => v.id)).toEqual([]);
  });

  it('renders social proof metrics and results in CasesSection', () => {
    const { container } = render(<CasesSection />);
    expect(screen.getByRole('heading', { name: /Um projeto.*Todo mundo no mesmo rumo/i })).toBeTruthy();
    expect(screen.getByText('Entregas no prazo')).toBeTruthy();
    expect(screen.getByText('Visibilidade total')).toBeTruthy();
    expect(screen.getByText('Operação alinhada')).toBeTruthy();
    expect(screen.getByText(/Processos integrados, entregas no prazo e clareza total/i)).toBeTruthy();
  });

  it('preserves ordered sequence on Home: Services -> Cases (Four Prints) -> Process -> About -> FAQ -> CTA', () => {
    const { container } = render(<Home />);
    const sections = Array.from(container.querySelectorAll('main > section'));
    const sectionIds = sections.map((s) => s.id);

    // Verify servicos -> projetos -> conteudo -> sobre -> faq -> cta-diagnostico
    const servicosIdx = sectionIds.indexOf('servicos');
    const projetosIdx = sectionIds.indexOf('projetos');
    const conteudoIdx = sectionIds.indexOf('conteudo');
    const sobreIdx = sectionIds.indexOf('sobre');
    const faqIdx = sectionIds.indexOf('faq');
    const ctaIdx = sectionIds.indexOf('cta-diagnostico');

    expect(servicosIdx).toBeGreaterThan(-1);
    expect(projetosIdx).toBe(servicosIdx + 1);
    expect(conteudoIdx).toBe(projetosIdx + 1);
    expect(sobreIdx).toBe(conteudoIdx + 1);
    expect(faqIdx).toBe(sobreIdx + 1);
    expect(ctaIdx).toBe(faqIdx + 1);
  });
});
