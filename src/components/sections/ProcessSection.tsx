import React from 'react';
import { useScrollSteps } from '@/hooks/useScrollSteps';
import { Container } from '@/components/layout/Container';
import { Check, ArrowRight, MessageCircle, MousePointer2, X, CircleHelp, Unplug } from 'lucide-react';
const steps = [
  { title: 'Entender', copy: 'Pedidos perdidos, dúvidas e tarefas que voltam. Ouvimos a equipe para descobrir onde o trabalho trava — antes de propor uma solução.', result: 'Primeiro, entender o que trava.' },
  { title: 'Desenhar', copy: 'Definimos o que vem primeiro, quem cuida de cada etapa e como reconhecer o avanço.', result: 'Cada coisa encontra seu lugar.' },
  { title: 'Construir', copy: 'Colocamos o fluxo em prática e conectamos as ferramentas combinadas. A equipe testa antes da mudança virar rotina.', result: 'As partes começam a conversar.' },
  { title: 'Evoluir', copy: 'Acompanhamos a adoção e revisamos o processo com a equipe. Frequência e suporte ficam definidos no projeto.', result: 'A mudança entra na rotina.' },
];
const cards = [
  [['Quem cuida disso?', 'O pedido ficou sem dono.'], ['Por onde começar?', 'Tudo parece urgente.'], ['Qual é o dado certo?', 'Cada lugar diz uma coisa.'], ['De novo esse trabalho?', 'A equipe refaz o que já fez.']],
  [['Cada tarefa tem um dono.', 'Responsabilidades definidas.'], ['Uma prioridade por vez.', 'O próximo passo está claro.'], ['Uma fonte de referência.', 'Informação organizada.'], ['Um fluxo para seguir.', 'Menos idas e vindas.']],
  [['O pedido chega a quem faz.', 'Pessoas e etapas conectadas.'], ['Uma etapa puxa a próxima.', 'O trabalho começa a fluir.'], ['O dado chega onde precisa.', 'Ferramentas trocando informação.'], ['Fazer uma vez. Fazer bem.', 'A equipe testa o novo fluxo.']],
  [['Cada um sabe como seguir.', 'Equipe orientada.'], ['O próximo passo aparece.', 'Rotina acompanhada.'], ['Informação que dá confiança.', 'Ajustes a partir do uso real.'], ['Mais tempo para avançar.', 'Menos esforço repetido.']],
];
export const ProcessSection: React.FC = () => {
  const {root,active,choose,scrollEnabled} = useScrollSteps(4,'process-scroll');
  const currentCards = cards[active];
  return <section id="conteudo" ref={root} className={'editorial-section process-theater'+(scrollEnabled?' process-scroll':'')}><div className="process-pin"><Container>
    <div className="process-intro"><h2 className="editorial-title">Do “por onde começo?”<br /><span>ao “agora faz sentido”.</span></h2><p>Um caminho construído com você.<br />Veja como as peças se encaixam.</p></div>
    <div className={'process-experience process-state-' + active}>
      <div className="process-controls" role="tablist" aria-label="Etapas do trabalho">{steps.map((step,i)=><button key={step.title} id={'process-tab-'+i} role="tab" aria-selected={active===i} aria-controls="process-panel" tabIndex={active===i?0:-1} onClick={()=>choose(i)} onKeyDown={event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%4;else if(event.key==='ArrowLeft')next=(i+3)%4;else if(event.key==='Home')next=0;else if(event.key==='End')next=3;else return;event.preventDefault();choose(next);document.getElementById('process-tab-'+next)?.focus();}}><span>0{i+1}</span>{step.title}<ArrowRight size={18}/></button>)}</div>
      <div id="process-panel" className="process-panel" role="tabpanel" aria-labelledby={'process-tab-'+active}>
        <div className="process-scene" aria-hidden="true">
          <div className="process-scene-grid" />
          <svg className="process-links" viewBox="0 0 600 360" preserveAspectRatio="none"><path d="M125 95H300V250H485M125 250H300V95H485" fill="none" stroke="#76ceff" strokeWidth="2" strokeDasharray="8 8" /></svg>
          <div className="process-flow-hub">{active===3?<Check size={25}/>:<ArrowRight size={23}/>}</div>
          <div className="work-tile tile-one">{active===0?<CircleHelp className="tile-warning-icon" size={25}/>:<MessageCircle size={23}/>}<strong>{currentCards[0][0]}</strong><span>{currentCards[0][1]}</span></div>
          <div className="work-tile tile-two"><div className="tile-check">{active===0?<X size={19}/>:<Check size={19}/>}</div><strong>{currentCards[1][0]}</strong><span>{currentCards[1][1]}</span></div>
          <div className="work-tile tile-three">{active===0?<Unplug className="tile-warning-icon" size={25}/>:<div className="tile-bars"><i/><i/><i/><i/></div>}<strong>{currentCards[2][0]}</strong><span>{currentCards[2][1]}</span></div>
          <div className="work-tile tile-four">{active===0?<div className="tile-check"><X size={19}/></div>:<div className="tile-people"><i>M</i><i>A</i><i>J</i></div>}<strong>{currentCards[3][0]}</strong><span>{currentCards[3][1]}</span></div>
          <div className="process-cursor"><MousePointer2 size={22} fill="currentColor"/><span>Tech Hub</span></div>
          <div className="process-success"><Check size={20}/><div>Agora faz sentido.<small>Equipe alinhada. Operação conectada.</small></div></div>
        </div>
        <div className="process-caption" key={active}><h3>{steps[active].result}</h3><p>{steps[active].copy}</p><p className="sr-only">{currentCards.map(([title,copy])=>title+' '+copy).join(' ')}</p></div>
      </div>
    </div>
  </Container></div></section>;
};
