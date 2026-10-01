import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, Images, MessageCircle } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const answers = [
  { question: '“O que essa empresa faz?”', answer: 'Uma explicação clara da oferta.', href: '#formatos', icon: BriefcaseBusiness },
  { question: '“Serve para o que eu preciso?”', answer: 'Serviços, projetos e diferenciais no mesmo lugar.', href: '#portfolio', icon: Images },
  { question: '“Como posso começar?”', answer: 'Um jeito fácil de entrar em contato.', href: '#seu-projeto', icon: MessageCircle },
];

export const SiteValue: React.FC = () => <section className="site-answers"><Container>
  <div className="answers-heading"><h2>Seu cliente<br/>tem perguntas.<br/><span>Seu site responde.</span></h2><p>Reúna o que hoje está espalhado.<br/>Facilite a escolha e o contato.</p></div>
  <div className="answers-stack">{answers.map(({question,answer,href,icon:Icon})=><a key={href} href={href} className="answer-card"><span className="answer-icon" aria-hidden="true"><Icon size={24}/></span><div><span className="answer-question">{question}</span><h3>{answer}</h3></div><ArrowUpRight className="answer-arrow" size={21} aria-hidden="true"/></a>)}</div>
</Container></section>;
