import { useLayoutEffect, useRef, useState } from 'react';

export const stepAtProgress = (progress:number,count:number) =>
  Math.min(count-1,Math.max(0,Math.floor(progress*count)));

/** Measure the live document, after React has committed the sticky layout. */
export function useScrollSteps(count: number, scrollClass: string, progressProperty = '--step-progress') {
  const root = useRef<HTMLElement>(null);
  const [active,setActive] = useState(0);
  const [scrollEnabled,setScrollEnabled] = useState(false);
  useLayoutEffect(()=>{
    const media=window.matchMedia('(min-height: 620px) and (prefers-reduced-motion: no-preference)');
    const update=()=>setScrollEnabled(media.matches);
    update();
    media.addEventListener('change',update);
    return()=>media.removeEventListener('change',update);
  },[]);
  useLayoutEffect(()=>{
    const section=root.current;
    if(!section || !scrollEnabled) return;
    // One viewport of reading distance per step; independent of content height.
    section.style.setProperty('--scroll-distance',((count+1)*100)+'svh');
    let frame=0;
    const update=()=>{
      frame=0;
      const rect=section.getBoundingClientRect();
      const distance=rect.height-window.innerHeight;
      // Never collapse an unmeasured range to the last step.
      if(distance<=1) return;
      const progress=Math.min(1,Math.max(0,-rect.top/distance));
      section.style.setProperty(progressProperty,String(progress));
      setActive(stepAtProgress(progress,count));
    };
    const queue=()=>{if(!frame)frame=window.requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll',queue,{passive:true});
    window.addEventListener('resize',queue);
    const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(queue);
    observer?.observe(section);
    return()=>{
      window.removeEventListener('scroll',queue);
      window.removeEventListener('resize',queue);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      section.style.removeProperty(progressProperty);
      section.style.removeProperty('--scroll-distance');
    };
  },[scrollEnabled,count,scrollClass,progressProperty]);
  const choose=(index:number)=>{
    const section=root.current;
    if(scrollEnabled && section){
      const rect=section.getBoundingClientRect();
      const distance=rect.height-window.innerHeight;
      if(distance>1){
        window.scrollTo({top:window.scrollY+rect.top+distance*((index+.4)/count),behavior:'smooth'});
        return;
      }
    }
    setActive(index);
  };
  return {root,active,choose,scrollEnabled};
}
