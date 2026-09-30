import React from 'react';
import { Container } from './Container';
import { Logo } from '@/components/ui/Logo';
import { BrandSymbol } from '@/components/ui/BrandSymbol';
import { ArrowUpRight, ArrowUp, MessageCircle, Mail } from 'lucide-react';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/whatsapp';

export const Footer: React.FC<{ page?: 'home' | 'sites' }> = ({ page = 'home' }) => {
  const sites = page === 'sites';
  const links = sites
    ? [
        ['Portfólio', '#portfolio'],
        ['Tipos de página', '#formatos'],
        ['Como criamos', '#como-criamos'],
        ['Acompanhamento', '#acompanhamento'],
      ]
    : [
        ['Soluções', '#servicos'],
        ['Como funciona', '#conteudo'],
        ['Projetos', '#projetos'],
        ['Sobre a Tech Hub', '#sobre'],
      ];

  return (
    <footer className="brand-footer">
      <Container>
        <div className="footer-invitation">
          <p>
            {sites
              ? 'Sua próxima boa impressão começa aqui.'
              : 'Tecnologia que faz sentido para o seu negócio.'}
          </p>
          <a
            href={whatsappLink(sites ? 'sites' : 'consultoria')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar pelo WhatsApp (abre em nova aba)"
          >
            Conversar pelo WhatsApp <ArrowUpRight size={22} />
          </a>
        </div>

        <div className="footer-body">
          <div className="footer-brand">
            <Logo variant="white" />
            <p className="footer-tagline">Tecnologia que faz sentido.</p>
            <div className="footer-contact-items">
              <a
                href={whatsappLink('geral')}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>{WHATSAPP_DISPLAY}</span>
              </a>
              <a href="mailto:contato@techhubvision.com.br" className="footer-contact-link">
                <Mail size={15} aria-hidden="true" />
                <span>contato@techhubvision.com.br</span>
              </a>
              <a href="mailto:orcamentos@techhubvision.com.br" className="footer-contact-link">
                <Mail size={15} aria-hidden="true" />
                <span>orcamentos@techhubvision.com.br</span>
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2>Explore</h2>
            {links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <nav aria-label="Canais e páginas">
            <h2>Tech Hub</h2>
            <a href="/">Gestão & tecnologia</a>
            <a href="/sites">Sites & páginas</a>
            <a href="/brand">Brand & Assets</a>
            <a
              href="https://www.instagram.com/tech.hub.vision/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @tech.hub.vision
            </a>
            <a
              href="https://www.linkedin.com/company/tech-hub-vision"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Tech Hub
            </a>
          </nav>

          <BrandSymbol className="footer-symbol" />
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tech Hub · CNPJ 53.344.679/0001-00 · Belo Horizonte, MG · Atendimento em todo o Brasil
          </p>
          <a href={sites ? '#sites-inicio' : '#hero'}>
            Voltar ao início <ArrowUp size={15} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

