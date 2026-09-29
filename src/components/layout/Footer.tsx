import React from 'react';
import { Container } from './Container';
import { Logo } from '@/components/ui/Logo';
import { BrandSymbol } from '@/components/ui/BrandSymbol';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

export const Footer: React.FC<{page?:'home'|'sites'}> = ({page='home'}) => {
  const sites=page==='sites';
  const links=sites
    ? [['Portfólio','#portfolio'],['Tipos de página','#formatos'],['Como criamos','#como-criamos'],['Acompanhamento','#acompanhamento']]
    : [['Soluções','#servicos'],['Como funciona','#conteudo'],['Projetos','#projetos'],['Sobre a Tech Hub','#sobre']];
  return <footer className="brand-footer"><Container>
    <div className="footer-invitation"><p>{sites?'Sua próxima boa impressão começa aqui.':'Tecnologia que faz sentido para o seu negócio.'}</p><a href={sites?'#seu-projeto':'#cta-diagnostico'}>Conte sua ideia <ArrowUpRight size={24}/></a></div>
    <div className="footer-body"><div className="footer-brand"><Logo variant="white"/><p>Pessoas, negócio e tecnologia.<br/>Na mesma direção.</p></div><nav aria-label="Navegação do rodapé"><h2>Explore</h2>{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><nav aria-label="Outras páginas"><h2>Tech Hub</h2><a href="/">Gestão & tecnologia</a><a href="/sites">Sites & páginas</a><a href="/brand">Brand & Assets</a><a href={sites?'#seu-projeto':'#cta-diagnostico'}>Começar um projeto</a></nav><BrandSymbol className="footer-symbol"/></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Tech Hub. Todos os direitos reservados.</p><a href={sites?'#sites-inicio':'#hero'}>Voltar ao início <ArrowUp size={15}/></a></div>
  </Container></footer>;
};
