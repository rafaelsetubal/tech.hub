import React from 'react';
import { Container } from '@/components/layout/Container';
import { ProjectBrief } from '@/components/ui/ProjectBrief';
import ctaBackground from '@/assets/cta-bg.webp';
interface CtaSectionProps {
  requestedGoal?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ requestedGoal }) => (
  <section id="cta-diagnostico" className="editorial-section contact-section visual-contact contact-layout">
    <div id="orcamento" className="sr-only" />
    <img className="contact-background-image" src={ctaBackground} alt="" aria-hidden="true" loading="lazy" decoding="async"/>
    <Container>
      <div className="contact-heading mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
        <h2 className="editorial-title text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Tudo começa<br />
          <em className="not-italic text-blue-600">com uma conversa.</em>
        </h2>
        <p className="editorial-copy text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Não precisa chegar com a solução pronta. Conte o que está difícil hoje — e o que você quer fazer melhor.
        </p>
      </div>
      <ProjectBrief pagina="home" requestedGoal={requestedGoal} />
    </Container>
  </section>
);
