import React from 'react';
import { Container } from '@/components/layout/Container';
import { ProjectBrief } from '@/components/ui/ProjectBrief';
import ctaBackground from '@/assets/cta-bg.webp';
export const CtaSection: React.FC = () => (
  <section id="cta-diagnostico" className="editorial-section contact-section visual-contact"><img className="contact-background-image" src={ctaBackground} alt="" aria-hidden="true" loading="lazy" decoding="async"/><Container><div className="contact-grid"><div><h2 className="editorial-title">Seu próximo<br />passo começa<br /><em>com uma conversa.</em></h2><p className="editorial-copy">Não precisa chegar com a solução pronta. Conte o que está difícil hoje — e o que você quer fazer melhor.</p><div className="contact-orbit" aria-hidden="true"><i/><i/><i/></div></div><ProjectBrief /></div></Container></section>
);
