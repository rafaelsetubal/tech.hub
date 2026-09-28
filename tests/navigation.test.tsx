import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Navbar } from '../src/components/layout/Navbar';
import { readFileSync } from 'node:fs';

describe('Shared navigation', () => {
  it('opens with focus on the first link; Escape closes and restores the toggle', async () => {
    const user=userEvent.setup(); render(<Navbar/>);
    const button=screen.getByRole('button',{name:'Abrir menu'});
    expect(button.getAttribute('aria-expanded')).toBe('false');
    const id=button.getAttribute('aria-controls')!;
    expect(document.getElementById(id)?.hidden).toBe(true);
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(within(screen.getByRole('navigation',{name:'Navegação mobile'})).getByRole('link',{name:'Início'}));
    await user.keyboard('{Escape}');
    expect(document.getElementById(id)?.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
  });
  it('moves focus to the destination and closes the dropdown', async () => {
    const user=userEvent.setup(); render(<><Navbar/><main id="main-content"><section id="sobre"><h1>Sobre</h1></section></main></>);
    await user.click(screen.getByRole('button',{name:'Abrir menu'}));
    await user.click(within(screen.getByRole('navigation',{name:'Navegação mobile'})).getByRole('link',{name:'Sobre'}));
    expect(screen.getByRole('button',{name:'Abrir menu'}).getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement?.id).toBe('sobre');
    expect(window.location.hash).toBe('#sobre');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
  it('uses ordered local destinations on /sites and the correct contact anchor', () => {
    render(<Navbar page="sites"/>);
    const nav=within(screen.getByRole('navigation',{name:'Navegação principal'}));
    expect(nav.getAllByRole('link').map(link=>link.getAttribute('href'))).toEqual(['#sites-inicio','#portfolio','#formatos','#como-criamos','#acompanhamento','/']);
    expect(screen.getByRole('link',{name:'Conversar agora'}).getAttribute('href')).toBe('#seu-projeto');
  });
  it('dismisses on outside click without trapping focus', async () => {
    const user=userEvent.setup(); render(<><Navbar/><button>Fora do menu</button></>);
    await user.click(screen.getByRole('button',{name:'Abrir menu'}));
    await user.click(screen.getByRole('button',{name:'Fora do menu'}));
    expect(screen.getByRole('button',{name:'Abrir menu'}).getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(screen.getByRole('button',{name:'Fora do menu'}));
  });
  it('disables smooth anchor navigation when reduced motion is preferred', async () => {
    vi.mocked(window.matchMedia).mockImplementation(query=>({matches:query.includes('reduced-motion'),media:query,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList));
    const user=userEvent.setup(); render(<><Navbar/><section id="sobre">Sobre</section></>);
    await user.click(within(screen.getByRole('navigation',{name:'Navegação principal'})).getByRole('link',{name:'Sobre'}));
    expect(Element.prototype.scrollIntoView).toHaveBeenLastCalledWith({behavior:'auto'});
  });
  it('has no axe structural violations with the menu open', async () => {
    const user=userEvent.setup(); const {container}=render(<><Navbar/><main id="main-content"><h1>Página de teste</h1></main></>);
    await user.click(screen.getByRole('button',{name:'Abrir menu'}));
    const result=await axe.run(container,{rules:{'color-contrast':{enabled:false}}});
    expect(result.violations.map(v=>v.id)).toEqual([]);
  });
  it('locks in opaque surfaces, 44px targets and mobile overflow protection', () => {
    const css=readFileSync('src/styles/navigation.css','utf8');
    expect(css).toMatch(/shared-mobile-nav\{[^}]*background:#fff/);
    expect(css).toMatch(/shared-nav-bar\{[^}]*background:#fff/);
    expect(css).toContain('min-height:44px');
    expect(css).toContain('max-height:calc(100dvh - 115px)');
    expect(css).toContain('overflow-y:auto');
    expect(css).toContain(':focus-visible');
  });
});

function contrast(fg:string,bg:string){
  const luminance=(hex:string)=>{const rgb=hex.match(/\w\w/g)!.map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
  const values=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);return(values[0]+.05)/(values[1]+.05);
}
describe('Navigation colour contrast (WCAG AA normal text)',()=>{
  it.each([['23354e','ffffff'],['46566d','f2f5f9'],['153bae','edf2ff'],['ffffff','2451d8'],['14243a','f2f5f9']])('%s on %s exceeds 4.5:1',(fg,bg)=>{expect(contrast(fg,bg)).toBeGreaterThanOrEqual(4.5);});
});
