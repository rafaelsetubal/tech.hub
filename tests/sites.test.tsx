import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Sites } from '../src/pages/Sites';

// Test interaction and document semantics without running decorative GSAP reveals.
vi.mock('../src/components/motion/MotionReveal',()=>({MotionReveal:({children}:{children:React.ReactNode})=><div>{children}</div>}));
// Page semantics are tested independently from WebGL (covered by native-hero tests).
vi.mock('../src/components/ui/NativeHeroScene',()=>({NativeHeroScene:()=> <div aria-hidden="true"/>}));

describe('Complete sites page',()=>{
  it('carries the chosen offer to the brief and preserves the draft when returning',async()=>{
    const user=userEvent.setup();render(<Sites/>);
    await user.click(screen.getByRole('tab',{name:/Vender um produto ou serviço/}));
    await user.click(screen.getByRole('link',{name:/Quero uma página assim/}));
    expect((screen.getByLabelText('Seu objetivo') as HTMLSelectElement).value).toBe('Vender um produto ou serviço');
    await user.type(screen.getByLabelText('Seu negócio'),'Minha empresa');
    await user.type(screen.getByLabelText('Conte um pouco da sua ideia'),'Divulgar minha oferta.');
    await user.click(screen.getByRole('button',{name:'Preparar meu resumo'}));
    await user.click(screen.getByRole('button',{name:'Preparar outro resumo'}));
    expect((screen.getByLabelText('Seu negócio') as HTMLInputElement).value).toBe('Minha empresa');
    expect((screen.getByLabelText('Conte um pouco da sua ideia') as HTMLTextAreaElement).value).toBe('Divulgar minha oferta.');
  });
  it('has a complete footer whose local links resolve to existing sections',()=>{
    render(<Sites/>);
    const footer=screen.getByRole('contentinfo');
    expect(within(footer).getByRole('navigation',{name:'Navegação do rodapé'})).toBeTruthy();
    expect(within(footer).getByRole('link',{name:'Conte sua ideia'}).getAttribute('href')).toBe('#seu-projeto');
    for(const link of within(footer).getAllByRole('link')){
      const href=link.getAttribute('href')!;
      if(href.startsWith('#')) expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
    expect(footer.textContent).toContain('Todos os direitos reservados.');
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
    const user=userEvent.setup();render(<Sites/>);
    const summary=screen.getByText('Preciso saber de tecnologia?');
    await user.click(summary);
    expect(summary.closest('details')?.open).toBe(true);
    await user.type(screen.getByLabelText('Seu negócio'),'Estúdio teste');
    await user.type(screen.getByLabelText('Conte um pouco da sua ideia'),'Quero apresentar meus serviços.');
    await user.click(screen.getByRole('button',{name:'Preparar meu resumo'}));
    const result=screen.getByRole('status');
    expect(result.textContent).toContain('Estúdio teste');
    expect(result.textContent).toContain('Apresentar minha empresa na internet');
    expect(result.textContent).toContain('Nenhum dado foi enviado ou armazenado.');
  });
  it('has no automated axe structural violations',async()=>{
    const {container}=render(<Sites/>);
    const result=await axe.run(container,{rules:{'color-contrast':{enabled:false}}});
    expect(result.violations.map(v=>({id:v.id,description:v.description}))).toEqual([]);
  });
});
