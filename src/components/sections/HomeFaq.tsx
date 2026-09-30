import React from 'react';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/whatsapp';

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'Para qual tamanho de empresa a Tech Hub faz sentido?',
    answer:
      'A Tech Hub foi desenhada sob medida para pequenas e médias empresas (geralmente de 5 a 50 colaboradores) que cresceram e sentiram a operação começar a travar: retrabalho, tarefas duplicadas, informações perdidas no WhatsApp ou planilhas desatualizadas. Se você precisa de método, clareza e tecnologia sem a burocracia ou o custo de uma consultoria tradicional, faz todo sentido para o seu negócio.',
  },
  {
    question: 'Quanto tempo dura uma consultoria ou projeto?',
    answer:
      'Depende da complexidade e do diagnóstico inicial. Nossos diagnósticos rápidos e intervenções pontuais costumam gerar as primeiras melhorias práticas entre 2 e 3 semanas. Projetos completos de estruturação de processos e tecnologia levam, em média, de 4 a 8 semanas, sempre com entregas semanais graduais para que a equipe sinta os ganhos imediatamente.',
  },
  {
    question: 'Minha equipe precisa parar de trabalhar durante a implantação?',
    answer:
      'De forma alguma. Nossa metodologia foi construída exatamente para se integrar à rotina real da sua empresa. Fazemos reuniões curtas, objetivas e mapeamos os fluxos no dia a dia da operação. As melhorias são implementadas de forma progressiva e acompanhada, sem interromper o atendimento a clientes ou o faturamento.',
  },
  {
    question: 'Vocês usam ferramentas proprietárias ou que já existem no mercado?',
    answer:
      'Priorizamos sempre ferramentas consolidadas e consagradas de mercado (como Notion, ClickUp, Trello, Zapier, Make, Google Workspace ou o ERP que você já utiliza) ou desenvolvemos soluções sob medida quando necessário. O nosso objetivo central é que sua empresa conquiste autonomia operacional e nunca fique dependente ou refém da Tech Hub após a entrega.',
  },
  {
    question: 'Como funciona o investimento e a contratação?',
    answer:
      'Trabalhamos com proposta de escopo fechado e total transparência. Após o alinhamento e o diagnóstico inicial, apresentamos um plano detalhado com objetivos, etapas, prazos e investimento fixo — sem surpresas, letras miúdas ou cobranças ocultas ao longo do caminho.',
  },
];

export const HomeFaq: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="editorial-section faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <MotionReveal>
          <div className="faq-grid">
            {/* Coluna da Esquerda: Chamada e Suporte */}
            <div className="faq-intro">
              <span className="case-client">Tire suas dúvidas</span>
              <h2 className="editorial-title">
                Perguntas<br />
                <span>frequentes.</span>
              </h2>
              <p className="mt-4 text-[#65738a] text-[15px] leading-relaxed">
                Respostas diretas sobre como trabalhamos, prazos, integração de ferramentas e investimento para PMEs.
              </p>

              <div className="mt-8 pt-6 border-t border-[#dbe3ef]">
                <p className="text-xs uppercase font-semibold tracking-wider text-[#65738a] mb-3">
                  Ainda tem alguma dúvida específica?
                </p>
                <a
                  className="text-link inline-flex items-center gap-2 font-medium"
                  href={whatsappLink('duvida')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tirar dúvidas diretamente pelo WhatsApp"
                >
                  <MessageCircle size={16} className="text-[#2563EB]" />
                  Falar direto no WhatsApp <ArrowUpRight size={17} />
                </a>
              </div>
            </div>

            {/* Coluna da Direita: Accordion */}
            <div className="faq-list">
              {HOME_FAQS.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>
                    <span>{faq.question}</span>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
};
