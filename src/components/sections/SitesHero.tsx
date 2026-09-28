import { ArrowRight, ChartNoAxesColumnIncreasing, Users, MousePointer2, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { NativeHeroScene } from '@/components/ui/NativeHeroScene';

const benefits = [
  {icon:Sparkles, title:'Sua marca em destaque', text:'Uma presença com a sua identidade.'},
  {icon:Users, title:'Mais confiança', text:'Mostre seu trabalho e seus diferenciais.'},
  {icon:MousePointer2, title:'Contato sem obstáculos', text:'Um caminho direto até você.'},
  {icon:ChartNoAxesColumnIncreasing, title:'Dados para evoluir', text:'Entenda os acessos após a publicação.'},
];

export function SitesHero() {
  return <section id="sites-inicio" className="studio-hero sites-hero-3d"><Container>
    <div className="sites-hero-composition">
      <div className="sites-hero-copy">
        <h1>Seu negócio.<br/><span>Impossível</span><br/>de ignorar<span className="studio-period">.</span></h1>
        <p>Criamos sites para apresentar sua empresa e páginas para divulgar uma oferta ou receber contatos. Do conteúdo à publicação, com você acompanhando cada etapa.</p>
        <div className="sites-hero-actions"><a className="studio-button" href="#seu-projeto">Conversar agora <ArrowRight size={19}/></a><a className="sites-hero-secondary" href="#portfolio">Ver portfólio</a></div>
      </div>
      <NativeHeroScene/>
    </div>
    <ul className="sites-hero-benefits">{benefits.map(({icon:Icon,title,text})=><li key={title}><span className="sites-benefit-icon"><Icon size={22} aria-hidden="true"/></span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul>
  </Container></section>;
}
