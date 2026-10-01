import React from 'react';
import { ArrowUpRight, Check, MessageCircle, MousePointer2, Plus } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { JourneySitePreview } from '@/components/ui/JourneySitePreview';
import { useScrollSteps } from '@/hooks/useScrollSteps';

const stages = [
  { title: 'Primeiro, a sua ideia.', name: 'Conversa', copy: 'O que você oferece? Quem precisa entender isso? Começamos pelo objetivo da página, não por um template.' },
  { title: 'A direção antes do design.', name: 'Direção', copy: 'Definimos mensagem, conteúdo e estrutura. Você aprova a direção antes de começar a construção.' },
  { title: 'Agora tem a sua cara.', name: 'Construção', copy: 'Com a direção aprovada, montamos a página e testamos em celular e computador. Você revisa antes de publicar.' },
  { title: 'Do “e se?” ao endereço no ar.', name: 'Publicação', copy: 'Publicamos depois da sua aprovação. Em seguida, acompanhamos acessos e navegação para orientar melhorias.' },
];

export const SiteJourney: React.FC = () => {
  const {root,active,choose,scrollEnabled} = useScrollSteps(4,'journey-scroll','--journey-progress');
  return <section id="como-criamos" ref={root} className={'site-journey journey-state-'+active+(scrollEnabled?' journey-scroll':'')} aria-labelledby="journey-heading">
    <div className="journey-sticky"><Container>
      <div className="journey-heading"><h2 id="journey-heading">Da sua ideia<br/><span>para o mundo.</span></h2><p>Você não precisa imaginar tudo pronto.<br/>A gente dá forma junto com você.</p></div>
      <div className="journey-composition">
        <div className="journey-story"><div className="journey-step-count" aria-hidden="true">0{active+1}<span>/ 04</span></div><div className="journey-copy" key={active}><h3>{stages[active].title}</h3><p>{stages[active].copy}</p></div></div>
        <div className="journey-canvas" aria-hidden="true">
          <div className="journey-grid"/>
          <div className="journey-note note-a"><MessageCircle size={23}/><strong>“Quero mostrar<br/>o que eu faço.”</strong></div>
          <div className="journey-note note-b"><Plus size={23}/><strong>Uma ideia boa.<br/>Por onde começar?</strong></div>
          <div className="journey-note note-c"><span>Seu público.</span><span>Seu diferencial.</span><span>Seu próximo passo.</span></div>
          <div className="journey-browser">
            <div className="journey-browser-top"><i/><i/><i/><span>{active===3?'seunegocio.com.br':'Sua ideia em construção'}</span><span className="journey-address-check"><Check size={12}/></span></div>
            <div className="journey-webpage"><div className="journey-wireframe"><div/><div/><div/><div/><div/></div>
              <div className="journey-design"><JourneySitePreview/></div>
            </div>
          </div>
          <div className="journey-palette"><i/><i/><i/><span>A sua identidade.</span></div>
          <div className="journey-pointer"><MousePointer2 size={24} fill="currentColor"/><span>Tech Hub</span></div>
          <div className="journey-published"><span><Check size={17}/></span><div>Da ideia ao site.<small>Pronto para receber visitas.</small></div></div>
        </div>
      </div>
      <nav className="journey-navigation" aria-label="Etapas de criação do site">{stages.map((stage,index)=><button key={stage.name} type="button" aria-pressed={active===index} onClick={()=>choose(index)}><span>0{index+1}</span>{stage.name}<ArrowUpRight size={17}/></button>)}</nav>
    </Container></div>
  </section>;
};
