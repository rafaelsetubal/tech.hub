import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { Network, Database, Puzzle, Clock } from 'lucide-react';
import problemBg from '@/assets/problem-bg.png';
import expertProfile from '@/assets/expert-profile.png';

export const TechnologyProblemSection: React.FC = () => {
  const painPoints = [
    {
      icon: Network,
      label: 'FERRAMENTAS DESCONECTADAS',
    },
    {
      icon: Database,
      label: 'INFORMAÇÕES ESPALHADAS',
    },
    {
      icon: Puzzle,
      label: 'PROCESSOS SEM PADRÃO',
    },
    {
      icon: Clock,
      label: 'TEMPO SENDO PERDIDO',
    },
  ];

  return (
    <section className="relative w-full pt-20 sm:pt-24 lg:pt-32 pb-0 bg-[#040914] text-white overflow-hidden flex flex-col justify-between">
      {/* Background Fluid Wave - Natural high fidelity rendering */}
      <img
        src={problemBg}
        alt="Problem fluid wave background"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0 opacity-100"
      />

      <Container className="relative z-10 flex-grow flex items-end w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end w-full">
          {/* ================================================================
              LEFT COLUMN: Editorial Headline & Subtitle (Centered Vertically)
              ================================================================ */}
          <div className="lg:col-span-5 space-y-6 self-center py-8 lg:py-16 z-20">
            <MotionReveal variant="slideUp" delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] leading-[1.08] tracking-tight text-white drop-shadow-md">
                O problema não é<br />
                ter tecnologia.<br />
                É não{' '}
                <span className="bg-gradient-to-r from-[#00BAFF] via-[#00D2FF] to-[#38BDF8] bg-clip-text text-transparent">
                  saber
                </span><br />
                <span className="bg-gradient-to-r from-[#00BAFF] via-[#00D2FF] to-[#38BDF8] bg-clip-text text-transparent">
                  o que fazer com ela.
                </span>
              </h2>
            </MotionReveal>

            <MotionReveal variant="slideUp" delay={0.25}>
              <p className="text-sm sm:text-base text-slate-300 font-body font-normal leading-relaxed max-w-md drop-shadow-sm">
                Muitas empresas já utilizam diversas ferramentas, mas ainda enfrentam processos confusos, retrabalho e falta de organização.
              </p>
            </MotionReveal>
          </div>

          {/* ================================================================
              CENTER COLUMN: Expert Portrait GROUNDED TO THE BOTTOM (0px gap)
              ================================================================ */}
          <div className="lg:col-span-4 flex justify-center items-end self-end relative z-10 pt-4 lg:pt-0">
            <MotionReveal variant="fade" delay={0.2} className="w-full flex justify-center items-end">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px] flex justify-center items-end">
                {/* Luminous aura behind profile portrait */}
                <div className="absolute bottom-10 inset-x-0 h-72 bg-gradient-to-tr from-purple-600/30 via-blue-500/25 to-cyan-400/20 rounded-full blur-3xl transform scale-95 pointer-events-none z-0" />

                <img
                  src={expertProfile}
                  alt="Especialista Tech Hub - Perfil"
                  className="relative z-10 w-full max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] object-contain object-bottom select-none mix-blend-screen block drop-shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                />
              </div>
            </MotionReveal>
          </div>

          {/* ================================================================
              RIGHT COLUMN: 4 Circular Outline Pain Point Pills (Centered Vertically)
              ================================================================ */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-5 self-center py-8 lg:py-16 z-20">
            {painPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <MotionReveal key={item.label} variant="slideUp" delay={0.15 + idx * 0.08}>
                  <div className="flex items-center gap-3.5 group cursor-default">
                    {/* Glowing Circular Icon */}
                    <div className="w-11 h-11 rounded-full border border-sky-400/40 bg-sky-500/10 backdrop-blur-md flex items-center justify-center text-sky-400 shadow-[0_0_16px_rgba(0,186,255,0.18)] group-hover:border-sky-300 group-hover:bg-sky-500/20 group-hover:scale-110 transition-all duration-normal shrink-0">
                      <IconComp className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Monospace Uppercase Text */}
                    <span className="text-[11px] sm:text-xs font-mono tracking-widest font-semibold text-slate-200 uppercase leading-snug group-hover:text-white transition-colors drop-shadow-sm">
                      {item.label}
                    </span>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
