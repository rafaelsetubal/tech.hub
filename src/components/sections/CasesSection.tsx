import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import mockup from '@/assets/fourprints-mockup.webp';

export const CasesSection: React.FC = () => (
  <section id="projetos" className="editorial-section case-section visual-case">
    <Container>
      <MotionReveal>
        <div className="case-grid">
          <div className="case-art">
            <span className="case-wordmark" aria-hidden="true">
              four<br />prints.
            </span>
            <img
              src={mockup}
              alt="Apresentação do projeto Four Prints em um tablet"
              loading="lazy"
              decoding="async"
            />
            <div className="case-art-note">
              Site + processos + gestão
              <ArrowUpRight size={22} />
            </div>
          </div>

          <div className="case-copy">
            <span className="case-client">Na prática · Four Prints</span>
            <h2 className="editorial-title">
              Um projeto.<br />
              <span>
                Todo mundo<br />
                no mesmo rumo.
              </span>
            </h2>
            <p>
              No Four Prints, organizamos a gestão do projeto e os processos internos,
              acompanhando a equipe de desenvolvimento do planejamento às entregas.
            </p>

            <dl>
              <div>
                <dt>O desafio</dt>
                <dd>Dar visibilidade às etapas e organizar o andamento do projeto.</dd>
              </div>
              <div>
                <dt>A atuação</dt>
                <dd>Gestão do projeto, organização dos processos e acompanhamento das entregas.</dd>
              </div>
              <div>
                <dt>Resultado</dt>
                <dd>Processos integrados, entregas no prazo e clareza total para liderança e time.</dd>
              </div>
            </dl>

            <div className="my-5 flex flex-wrap gap-2" aria-label="Resultados alcançados">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#eef4ff] text-[#2563EB] border border-[#d6e4ff]">
                <CheckCircle2 size={13} /> Entregas no prazo
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#eef4ff] text-[#2563EB] border border-[#d6e4ff]">
                <CheckCircle2 size={13} /> Visibilidade total
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#eef4ff] text-[#2563EB] border border-[#d6e4ff]">
                <CheckCircle2 size={13} /> Operação alinhada
              </span>
            </div>

            <a className="text-link" href="#cta-diagnostico">
              Vamos olhar para o seu projeto? <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </MotionReveal>
    </Container>
  </section>
);
