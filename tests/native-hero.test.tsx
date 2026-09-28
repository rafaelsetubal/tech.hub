import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { NativeHeroScene } from '../src/components/ui/NativeHeroScene';
import { SitesHero } from '../src/components/sections/SitesHero';
const mocks=vi.hoisted(()=>({mount:vi.fn(),dispose:vi.fn(),device:vi.fn(),budget:vi.fn()}));
vi.mock('../src/components/ui/heroSceneRenderer',()=>({mountHeroScene:mocks.mount}));
vi.mock('../src/lib/heroCapability',async importOriginal=>({
  ...await importOriginal<typeof import('../src/lib/heroCapability')>(),
  currentHeroDevice:mocks.device,hasHeroRenderBudget:mocks.budget,
}));

beforeEach(()=>{
  Object.values(mocks).forEach(mock=>mock.mockReset());
  mocks.device.mockReturnValue({cores:8,memory:8,touch:false,reducedMotion:false});
  mocks.budget.mockResolvedValue(true);
  vi.spyOn(document,'readyState','get').mockReturnValue('complete');
  vi.spyOn(document,'hidden','get').mockReturnValue(false);
  vi.stubGlobal('requestIdleCallback',(callback:()=>void)=>{queueMicrotask(callback);return 1;});
  vi.stubGlobal('cancelIdleCallback',vi.fn());
  vi.stubGlobal('IntersectionObserver',class {
    constructor(private callback:IntersectionObserverCallback){}
    observe(){this.callback([{isIntersecting:true} as IntersectionObserverEntry],this as unknown as IntersectionObserver);}
    disconnect(){} unobserve(){}
  });
});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

describe('Native hero',()=>{
  it('loads locally without a Spline embed or zoom control, and cleans up',async()=>{
    mocks.mount.mockImplementation(async(_host,_signal,onReady)=>{onReady();return mocks.dispose;});
    const {container,unmount}=render(<NativeHeroScene/>);
    expect(mocks.mount).not.toHaveBeenCalled();
    fireEvent.pointerMove(container.querySelector('.sites-spline-host')!,{pointerType:'mouse'});
    await waitFor(()=>expect(container.querySelector('.is-ready')).not.toBeNull());
    expect(container.querySelector('spline-viewer')).toBeNull();
    expect(container.querySelector('.sites-glass-grid')).toBeNull();
    expect(document.querySelector('script[src*="spline"]')).toBeNull();
    expect(screen.queryByRole('slider')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    unmount();expect(mocks.dispose).toHaveBeenCalled();
  });
  it('keeps the logo fallback when WebGL fails',async()=>{
    mocks.mount.mockRejectedValueOnce(new Error('WebGL unavailable'));
    const {container}=render(<NativeHeroScene/>);
    fireEvent.pointerMove(container.querySelector('.sites-spline-host')!,{pointerType:'mouse'});
    await waitFor(()=>expect(mocks.mount).toHaveBeenCalled());
    expect(container.querySelector('.sites-spline-fallback svg')).not.toBeNull();
    expect(container.querySelector('.is-ready')).toBeNull();
  });
  it('uses the static logo for reduced motion',()=>{
    mocks.mount.mockClear();
    vi.spyOn(window,'matchMedia').mockImplementation(query=>({matches:query.includes('reduce'),media:query,onchange:null,addListener:vi.fn(),removeListener:vi.fn(),addEventListener:vi.fn(),removeEventListener:vi.fn(),dispatchEvent:vi.fn()}));
    render(<NativeHeroScene/>);expect(mocks.mount).not.toHaveBeenCalled();
  });
  it('does not load the renderer on a constrained device',()=>{
    mocks.device.mockReturnValue({cores:4,memory:2,touch:true,reducedMotion:false});
    const {container}=render(<NativeHeroScene/>);
    expect(container.querySelector('.sites-spline-fallback svg')).not.toBeNull();
    expect(mocks.budget).not.toHaveBeenCalled();
    expect(mocks.mount).not.toHaveBeenCalled();
  });
  it('keeps the static logo when real frame delivery is too slow',async()=>{
    mocks.budget.mockResolvedValue(false);
    const {container}=render(<NativeHeroScene/>);
    fireEvent.pointerMove(container.querySelector('.sites-spline-host')!,{pointerType:'mouse'});
    await waitFor(()=>expect(mocks.budget).toHaveBeenCalled());
    expect(mocks.mount).not.toHaveBeenCalled();
    expect(container.querySelector('.is-ready')).toBeNull();
  });
  it('does not start WebGL after unmounting during capability assessment',async()=>{
    let finish!:(value:boolean)=>void;
    mocks.budget.mockReturnValue(new Promise<boolean>(resolve=>{finish=resolve;}));
    const {container,unmount}=render(<NativeHeroScene/>);
    fireEvent.pointerMove(container.querySelector('.sites-spline-host')!,{pointerType:'mouse'});
    await waitFor(()=>expect(mocks.budget).toHaveBeenCalled());
    unmount();finish(true);
    await Promise.resolve();
    expect(mocks.mount).not.toHaveBeenCalled();
  });
  it('preserves both hero calls to action',()=>{
    render(<SitesHero/>);
    expect(screen.getByRole('link',{name:/Conversar agora/}).getAttribute('href')).toBe('#seu-projeto');
    expect(screen.getByRole('link',{name:'Ver portfólio'}).getAttribute('href')).toBe('#portfolio');
  });
});
