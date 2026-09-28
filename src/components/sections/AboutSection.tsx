import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight } from 'lucide-react';
import expert from '@/assets/expert.webp';
import { BrandSymbol } from '@/components/ui/BrandSymbol';
export const AboutSection: React.FC = () => (
  <section id="sobre" className="editorial-section about-section visual-about"><Container><div className="about-grid"><MotionReveal><div className="portrait-composition"><BrandSymbol className="portrait-brand-outline" outline /><BrandSymbol className="portrait-brand-float" /><div className="portrait-frame"><div className="portrait-orbit" /><img src={expert} alt="Michelli Bonatelli, especialista da Tech Hub" loading="lazy" decoding="async" /><span>Michelli Bonatelli<br /><small>Gestão + tecnologia</small></span></div></div></MotionReveal><MotionReveal><h2 className="editorial-title">Tecnologia<br />é sobre<br /><span className="manifesto-accent">pessoas.</span></h2><p className="editorial-copy">Sou Michelli. Há mais de 6 anos, ajudo empresas a transformar processos complexos em um jeito melhor de trabalhar.</p><p className="editorial-copy">A Tech Hub nasce desse olhar: ouvir quem faz, entender o negócio e só então escolher a tecnologia.</p><a href="#cta-diagnostico" className="text-link">Vamos conversar sobre sua empresa <ArrowUpRight size={18} /></a></MotionReveal></div></Container></section>
);
