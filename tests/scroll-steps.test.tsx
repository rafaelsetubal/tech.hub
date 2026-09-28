import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useScrollSteps, stepAtProgress } from '../src/hooks/useScrollSteps';

function Scene(){const {root,active,choose,scrollEnabled}=useScrollSteps(4,'test-scroll');return <section ref={root} className={scrollEnabled?'test-scroll':''}><output>{active+1}</output><button onClick={()=>choose(1)}>Etapa dois</button></section>;}
describe('Scroll steps regression',()=>{
  it('keeps all four equal reading intervals, including their boundaries',()=>{
    expect([0,.1,.249,.25,.4,.499,.5,.7,.749,.75,.9,1].map(p=>stepAtProgress(p,4))).toEqual([0,0,0,1,1,1,2,2,2,3,3,3]);
  });
  it.each([['mobile',390,844],['desktop',1440,900]])('advances and reverses through 1, 2, 3, 4 on %s',(_name,width,height)=>{
    Object.defineProperty(window,'innerWidth',{configurable:true,value:width});
    Object.defineProperty(window,'innerHeight',{configurable:true,value:height});
    vi.mocked(window.matchMedia).mockImplementation(query=>({matches:true,media:query,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList));
    let top=0;
    vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockImplementation(()=>({top,height:height*5,bottom:top+height*5,left:0,right:width,width,x:0,y:top,toJSON:()=>({})}));
    let callback:FrameRequestCallback=()=>{};
    vi.spyOn(window,'requestAnimationFrame').mockImplementation(fn=>{callback=fn;return 1;});
    const {container}=render(<Scene/>);
    for(const [progress,expected] of [[0,1],[.3,2],[.6,3],[.9,4],[.6,3],[.3,2],[0,1]]){
      top=-progress*(height*4);
      act(()=>{window.dispatchEvent(new Event('scroll'));callback(0);});
      expect(screen.getByRole('status').textContent).toBe(String(expected));
      expect(container.querySelector('section')?.className).toBe('test-scroll');
    }
    expect(container.querySelector('section')?.style.getPropertyValue('--scroll-distance')).toBe('500svh');
  });
  it('does not jump to the end when a section has not been measured',()=>{
    vi.mocked(window.matchMedia).mockImplementation(query=>({matches:true,media:query,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList));
    render(<Scene/>);
    expect(screen.getByRole('status').textContent).toBe('1');
  });
  it('keeps buttons usable when reduced motion disables scroll scenes',()=>{
    render(<Scene/>);fireEvent.click(screen.getByRole('button',{name:'Etapa dois'}));
    expect(screen.getByRole('status').textContent).toBe('2');
  });
});
