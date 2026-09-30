import React from 'react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { ProjectPreview, SitePortfolio } from '../src/components/sections/SitePortfolio';
import { getDailyFeaturedProject, getPortfolioDayKey, siteProjects, type SiteProject } from '../src/data/sitePortfolio';

const project: SiteProject={id:'test',title:'Projeto de teste',description:'Uma apresentação visual do projeto.',placeholderVariant:0,theme:'blue'};
let observers: {callback:IntersectionObserverCallback;options?:IntersectionObserverInit}[]=[];
function intersect(index:number,visible=true){act(()=>{observers[index].callback([{isIntersecting:visible,intersectionRatio:visible?.5:0} as IntersectionObserverEntry],{} as IntersectionObserver);});}
beforeEach(()=>{
  observers=[];
  vi.stubGlobal('IntersectionObserver',class{
    constructor(callback:IntersectionObserverCallback,options?:IntersectionObserverInit){observers.push({callback,options});}
    observe(){} disconnect(){} unobserve(){}
  });
  vi.spyOn(HTMLMediaElement.prototype,'play').mockImplementation(function(this:HTMLMediaElement){Object.defineProperty(this,'paused',{configurable:true,value:false});this.dispatchEvent(new Event('play'));return Promise.resolve();});
  vi.spyOn(HTMLMediaElement.prototype,'pause').mockImplementation(function(this:HTMLMediaElement){Object.defineProperty(this,'paused',{configurable:true,value:true});this.dispatchEvent(new Event('pause'));});
});

describe('Portfolio previews',()=>{
  it('has a designed fallback without an empty video or dead preview link',()=>{
    const {container}=render(<ProjectPreview project={project}/>);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getByText(/Prévia estática/)).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByRole('heading',{name:project.title})).toBeTruthy();
  });
  it('opens an optional preview safely and rejects non-http schemes',()=>{
    const {rerender}=render(<ProjectPreview project={{...project,previewUrl:'https://example.com/preview'}}/>);
    const link=screen.getByRole('link',{name:/(Abrir prévia|Ver site no ar)/});
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    rerender(<ProjectPreview project={{...project,previewUrl:'javascript:alert(1)'}}/>);
    expect(screen.queryByRole('link')).toBeNull();
  });
  it('uses a supplied poster and recovers from a broken image',()=>{
    render(<ProjectPreview project={{...project,posterSrc:'/portfolio/test.webp'}}/>);
    fireEvent.error(screen.getByRole('img',{name:'Prévia de '+project.title}));
    expect(screen.queryByRole('img',{name:'Prévia de '+project.title})).toBeNull();
    expect(screen.getByText(/Prévia estática/)).toBeTruthy();
  });
  it('loads near the viewport, plays muted inline, and pauses offscreen',()=>{
    const {container}=render(<ProjectPreview project={{...project,videoSrc:'/portfolio/test.mp4'}}/>);
    const video=container.querySelector('video')!;
    expect(video.getAttribute('src')).toBeNull();
    expect(video.muted).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(observers[0].options?.rootMargin).toBe('300px');
    intersect(0);
    expect(video.getAttribute('src')).toBe('/portfolio/test.mp4');
    intersect(1);
    expect(video.play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button',{name:/Pausar prévia/})).toBeTruthy();
    intersect(1,false);
    expect(video.pause).toHaveBeenCalled();
    expect(screen.getByRole('button',{name:/Reproduzir prévia/})).toBeTruthy();
  });
  it('does not restart a video manually paused by the visitor',async()=>{
    const user=userEvent.setup();
    const {container}=render(<ProjectPreview project={{...project,videoSrc:'/portfolio/test.mp4'}}/>);
    intersect(0);intersect(1);
    await user.click(screen.getByRole('button',{name:/Pausar prévia/}));
    intersect(1,false);intersect(1,true);
    expect(container.querySelector('video')!.play).toHaveBeenCalledTimes(1);
  });
  it('respects reduced motion but permits explicit playback',async()=>{
    vi.mocked(window.matchMedia).mockImplementation(query=>({matches:true,media:query,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList));
    const user=userEvent.setup();
    const {container}=render(<ProjectPreview project={{...project,videoSrc:'/portfolio/test.mp4'}}/>);
    intersect(0);intersect(1);
    expect(container.querySelector('video')!.play).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button',{name:/Reproduzir prévia/}));
    expect(container.querySelector('video')!.play).toHaveBeenCalledTimes(1);
  });
  it('handles media errors with a useful fallback and keeps the preview link',()=>{
    const {container}=render(<ProjectPreview project={{...project,videoSrc:'/portfolio/test.mp4',previewUrl:'https://example.com'}}/>);
    fireEvent.error(container.querySelector('video')!);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getByRole('status').textContent).toContain('O vídeo não carregou');
    expect(screen.getByRole('link',{name:/(Abrir prévia|Ver site no ar)/})).toBeTruthy();
  });
  it('has no axe structural violations in the portfolio',async()=>{
    const {container}=render(<main><h1>Sites</h1><SitePortfolio/></main>);
    const result=await axe.run(container,{rules:{'color-contrast':{enabled:false}}});
    expect(result.violations.map(v=>v.id)).toEqual([]);
  });
  it('shows one daily feature plus three projects and puts expansion after them',async()=>{
    const user=userEvent.setup();
    const {container}=render(<SitePortfolio/>);
    const titles=Array.from(container.querySelectorAll('.portfolio-project h3')).map(title=>title.textContent);
    expect(titles[0]).toBe(getDailyFeaturedProject(siteProjects, getPortfolioDayKey())?.title);
    expect(container.querySelectorAll('.portfolio-project')).toHaveLength(4);
    expect(container.querySelectorAll('.portfolio-project.portfolio-featured')).toHaveLength(1);
    expect(container.querySelector('.portfolio-featured-ribbon')?.textContent).toContain('Destaque de hoje');
    const toggle=screen.getByRole('button',{name:/(Ver mais|Ver outros) \d+ projetos/});
    expect(container.querySelector('#portfolio-projects')!.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await user.click(toggle);
    expect(container.querySelectorAll('.portfolio-project')).toHaveLength(siteProjects.length);
  });

  it('keeps the daily project stable for the São Paulo date and rotates tomorrow',()=>{
    const today=getDailyFeaturedProject(siteProjects,'2026-09-27');
    expect(getDailyFeaturedProject(siteProjects,'2026-09-27')?.id).toBe(today?.id);
    expect(getDailyFeaturedProject(siteProjects,'2026-09-28')?.id).not.toBe(today?.id);
    expect(getPortfolioDayKey(new Date('2026-09-27T02:59:59.000Z'))).toBe('2026-09-26');
    expect(getPortfolioDayKey(new Date('2026-09-27T03:00:00.000Z'))).toBe('2026-09-27');
  });
});
