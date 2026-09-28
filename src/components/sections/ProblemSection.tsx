import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';

const problems = [
  ['A rotina depende de alguém lembrar.', 'Tarefas manuais', 'manual'],
  ['O projeto anda, mas ninguém vê o próximo passo.', 'Projetos sem direção', 'direction'],
  ['A mesma informação vive em lugares diferentes.', 'Ferramentas isoladas', 'islands'],
  ['A equipe refaz o que já deveria estar resolvido.', 'Retrabalho', 'repeat'],
];
export const ProblemSection: React.FC = () => (
  <section id="problema" className="editorial-section friction-section"><Container>
    <div className="friction-heading"><MotionReveal><h2 className="editorial-title">Onde o trabalho<br /><span>perde o ritmo.</span></h2></MotionReveal><p>Nem sempre falta uma ferramenta.<br />Às vezes, falta clareza sobre como o trabalho passa de uma etapa à outra.</p></div>
    <div className="friction-grid">{problems.map(([title, label, type], i) => <MotionReveal key={type} delay={i * .07}><article className={'friction-card friction-' + type}>
      <div className="friction-art" aria-hidden="true"><svg viewBox="0 0 260 180" fill="none">
        {type === 'manual' && <><path d="M45 110H215" stroke="#99b5ed" strokeDasharray="4 6" />{[0,1,2].map(n => <g key={n} transform={'translate(' + (45+n*57) + ' ' + (42+n*13) + ') rotate(' + (-12+n*10) + ' 30 42)'}><rect width="63" height="82" rx="9" fill="#fff" stroke="#9ab4ef" /><path d="M14 24H47M14 35H40M14 46H33" stroke="#9ab4ef" strokeWidth="3" /><circle cx="44" cy="65" r="7" fill="#557cff" /></g>)}</>}
        {type === 'direction' && <><path d="M45 140L96 90L137 112L198 40M96 90V35M137 112L210 139" stroke="#a9b8de" strokeWidth="2" strokeDasharray="5 7" />{[[45,140],[96,90],[137,112],[198,40]].map(([x,y],n)=><rect key={n} x={x-15} y={y-15} width="30" height="30" rx="8" fill={n===1?'#4969fb':'#dce5ff'} stroke="#8ba8f4" transform={'rotate(15 '+x+' '+y+')'} />)}</>}
        {type === 'islands' && <>{[[65,65],[193,55],[137,132]].map(([x,y],n)=><g key={n}><circle cx={x} cy={y} r="34" fill="#dfe8ff" /><rect x={x-17} y={y-17} width="34" height="34" rx="10" fill={n===1?'#7291ff':'#4465ed'} /><path d={'M'+(x-8)+' '+y+'h16m-8 -8v16'} stroke="white" strokeWidth="2" /></g>)}<path d="M103 62H147M86 94L108 114M159 109L174 89" stroke="#9db0da" strokeDasharray="3 6" /></>}
        {type === 'repeat' && <><path d="M80 55A57 57 0 1 1 75 122" stroke="#a4b9f6" strokeWidth="15" /><path d="M63 101L76 129L99 109" stroke="#496cff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /><rect x="108" y="61" width="44" height="57" rx="9" fill="white" stroke="#9ab4ef" /><path d="M119 79H141M119 90H137M119 101H133" stroke="#7d9bf0" strokeWidth="3" /></>}
      </svg></div><h3>{label}</h3><p>{title}</p>
    </article></MotionReveal>)}</div>
  </Container></section>
);
