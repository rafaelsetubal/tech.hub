import React from 'react';
import { Container } from '@/components/layout/Container';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Box,
  Check,
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.webp';
import { whatsappLink } from '@/lib/whatsapp';

export const HeroSection: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    el?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] lg:min-h-[100svh] lg:max-h-[900px] pt-28 sm:pt-32 lg:pt-24 xl:pt-28 pb-0 overflow-hidden bg-white flex flex-col justify-between"
    >
      {/* Background Fluid Wave Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src={heroBg}
          width={1672}
          height={941}
          alt=""
          aria-hidden="true"
          {...{ fetchpriority: 'high' }}
          decoding="async"
          className="w-full h-full object-cover object-top opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40 pointer-events-none" />
      </div>

      <Container className="relative z-10 flex-grow flex items-end w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end w-full">
          {/* ================================================================
              LEFT COLUMN: Editorial Headline & Actions (Vertically Centered)
              ================================================================ */}
          <div className="home-hero-copy lg:col-span-5 xl:col-span-5 space-y-7 lg:space-y-4 xl:space-y-5 self-center py-8 lg:py-2 xl:py-6 z-20">
            {/* Tag editorial */}
            <div className="w-full">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-slate-700">
                  TECNOLOGIA APLICADA À GESTÃO
                </span>
              </div>
            </div>

            {/* Headline em Fustat */}
            <div className="w-full">
              <h1 className="font-display font-extrabold text-[2.75rem] sm:text-5xl md:text-[3.25rem] lg:text-[3.4rem] xl:text-[3.9rem] leading-[1.05] tracking-[-0.035em] text-[#081220]">
                Tecnologia<br />
                não precisa<br />
                parecer uma<br />
                <span className="bg-gradient-to-r from-[#0052FF] via-[#5B3DED] to-[#00BAFF] bg-clip-text text-transparent drop-shadow-sm">
                  língua diferente.
                </span>
              </h1>
            </div>

            {/* Subtitle em Inter Tight */}
            <div className="w-full">
              <p className="text-base sm:text-lg text-slate-600 max-w-lg font-body font-normal leading-relaxed">
                Organizamos processos, conectamos ferramentas e criamos sites para pequenas e médias empresas trabalharem melhor. Sem jargão.
              </p>
            </div>

            {/* Chic CTAs */}
            <div className="w-full">
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappLink('consultoria')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00BAFF] hover:from-[#0042D9] hover:to-[#00A3E0] shadow-[0_6px_20px_rgba(0,82,255,0.28)] hover:shadow-[0_8px_28px_rgba(0,82,255,0.42)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-normal group cursor-pointer"
                  >
                    <span>Conversar sobre meu projeto</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-normal group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#servicos"
                    onClick={(e) => handleScrollTo(e, 'servicos')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#081220] bg-white/85 hover:bg-white backdrop-blur-sm border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-normal cursor-pointer"
                  >
                    <span>Conhecer os serviços</span>
                  </a>
                </div>
                <p className="hero-credibility text-xs sm:text-[13px] text-slate-600 font-body leading-relaxed flex items-center gap-2 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                  <span>Mais de 8 anos em tecnologia, gestão e dados · Belo Horizonte, atendimento em todo o Brasil</span>
                </p>
              </div>
            </div>

            {/* Keyword Bar */}
            <div className="w-full">
              <div className="hero-capabilities pt-2 flex flex-wrap items-center gap-2">
                {['Processos', 'Gestão de projetos', 'Automação', 'Sites'].map(label => <span key={label}>{label}</span>)}
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: Inside Container Grid + Layered Depth Cards
              ================================================================ */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-end justify-center lg:justify-end self-end pt-4 lg:pt-0">
            <div className="relative w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[680px] xl:max-w-[740px] flex items-end justify-center lg:justify-end">
              {/* Subtle ambient lighting behind expert */}
              <div className="hidden sm:block absolute bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-blue-400/25 via-violet-400/15 to-transparent blur-3xl pointer-events-none z-0" />

              {/* Layer 1 (BEHIND): Floating Card 1 - Top Left: Processos mais claros */}
              <div className="absolute top-[8%] -left-3 sm:-left-5 lg:-left-6 z-10 animate-ambient-float pointer-events-auto">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(0,40,120,0.08)] flex items-center gap-3 group hover:scale-105 transition-transform duration-normal cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052FF] shrink-0 shadow-inner">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-display font-bold text-[#081220]">
                        Processos
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0052FF]" />
                    </div>
                    <span className="text-[11px] font-body text-slate-500 block leading-tight">
                      mais claros
                    </span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-[#0052FF] to-[#00BAFF] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 1 (BEHIND): Floating Card 2 - Top Right: Projetos no controle */}
              <div
                className="absolute top-[16%] -right-2 sm:-right-3 lg:-right-3 z-10 animate-ambient-float pointer-events-auto"
                style={{ animationDelay: '-4s' }}
              >
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(100,50,200,0.08)] flex items-center gap-3 group hover:scale-105 transition-transform duration-normal cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0 shadow-inner">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-display font-bold text-[#081220]">
                        Projetos
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <span className="text-[11px] font-body text-slate-500 block leading-tight">
                      no controle
                    </span>
                    <svg className="w-16 h-3 text-violet-400 mt-1" viewBox="0 0 64 12" fill="none">
                      <path
                        d="M1 9C10 2 20 11 32 6C44 1 54 10 63 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Layer 2 (CENTER): Expert Image firmly touching the bottom */}
              <img
                src="/images/expert-hero-large.webp"
                srcSet="/images/expert-hero-small.webp 480w, /images/expert-hero-medium.webp 768w, /images/expert-hero-large.webp 1024w"
                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 640px, 850px"
                width={1024}
                height={880}
                alt="Michelli Bonatelli, fundadora da Tech Hub"
                className="relative z-20 w-full sm:w-[110%] lg:w-auto lg:max-h-[min(540px,calc(100svh-140px))] xl:max-h-[min(660px,calc(100svh-140px))] max-w-none h-auto object-contain object-bottom select-none block drop-shadow-none sm:drop-shadow-[0_16px_40px_rgba(0,25,80,0.14)] pointer-events-none"
                style={{ aspectRatio: '1024 / 880' }}
                loading="eager"
                decoding="async"
              />

              {/* Layer 3 (FRONT): Floating Card 3 - Bottom Right Checklist */}
              <div
                className="absolute bottom-[6%] -right-2 sm:-right-3 lg:-right-2 z-30 animate-ambient-float pointer-events-auto"
                style={{ animationDelay: '-8s' }}
              >
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_32px_rgba(0,40,120,0.14)] space-y-2.5 min-w-[170px] group hover:scale-105 transition-transform duration-normal cursor-default">
                  {[
                    'Organização',
                    'Automação',
                    'Produtividade',
                    'Resultados',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-[5px] bg-gradient-to-br from-[#0052FF] to-[#00BAFF] flex items-center justify-center text-white shrink-0 shadow-[0_2px_6px_rgba(0,82,255,0.3)]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs font-body font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
