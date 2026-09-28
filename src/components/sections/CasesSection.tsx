import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight } from 'lucide-react';
import mockup from '@/assets/fourprints-mockup.webp';
export const CasesSection: React.FC = () => (
  <section id="projetos" className="editorial-section case-section visual-case"><Container>
    
    <MotionReveal><div className="case-grid"><div className="case-art"><span className="case-wordmark" aria-hidden="true">four<br />prints.</span><img src={mockup} alt="Apresentação do projeto Four Prints em um tablet" loading="lazy" decoding="async" /><div className="case-art-note">Site + processos + gestão<ArrowUpRight size={22}/></div></div><div className="case-copy"><span className="case-client">Na prática · Four Prints</span><h2 className="editorial-title">Um projeto.<br /><span>Todo mundo<br />no mesmo rumo.</span></h2><p>No Four Prints, organizamos a gestão do projeto e os processos internos, acompanhando a equipe de desenvolvimento do planejamento às entregas.</p><dl><div><dt>O desafio</dt><dd>Dar visibilidade às etapas e organizar o andamento do projeto.</dd></div><div><dt>A atuação</dt><dd>Gestão do projeto, organização dos processos e acompanhamento das entregas.</dd></div></dl><a className="text-link" href="#cta-diagnostico">Vamos olhar para o seu projeto? <ArrowUpRight size={18} /></a></div></div></MotionReveal>
  </Container></section>
);
