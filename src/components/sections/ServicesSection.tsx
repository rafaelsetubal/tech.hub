import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight, Check, Database, Globe, Mail, UsersRound, Workflow } from 'lucide-react';
import processArt from '@/assets/card-processos.webp';
import projectArt from '@/assets/card-projetos.webp';
import automationArt from '@/assets/card-automacao.webp';
import sitesArt from '@/assets/card-solucoes.webp';

const services = [
  {
    title: 'Uma rotina que flui.',
    label: 'Processos & organização',
    copy: 'Definimos etapas e responsabilidades para o trabalho não depender da memória de uma pessoa.',
    received: 'Mapa do processo atual e do novo, papéis definidos e um guia simples pra equipe.',
    items: ['Papéis e etapas visíveis', 'Menos tarefas repetidas'],
    buttonText: 'Organizar minha rotina',
    href: '#orcamento',
  },
  {
    title: 'Projetos que avançam.',
    label: 'Gestão de projetos',
    copy: 'Tornamos prioridades, responsáveis e o andamento visíveis — da ideia à entrega.',
    received: 'Quadro de projetos configurado na ferramenta que você já usa, com rotina de acompanhamento.',
    items: ['Prazos à vista', 'Equipe na mesma direção'],
    buttonText: 'Organizar meus projetos',
    href: '#orcamento',
  },
  {
    title: 'Ferramentas que conversam.',
    label: 'Automação & integração',
    copy: 'Conectamos ferramentas para a informação seguir adiante sem copiar e colar a cada etapa.',
    received: 'Integrações funcionando entre as ferramentas combinadas, testadas com a equipe.',
    items: ['Dados no lugar certo', 'Menos transferência manual'],
    buttonText: 'Conectar minhas ferramentas',
    href: '#orcamento',
  },
  {
    title: 'Seu negócio bem explicado.',
    label: 'Sites & páginas de venda',
    copy: 'Um endereço que explica o seu negócio e leva ao contato.',
    received: 'Site ou página publicada, testada no celular, com acompanhamento de acessos.',
    items: ['Do conteúdo à publicação', 'Apresentação clara de valor'],
    buttonText: 'Ver sites e páginas',
    href: '/sites',
  },
];

export const ServicesSection: React.FC = () => (
  <section id="servicos" className="editorial-section services-section visual-services">
    <Container>
      <div className="section-heading mb-10 text-center max-w-2xl mx-auto">
        <MotionReveal>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 block mb-2">
            SERVIÇOS DE GESTÃO & TECNOLOGIA
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Começamos pelo que você precisa melhorar.<br />
            <span className="text-blue-600">A ferramenta vem depois.</span>
          </h2>
        </MotionReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <MotionReveal key={s.label} delay={i * 0.08}>
            <article className="service-card flex flex-col justify-between h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
              <div>
                <div className="service-art relative h-44 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 flex items-center justify-center">
                  <img
                    className="service-backdrop absolute inset-0 w-full h-full object-cover opacity-80"
                    src={[processArt, projectArt, automationArt, sitesArt][i]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={'service-demo service-demo-' + i} aria-hidden="true">
                    {i === 0 && (
                      <div className="demo-workflow relative z-10">
                        <div><Check size={16} /><span>Pedido recebido</span></div>
                        <i />
                        <div><UsersRound size={16} /><span>Responsável definido</span></div>
                        <i />
                        <div><Check size={16} /><span>Próxima etapa</span><ArrowUpRight size={14} /></div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="demo-project relative z-10">
                        <div className="project-top">Do plano à entrega <span>↗</span></div>
                        <div className="project-columns">
                          <div><span>Planejar</span><i /><i /></div>
                          <div><span>Fazer</span><i /><i /></div>
                          <div><span>Concluir</span><i><Check size={16} /></i></div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="demo-integrations relative z-10">
                        <svg viewBox="0 0 260 160">
                          <path d="M45 40Q130 40 130 80T215 120M45 120Q130 120 130 80T215 40" fill="none" stroke="#bbecff" strokeWidth="2" />
                        </svg>
                        <span className="integration-center"><Workflow size={30} /></span>
                        <span className="integration-a"><Database size={22} /></span>
                        <span className="integration-b"><Mail size={22} /></span>
                        <span className="integration-c"><UsersRound size={22} /></span>
                        <span className="integration-d"><Check size={22} /></span>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="relative z-10 flex flex-col items-center justify-center text-blue-600">
                        <Globe size={40} className="animate-spin-slow opacity-90" />
                        <span className="text-[10px] font-mono mt-1 font-semibold tracking-wider uppercase text-blue-800 bg-white/90 px-2 py-0.5 rounded-full border border-blue-200">
                          Site publicado
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="service-art-label absolute bottom-2.5 left-2.5 z-20 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700 border border-slate-200/80 shadow-xs">
                    {s.label}
                  </span>
                </div>

                <div className="service-content space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight m-0">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                    {s.copy}
                  </p>

                  <div className="pt-2 pb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold block mb-1">
                      O que você recebe:
                    </span>
                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed m-0">
                      {s.received}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check size={14} className="text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <a
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-blue-600 hover:text-blue-700 group py-1"
                  href={s.href}
                >
                  <span>{s.buttonText}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </Container>
  </section>
);
