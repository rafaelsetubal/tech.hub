import React from 'react';
import '@/styles/editorial.css';
import '@/styles/visual-sections.css';
import '@/styles/brand-assembly.css';
import '@/styles/process-evolution.css';
import '@/styles/narrative-responsive.css';
import '@/styles/site-value-footer.css';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CasesSection } from '@/components/sections/CasesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/layout/Footer';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white text-[#081220] selection:bg-brand-sky selection:text-night antialiased">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar />

      {/* Main Landing Page Structure */}
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Manifesto / Scroll Experience */}
        <ManifestoSection />

        {/* 3. O Desafio */}
        <ProblemSection />

        {/* 4. O Que Fazemos (Serviços) */}
        <ServicesSection />

        {/* 5. Como Funciona (Processo) */}
        <ProcessSection />

        {/* 6. Na Prática (Cases & Resultados) */}
        <CasesSection />

        {/* 7. Quem Está Por Trás (Sobre Michelli) */}
        <AboutSection />

        {/* 8. Diagnóstico Tech Hub (CTA Final) */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
