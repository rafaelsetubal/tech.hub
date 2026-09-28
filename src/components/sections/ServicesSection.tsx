import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight, Check, Database, Mail, UsersRound, Workflow } from 'lucide-react';
import processArt from '@/assets/card-processos.webp';
import projectArt from '@/assets/card-projetos.webp';
import automationArt from '@/assets/card-automacao.webp';

const services = [
  { title: 'Uma rotina que flui.', label: 'Processos & organização', copy: 'Definimos etapas e responsabilidades para o trabalho não depender da memória de uma pessoa.', items: ['Papéis e etapas visíveis', 'Menos tarefas repetidas'] },
  { title: 'Projetos que avançam.', label: 'Gestão de projetos', copy: 'Tornamos prioridades, responsáveis e próximos passos visíveis — da ideia à entrega.', items: ['Prazos acompanháveis', 'Equipe na mesma direção'] },
  { title: 'Ferramentas que conversam.', label: 'Automação & integração', copy: 'Conectamos ferramentas para a informação seguir adiante sem copiar e colar a cada etapa.', items: ['Dados no lugar certo', 'Menos transferência manual'] },
];
export const ServicesSection: React.FC = () => (
  <section id="servicos" className="editorial-section services-section visual-services">
    <Container>
      
      <div className="section-heading"><MotionReveal><h2 className="editorial-title">Menos complicação.<br /><span className="muted-title">Mais negócio.</span></h2></MotionReveal><p>Começamos pelo que você precisa melhorar.<br />A ferramenta vem depois.</p></div>
      <div className="service-grid">{services.map((s, i) => <MotionReveal key={s.label} delay={i * .08}><article className="service-card">
        <div className="service-art"><img className="service-backdrop" src={[processArt, projectArt, automationArt][i]} alt="" loading="lazy" decoding="async" />
          <div className={'service-demo service-demo-' + i} aria-hidden="true">
            {i===0 && <div className="demo-workflow"><div><Check size={16}/><span>Pedido recebido</span></div><i/><div><UsersRound size={16}/><span>Responsável definido</span></div><i/><div><Check size={16}/><span>Próxima etapa</span><ArrowUpRight size={14}/></div></div>}
            {i===1 && <div className="demo-project"><div className="project-top">Do plano à entrega <span>↗</span></div><div className="project-columns"><div><span>Planejar</span><i/><i/></div><div><span>Fazer</span><i/><i/></div><div><span>Concluir</span><i><Check size={16}/></i></div></div></div>}
            {i===2 && <div className="demo-integrations"><svg viewBox="0 0 260 160"><path d="M45 40Q130 40 130 80T215 120M45 120Q130 120 130 80T215 40" fill="none" stroke="#bbecff" strokeWidth="2" /></svg><span className="integration-center"><Workflow size={30}/></span><span className="integration-a"><Database size={22}/></span><span className="integration-b"><Mail size={22}/></span><span className="integration-c"><UsersRound size={22}/></span><span className="integration-d"><Check size={22}/></span></div>}
          </div><span className="service-art-label">{s.label}</span></div>
        <div className="service-content"><h3>{s.title}</h3><p>{s.copy}</p><ul>{s.items.map(item => <li key={item}><Check size={14} />{item}</li>)}</ul>
        <a className="text-link" href="#cta-diagnostico">Quero isso na minha empresa <ArrowUpRight size={17} /></a></div>
      </article></MotionReveal>)}</div>
      <MotionReveal><a className="digital-banner" href="/sites"><div><span className="small-label">SITES & PÁGINAS DE VENDA</span><h3>Explique seu valor.<br />Facilite o próximo passo.</h3><p>Sites e páginas para apresentar seu trabalho, responder dúvidas e abrir um caminho claro até o contato.</p><span className="text-link">Conheça nossos sites e páginas <ArrowUpRight size={18} /></span></div><div className="mini-browser" aria-hidden="true"><div className="browser-chrome"><i /><i /><i /><span>seunegocio.com.br</span></div><div className="mini-content"><span>SUA MARCA</span><strong>Seu negócio.<br />Uma nova<br /><em>possibilidade.</em></strong><div className="mock-button">Vamos conversar ↗</div><div className="mini-orb" /></div></div></a></MotionReveal>
    </Container>
  </section>
);
