import React from 'react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Sites } from '../src/pages/Sites';

// Test interaction and document semantics without running decorative GSAP reveals.
vi.mock('../src/components/motion/MotionReveal',()=>({MotionReveal:({children}:{children:React.ReactNode})=><div>{children}</div>}));
// Page semantics are tested independently from WebGL (covered by native-hero tests).
vi.mock('../src/components/ui/NativeHeroScene',()=>({NativeHeroScene:()=> <div aria-hidden="true"/>}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Complete sites page',()=>{
  it('carries the chosen offer to the brief and preserves the draft when returning',async()=>{
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, id: 'resend-123' }),
    });
    const user=userEvent.setup();render(<Sites/>);
    await user.click(screen.getByRole('tab',{name:/Vender um produto ou serviço/}));
    await user.click(screen.getByRole('link',{name:/Quero uma página assim/}));
    expect((screen.getByLabelText(/Seu objetivo/i) as HTMLSelectElement).value).toBe('Vender um produto ou serviço');
    await user.type(screen.getByLabelText(/Seu nome ou negócio/i),'Minha empresa');
    await user.type(screen.getByLabelText(/Como podemos ajudar/i),'Divulgar minha oferta.');
    await user.type(screen.getByLabelText(/WhatsApp ou E-mail/i),'(31) 98888-8888');
    await user.click(screen.getByRole('button',{name:/Enviar mensagem/i}));
    const result=await screen.findByRole('status');
    expect(result.textContent).toContain('Mensagem enviada com sucesso!');
    await user.click(screen.getByRole('button',{name:/Enviar outra mensagem/i}));
    expect((screen.getByLabelText(/Seu nome ou negócio/i) as HTMLInputElement).value).toBe('Minha empresa');
    expect((screen.getByLabelText(/Como podemos ajudar/i) as HTMLTextAreaElement).value).toBe('Divulgar minha oferta.');
  }, 15000);
  it('has a complete footer whose local links resolve to existing sections',()=>{
    render(<Sites/>);
    const footer=screen.getByRole('contentinfo');
    expect(within(footer).getByRole('navigation',{name:'Navegação do rodapé'})).toBeTruthy();
    expect(within(footer).getByRole('link',{name:/Conversar pelo WhatsApp/})).toBeTruthy();
    for(const link of within(footer).getAllByRole('link')){
      const href=link.getAttribute('href')!;
      if(href.startsWith('#')) expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    expect(footer.textContent).toContain('CNPJ 53.344.679/0001-00');
  });
  it('provides one main heading, a skip target, and the shared menu',()=>{
    render(<Sites/>);
    expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);
    expect(screen.getByRole('main').id).toBe('main-content');
    expect(screen.getByRole('link',{name:'Pular para o conteúdo'}).getAttribute('href')).toBe('#main-content');
    expect(screen.getByRole('button',{name:'Abrir menu'}).getAttribute('aria-expanded')).toBe('false');
  });
  it('supports arrow, Home and End keys in the page-format tabs',async()=>{
    const user=userEvent.setup();render(<Sites/>);
    const tabs=within(screen.getByRole('tablist',{name:'Objetivo da página'})).getAllByRole('tab');
    tabs[0].focus();await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toBe(tabs[1].id);
    await user.keyboard('{End}');expect(document.activeElement).toBe(tabs[2]);
    await user.keyboard('{Home}');expect(document.activeElement).toBe(tabs[0]);
  });
  it('opens FAQ answers and prepares the brief without sending user data',async()=>{
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, id: 'resend-456' }),
    });
    const user=userEvent.setup();render(<Sites/>);
    const summary=screen.getByText('Preciso saber de tecnologia?');
    await user.click(summary);
    expect(summary.closest('details')?.open).toBe(true);
    await user.type(screen.getByLabelText(/Seu nome ou negócio/i),'Estúdio teste');
    await user.type(screen.getByLabelText(/WhatsApp ou E-mail/i),'(31) 99999-9999');
    await user.type(screen.getByLabelText(/Como podemos ajudar/i),'Quero apresentar meus serviços.');
    await user.click(screen.getByRole('button',{name:/Enviar mensagem/i}));
    const result=await screen.findByRole('status');
    expect(result.textContent).toContain('Estúdio teste');
    expect(result.textContent).toContain('Apresentar minha empresa na internet');
    expect(result.textContent).toContain('Mensagem enviada com sucesso!');
  }, 15000);
  it('has no automated axe structural violations',async()=>{
    const {container}=render(<Sites/>);
    const result=await axe.run(container,{rules:{'color-contrast':{enabled:false}}});
    expect(result.violations.map(v=>({id:v.id,description:v.description}))).toEqual([]);
  }, 15000);
});
