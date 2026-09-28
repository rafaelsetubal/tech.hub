import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { ProcessSection } from '../src/components/sections/ProcessSection';

describe('Process narrative',()=>{
  it('starts with unresolved problems, not success messages',()=>{
    const {container}=render(<ProcessSection/>);
    expect(container.querySelector('.process-state-0')).toBeTruthy();
    expect(screen.getByText('Quem cuida disso?')).toBeTruthy();
    expect(screen.getByText('De novo esse trabalho?')).toBeTruthy();
    expect(screen.getByRole('heading',{name:'Primeiro, entender o que trava.'})).toBeTruthy();
    expect(container.querySelectorAll('.tile-warning-icon')).toHaveLength(2);
  });
  it('resolves those same four cards progressively and restores problems on return',async()=>{
    const user=userEvent.setup();const {container}=render(<ProcessSection/>);
    await user.click(screen.getByRole('tab',{name:/Desenhar/}));
    expect(screen.getByText('Cada tarefa tem um dono.')).toBeTruthy();
    expect(container.querySelector('.tile-warning-icon')).toBeNull();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Ferramentas trocando informação.')).toBeTruthy();
    await user.keyboard('{End}');
    expect(screen.getByText('Mais tempo para avançar.')).toBeTruthy();
    expect(container.querySelector('.process-state-3')).toBeTruthy();
    await user.keyboard('{Home}');
    expect(screen.getByText('Qual é o dado certo?')).toBeTruthy();
    expect(container.querySelector('.process-state-0')).toBeTruthy();
  });
  it('keeps the problem explanation accessible without relying on red alone',async()=>{
    const {container}=render(<main><h1>Tech Hub</h1><ProcessSection/></main>);
    expect(container.querySelector('.process-caption .sr-only')?.textContent).toContain('O pedido ficou sem dono.');
    const result=await axe.run(container,{rules:{'color-contrast':{enabled:false}}});
    expect(result.violations.map(v=>v.id)).toEqual([]);
  });
});
