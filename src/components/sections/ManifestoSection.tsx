import React, { useEffect, useId, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { BRAND_BODY, BRAND_DOT } from '@/components/ui/BrandSymbol';

const parts = [
  { name: 'Processos', x: 181, y: 52, fromX: 330, fromY: 5 },
  { name: 'Dados', x: 51, y: 170, fromX: -13, fromY: 46 },
  { name: 'Pessoas', x: 181, y: 288, fromX: 34, fromY: 348 },
  { name: 'Ferramentas', x: 282, y: 170, fromX: 350, fromY: 290 },
];
export const ManifestoSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const id = 'assembly-' + useId().replace(/:/g, '');
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    const initialize = async () => {
      const { gsap } = await import('@/lib/gsap');
      if (disposed || !ref.current) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference) and (min-height: 560px)', () => {
      const ctx = gsap.context(() => {
        const root = ref.current!;
        const phases = root.querySelectorAll('.assembly-phase');
        const balls = root.querySelectorAll('.assembly-ball');
        const labels = root.querySelectorAll('.assembly-label');
        root.classList.add('assembly-animated');
        gsap.set(phases, {autoAlpha:0,y:20});
        gsap.set(phases[0], {autoAlpha:1,y:0});
        gsap.set('.assembly-mark', {opacity:0});
        gsap.set('.assembly-signature', {opacity:0,y:10});
        gsap.set('.assembly-guide', {opacity:.6});
        gsap.set('.assembly-pieces', {opacity:1});
        parts.forEach((part,i) => {
          gsap.set(balls[i], {attr:{cx:part.fromX,cy:part.fromY,r:43}});
          gsap.set(labels[i], {attr:{x:part.fromX,y:part.fromY+69},opacity:1});
        });
        const tl = gsap.timeline({scrollTrigger:{trigger:root,start:'top top',end:'bottom bottom',scrub:.8,invalidateOnRefresh:true}});
        tl.to({}, {duration:.7})
          .to(phases[0], {autoAlpha:0,y:-20,duration:.25}, .7)
          .to(phases[1], {autoAlpha:1,y:0,duration:.35}, 1)
          .to(labels, {opacity:0,duration:.5,stagger:.05}, 1.2)
          .to('.assembly-guide', {opacity:0,duration:.8}, 1.2);
        balls.forEach((ball,i) => tl.to(ball,{attr:{cx:parts[i].x,cy:parts[i].y,r:51},duration:1.8,ease:'power2.inOut'},1.1+i*.1));
        // Reveal the real silhouette outwards from its lobes as the spheres meet.
        tl.to('.assembly-mark', {opacity:1,duration:.45}, 2.7)
          .fromTo('.assembly-reveal', {attr:{r:47}}, {attr:{r:135},duration:1.15,ease:'power2.inOut'}, 2.75)
          .to('.assembly-pieces', {opacity:0,duration:.7}, 2.95)
          .to(phases[1], {autoAlpha:0,y:-20,duration:.25}, 3.5)
          .to(phases[2], {autoAlpha:1,y:0,duration:.4}, 3.8)
          .to('.assembly-signature', {opacity:1,y:0,duration:.6}, 3.85)
          .to({}, {duration:1}, 4.4);
      },ref);
      return () => {ctx.revert();ref.current?.classList.remove('assembly-animated');};
      });
      revert = () => media.revert();
    };
    const observer = typeof IntersectionObserver === 'undefined' ? undefined : new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer?.disconnect();
        void initialize();
      }
    }, { rootMargin: '0px 0px 180px 0px' });
    if (observer) observer.observe(root);
    else void initialize();
    return () => { disposed = true; observer?.disconnect(); revert?.(); };
  }, []);
  return <section id="manifesto" className="brand-assembly" ref={ref}>
    <div className="assembly-stage"><Container><div className="assembly-layout">
      <div className="assembly-copy">
        <div className="assembly-phase"><h2>Boas peças.<br /><span>Ainda soltas.</span></h2><p>Pessoas, dados, processos e ferramentas. O potencial existe. Falta fazer tudo trabalhar junto.</p></div>
        <div className="assembly-phase"><h2>É aqui que<br /><span>a Tech Hub entra.</span></h2><p>Mapeamos como a operação acontece e onde ela trava — antes de propor qualquer ferramenta.</p></div>
        <div className="assembly-phase"><h2>Quando tudo se conecta,<br /><span>faz sentido.</span></h2><p>Pessoas, processos e ferramentas na mesma direção. Tecnologia a serviço do trabalho real.</p></div>
      </div>
      <div className="assembly-art">
        <svg viewBox="-95 -90 535 560" role="img" aria-label="Quatro esferas representam pessoas, dados, processos e ferramentas. Ao rolar, elas se aproximam e revelam o símbolo original da Tech Hub.">
          <defs>
            <linearGradient id={id+'-brand'} x1="0" y1="341" x2="317" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#0059ff"/><stop offset=".42" stopColor="#4169ff"/><stop offset=".72" stopColor="#8b7cff"/><stop offset="1" stopColor="#d8d3ff"/></linearGradient>
            <radialGradient id={id+'-ball'} cx="28%" cy="20%" r="85%"><stop stopColor="#daefff"/><stop offset=".28" stopColor="#9facff"/><stop offset=".64" stopColor="#526cff"/><stop offset="1" stopColor="#2042b4"/></radialGradient>
            <clipPath id={id+'-reveal'}>{parts.map(p=><circle key={p.name} className="assembly-reveal" cx={p.x} cy={p.y} r="135"/>)}</clipPath>
          </defs>
          <g className="assembly-guide" fill="none" stroke="#8ba2e2" strokeWidth=".7" strokeDasharray="3 9"><path d="M-13 46Q200 -10 140 170T330 5M34 348Q140 330 100 170T350 290"/><circle cx="168" cy="171" r="220"/></g>
          <g className="assembly-mark" fill={'url(#'+id+'-brand)'} clipPath={'url(#'+id+'-reveal)'}><path d={BRAND_BODY}/><path d={BRAND_DOT}/></g>
          <g className="assembly-pieces">{parts.map(p=><circle key={p.name} className="assembly-ball" cx={p.x} cy={p.y} r="51" fill={'url(#'+id+'-ball)'}/>)}</g>
          {parts.map(p=><text className="assembly-label" key={p.name} x={p.x} y={p.y+69} textAnchor="middle" fill="#b3c2e9" fontSize="15">{p.name}</text>)}
        </svg>
        <div className="assembly-signature">TECH HUB<span>Tecnologia que faz sentido.</span></div>
      </div>
    </div></Container></div>
  </section>;
};
