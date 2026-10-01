import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight } from 'lucide-react';
import expert from '@/assets/expert.webp';
import { BrandSymbol } from '@/components/ui/BrandSymbol';
import { whatsappLink } from '@/lib/whatsapp';

export const AboutSection: React.FC = () => (
  <section id="sobre" className="editorial-section about-section visual-about">
    <Container>
      <div className="about-grid">
        <MotionReveal>
          <div className="portrait-composition">
            <BrandSymbol className="portrait-brand-outline" outline />
            <BrandSymbol className="portrait-brand-float" />
            <div className="portrait-frame">
              <div className="portrait-orbit" />
              <img
                src={expert}
                alt="Michelli Bonatelli, fundadora da Tech Hub"
                loading="lazy"
                decoding="async"
              />
              <span>
                Michelli Bonatelli<br />
                <small>Gestão + tecnologia · 8+ anos</small>
              </span>
            </div>
          </div>
        </MotionReveal>
        <MotionReveal>
          <span className="small-label">QUEM FAZ</span>
          <h2 className="editorial-title">
            Tecnologia<br />
            é sobre<br />
            <span className="manifesto-accent">pessoas.</span>
          </h2>
          <p className="editorial-copy">
            Sou Michelli Bonatelli. Há mais de 8 anos, ajudo empresas a transformar processos complexos em rotinas simples, com foco em gestão de projetos, personalização digital, testes A/B e análise de dados.
          </p>
          <p className="editorial-copy">
            Ao lado do Rafael (Design e Desenvolvimento), formamos um time pequeno de propósito: você fala direto com quem planeja e com quem constrói suas soluções, do diagnóstico à publicação.
          </p>
          <div
            className="about-actions"
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://www.linkedin.com/in/micristina/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              style={{ margin: 0 }}
            >
              LinkedIn da Michelli <ArrowUpRight size={18} />
            </a>
            <a
              href={whatsappLink('consultoria')}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-link"
            >
              Falar com quem faz <ArrowUpRight size={18} />
            </a>
          </div>
        </MotionReveal>
      </div>
    </Container>
  </section>
);
