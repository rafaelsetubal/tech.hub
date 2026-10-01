import React, { startTransition } from 'react';
import { DeferredHydration } from '@/components/motion/DeferredHydration';
import { useInitialAnchor } from '@/hooks/useInitialAnchor';
import '@/styles/editorial.css';
import '@/styles/visual-sections.css';
import '@/styles/brand-assembly.css';
import '@/styles/process-evolution.css';
import '@/styles/narrative-responsive.css';
import '@/styles/site-value-footer.css';
import '@/styles/layout-repairs.css';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CasesSection } from '@/components/sections/CasesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { HomeFaq } from '@/components/sections/HomeFaq';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

export const Home: React.FC = () => {
  useInitialAnchor();
  const [requestedGoal, setRequestedGoal] = React.useState<string | undefined>(undefined);

  return (
    <div className="relative min-h-screen bg-white text-[#081220] selection:bg-brand-sky selection:text-night antialiased">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar />

      {/* Main Landing Page Structure */}
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Manifesto / Scroll Experience */}
        <DeferredHydration><ManifestoSection /></DeferredHydration>

        {/* 3. O Desafio */}
        <DeferredHydration><ProblemSection /></DeferredHydration>

        {/* 4. O Que Fazemos (Serviços) */}
        <DeferredHydration><ServicesSection onSelectService={(goal) => startTransition(() => setRequestedGoal(goal))} /></DeferredHydration>

        {/* 5. Na Prática (Case & Prova Social Four Prints) */}
        <DeferredHydration><CasesSection /></DeferredHydration>

        {/* 6. Como Funciona (Processo) */}
        <DeferredHydration><ProcessSection /></DeferredHydration>

        {/* 7. Quem Está Por Trás (Sobre Michelli e time) */}
        <DeferredHydration><AboutSection /></DeferredHydration>

        {/* 8. Dúvidas Frequentes (FAQ) */}
        <DeferredHydration><HomeFaq /></DeferredHydration>

        {/* 9. Diagnóstico Tech Hub (CTA Final) */}
        <DeferredHydration><CtaSection requestedGoal={requestedGoal} /></DeferredHydration>
      </main>

      {/* Mobile Floating WhatsApp Button */}
      <FloatingWhatsApp page="home" />

      {/* Footer */}
      <Footer />
    </div>
  );
};

