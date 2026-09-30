import React, { useEffect, useState } from 'react';
import '@/styles/sites-studio.css';
import '@/styles/portfolio.css';
import '@/styles/site-journey.css';
import '@/styles/site-value-footer.css';
import '@/styles/sites-hero.css';
import '@/styles/narrative-responsive.css';
import { ArrowUpRight, Check, Plus, Smartphone, Layout, MousePointer2 } from 'lucide-react';
import { BrandSymbol } from '@/components/ui/BrandSymbol';
import { Container } from '@/components/layout/Container';
import { SitesHero } from '@/components/sections/SitesHero';
import { ProjectBrief } from '@/components/ui/ProjectBrief';
import { WebsiteConcept } from '@/components/ui/WebsiteConcept';
import { Navbar } from '@/components/layout/Navbar';
import { SitePortfolio } from '@/components/sections/SitePortfolio';
import { SiteJourney } from '@/components/sections/SiteJourney';
import { SiteInsights } from '@/components/sections/SiteInsights';
import { SiteValue } from '@/components/sections/SiteValue';
import { Footer } from '@/components/layout/Footer';

const formats = [
  {title:'Um endereço que explica seu negócio.',tab:'Apresentar minha empresa',name:'Site institucional',copy:'Apresente em um só lugar o que sua empresa faz, para quem trabalha e como contratar. Uma referência clara para quem chega por indicação, busca ou redes sociais.',items:['Empresa e diferenciais em destaque','Serviços e projetos organizados','Contato fácil de encontrar']},
  {title:'Uma oferta. Uma decisão clara.',tab:'Vender um produto ou serviço',name:'Página de venda',copy:'Apresente uma oferta sem dispersar a atenção: explique benefícios, responda às dúvidas mais comuns e conduza a pessoa ao pedido, orçamento ou compra.',items:['Oferta e benefícios em destaque','Respostas às dúvidas de decisão','Ação final alinhada ao seu processo']},
  {title:'Uma campanha. Um objetivo.',tab:'Receber novos contatos',name:'Página de captura',copy:'Convide a pessoa a fazer uma coisa: pedir contato, baixar um material ou entrar em uma lista. Uma mensagem direta, sem caminhos concorrentes.',items:['Um motivo claro para responder','Formulário simples e objetivo','Destino dos contatos direto para seu WhatsApp ou e-mail']},
];
const faqs = [
  ['Preciso saber de tecnologia?','Não. Você conhece seu negócio; nós explicamos as decisões e conduzimos toda a parte técnica com você.'],
  ['E se eu ainda não tiver textos e imagens?','Levantamos o que já existe e orientamos ou criamos o conteúdo necessário junto com você.'],
  ['Quanto custa e quanto tempo leva?','Depende do conteúdo, da quantidade de páginas e das funcionalidades. A proposta apresenta escopo, prazo e investimento antes de qualquer compromisso.'],
  ['Domínio, hospedagem e manutenção estão incluídos?','Explicamos todas as opções de domínio e hospedagem com custos 100% transparentes, sem taxas ocultas.'],
  ['Vocês garantem vendas?','Não. Uma boa página ajuda a comunicar seu valor e facilitar o contato. Os resultados também dependem do público, da oferta e do atendimento.'],
];
export const Sites: React.FC = () => {
  const [active,setActive]=useState(0);
  const [requestedGoal,setRequestedGoal]=useState('Apresentar minha empresa na internet');
  const current=formats[active];
  useEffect(()=>{
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const previous = { title:document.title, description:description?.content, ogTitle:ogTitle?.content, ogDescription:ogDescription?.content, twitterTitle:twitterTitle?.content, twitterDescription:twitterDescription?.content };
    const title='Criação de sites e páginas de venda | Tech Hub';
    const summary='Sites institucionais, páginas de venda e de captura para apresentar seu negócio com clareza e facilitar o contato. Conheça os projetos da Tech Hub.';
    document.title=title;
    if (description) description.content=summary;
    if (ogTitle) ogTitle.content=title;
    if (ogDescription) ogDescription.content=summary;
    if (twitterTitle) twitterTitle.content=title;
    if (twitterDescription) twitterDescription.content=summary;
    return()=>{
      document.title=previous.title;
      if (description && previous.description !== undefined) description.content=previous.description;
      if (ogTitle && previous.ogTitle !== undefined) ogTitle.content=previous.ogTitle;
      if (ogDescription && previous.ogDescription !== undefined) ogDescription.content=previous.ogDescription;
      if (twitterTitle && previous.twitterTitle !== undefined) twitterTitle.content=previous.twitterTitle;
      if (twitterDescription && previous.twitterDescription !== undefined) twitterDescription.content=previous.twitterDescription;
    };
  },[]);
  return <div className="web-studio">
    <Navbar page="sites"/>
    <main id="main-content" tabIndex={-1}>
      <SitesHero/>
      <SitePortfolio/>
      <SiteValue/>
      <section id="formatos" className="studio-formats"><Container>
        <div className="studio-section-heading"><h2>O que você quer<br/><span>fazer acontecer?</span></h2><p>Escolha pelo que precisa resolver.<br/>A gente cuida do formato.</p></div>
        <div role="tablist" aria-label="Objetivo da página" className="studio-tabs">{formats.map((f,i)=><button key={f.tab} id={'format-tab-'+i} role="tab" aria-selected={i===active} aria-controls="format-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(active+(e.key==='ArrowRight'?1:2))%3;setActive(next);document.getElementById('format-tab-'+next)?.focus();}}>{f.tab}<ArrowUpRight size={18}/></button>)}</div>
        <div className={'studio-format-panel studio-format-'+active} id="format-panel" role="tabpanel" aria-labelledby={'format-tab-'+active}>
          <div className="studio-format-art" key={active}><WebsiteConcept variant={active}/><span>Exemplo conceitual. Não é um projeto de cliente.</span></div>
          <div className="studio-format-copy"><span>{current.name}</span><h3>{current.title}</h3><p>{current.copy}</p><ul>{current.items.map(item=><li key={item}><Check size={16}/>{item}</li>)}</ul><a className="studio-button" href="#seu-projeto" onClick={()=>setRequestedGoal(['Apresentar minha empresa na internet','Vender um produto ou serviço','Receber contatos de interessados'][active])}>Quero uma página assim <ArrowUpRight size={18}/></a></div>
        </div>
      </Container></section>
      <section className="studio-craft"><Container><div className="studio-section-heading"><h2>Da mensagem ao clique.<br/><span>O que sua página precisa fazer.</span></h2></div><div className="studio-craft-grid">
        <article className="craft-mobile"><div className="craft-device" aria-hidden="true"><div/><b>Seu negócio,<br/>na palma<br/>da mão.</b><span>Vamos conversar ↗</span></div><Smartphone size={23}/><h3>Funcionar em qualquer tela.</h3><p>Texto legível, navegação simples e botões fáceis de usar. Testamos no celular e no computador antes de publicar.</p></article>
        <article className="craft-message"><div className="craft-type" aria-hidden="true">Aa<span>O que você faz.<br/>Por que escolher você.</span></div><Layout size={23}/><h3>Deixar seu valor claro.</h3><p>Organizamos com você serviços, diferenciais, trabalhos e respostas às dúvidas que costumam travar a decisão.</p></article>
        <article className="craft-action"><div className="craft-click" aria-hidden="true"><span>Pedir um orçamento <ArrowUpRight size={25}/></span><MousePointer2 size={42}/><i/><i/></div><MousePointer2 size={23}/><h3>Levar à ação certa.</h3><p>WhatsApp direto, formulário ou link de compra: definimos o caminho mais eficiente para o seu cliente entrar em contato e ser atendido rápido.</p></article>
      </div></Container></section>
      <SiteJourney/>
      <SiteInsights/>
      <section className="studio-faq"><Container><div className="studio-section-heading"><h2>Sem dúvidas<br/><span>pelo caminho.</span></h2><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<Plus size={19}/></summary><p>{a}</p></details>)}</div></div></Container></section>
      <section id="seu-projeto" className="studio-contact"><Container><div className="studio-contact-copy"><BrandSymbol/><h2>Vamos colocar<br/>sua ideia<br/><span>no mundo?</span></h2><p>Você não precisa chegar com textos, referências e decisões prontas. Conte seu objetivo e começamos pelo que o seu negócio precisa.</p><div className="studio-agreement"><strong>Clareza antes de começar.</strong><p>Escopo, prazo, investimento e etapas de aprovação combinados de forma transparente antes de qualquer início.</p></div></div><ProjectBrief digital requestedGoal={requestedGoal}/></Container></section>
    </main><Footer page="sites"/>
  </div>;
};
