import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight, Check, Database, Mail, UsersRound, Workflow } from 'lucide-react';
import processArt from '@/assets/card-processos.webp';
import projectArt from '@/assets/card-projetos.webp';
import automationArt from '@/assets/card-automacao.webp';
import { track } from '@/lib/track';

export interface ServiceItem {
  title: string;
  label: string;
  copy: string;
  received: string;
  items: string[];
  buttonText: string;
  href: string;
  ctaParam: string;
}

const services: ServiceItem[] = [
  {
    title: 'Uma rotina que flui.',
    label: 'Processos & organização',
    copy: 'Definimos etapas e responsabilidades para o trabalho não depender da memória de uma pessoa.',
    received: 'Mapa do processo atual e do novo, papéis definidos e um guia simples pra equipe.',
    items: ['Papéis e etapas visíveis', 'Menos tarefas repetidas'],
    buttonText: 'Organizar minha rotina',
    href: '#orcamento',
    ctaParam: 'Organizar processos',
  },
  {
    title: 'Projetos que avançam.',
    label: 'Gestão de projetos',
    copy: 'Tornamos prioridades, responsáveis e o andamento visíveis — da ideia à entrega.',
    received: 'Quadro de projetos configurado na ferramenta que você já usa, com rotina de acompanhamento.',
    items: ['Prazos à vista', 'Equipe na mesma direção'],
    buttonText: 'Organizar meus projetos',
    href: '#orcamento',
    ctaParam: 'Gestão de projetos',
  },
  {
    title: 'Ferramentas que conversam.',
    label: 'Automação & integração',
    copy: 'Conectamos ferramentas para a informação seguir adiante sem copiar e colar a cada etapa.',
    received: 'Integrações funcionando entre as ferramentas combinadas, testadas com a equipe.',
    items: ['Dados no lugar certo', 'Menos transferência manual'],
    buttonText: 'Conectar minhas ferramentas',
    href: '#orcamento',
    ctaParam: 'Automação e integração',
  },
];

interface ServicesSectionProps {
  onSelectService?: (service: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleServiceClick = (param: string, label: string) => {
    if (onSelectService) {
      onSelectService(param);
    }
    track('cta_click', {
      origem: 'home-servicos',
      destino: 'orcamento',
      rotulo: label,
    });
  };

  return (
    <section id="servicos" className="editorial-section services-section visual-services">
      <Container>
        <div className="section-heading mb-12 text-center max-w-3xl mx-auto">
          <MotionReveal>
            <span className="small-label text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
              SERVIÇOS DE GESTÃO & TECNOLOGIA
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Começamos pelo que você precisa melhorar.<br />
              <span className="muted-title">A ferramenta vem depois.</span>
            </h2>
          </MotionReveal>
        </div>

        <div className="service-grid">
          {services.map((s, i) => (
            <MotionReveal key={s.label} delay={i * 0.08}>
              <article className="service-card">
                <div className="service-art">
                  <img
                    className="service-backdrop"
                    src={[processArt, projectArt, automationArt][i]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={'service-demo service-demo-' + i} aria-hidden="true">
                    {i === 0 && (
                      <div className="demo-workflow">
                        <div><Check size={16} /><span>Pedido recebido</span></div>
                        <i />
                        <div><UsersRound size={16} /><span>Responsável definido</span></div>
                        <i />
                        <div><Check size={16} /><span>Próxima etapa</span><ArrowUpRight size={14} /></div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="demo-project">
                        <div className="project-top">Do plano à entrega <span>↗</span></div>
                        <div className="project-columns">
                          <div><span>Planejar</span><i /><i /></div>
                          <div><span>Fazer</span><i /><i /></div>
                          <div><span>Concluir</span><i><Check size={16} /></i></div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="demo-integrations">
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
                  </div>
                  <span className="service-art-label">{s.label}</span>
                </div>

                <div className="service-content">
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.copy}</p>

                    <div className="service-deliverable-card">
                      <span className="deliverable-tag">O que você recebe:</span>
                      <p>{s.received}</p>
                    </div>

                    <ul>
                      {s.items.map((item) => (
                        <li key={item}>
                          <Check size={15} className="text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-card-action">
                    <a
                      href={s.href}
                      onClick={() => handleServiceClick(s.ctaParam, s.buttonText)}
                    >
                      <span>{s.buttonText}</span>
                      <ArrowUpRight size={17} className="text-blue-600 shrink-0" />
                    </a>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>

        {/* Digital Banner: Sites & Páginas de Venda */}
        <MotionReveal delay={0.25}>
          <a
            className="digital-banner"
            href="/sites"
            onClick={() => {
              track('nav_home_to_sites', { origem: 'home-servicos-banner' });
            }}
          >
            <div className="banner-copy">
              <span className="banner-badge">SITES & PÁGINAS DE VENDA</span>
              <h3>
                Explique seu valor.<br />
                Facilite a escolha do cliente.
              </h3>
              <p>
                Sites e páginas para apresentar seu trabalho, responder dúvidas e abrir um caminho direto até o contato.
              </p>
              <div className="banner-deliverable">
                <span>O que você recebe:</span>
                <p>Site ou página publicada, testada no celular, com acompanhamento de acessos.</p>
              </div>
              <span className="banner-cta-link">
                Conheça nossos sites e páginas <ArrowUpRight size={18} />
              </span>
            </div>

            <div className="mini-browser" aria-hidden="true">
              <div className="browser-chrome">
                <i /><i /><i />
                <span>seunegocio.com.br</span>
              </div>
              <div className="mini-content">
                <span>SUA MARCA</span>
                <strong>
                  Seu negócio, explicado<br />
                  em 5 segundos.
                </strong>
                <div className="mock-button">Vamos conversar ↗</div>
                <div className="mini-orb" />
              </div>
            </div>
          </a>
        </MotionReveal>
      </Container>
    </section>
  );
};
