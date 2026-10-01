import React, { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

export const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = 'Política de Privacidade | Tech Hub';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#081220] selection:bg-brand-sky selection:text-night antialiased">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <Container size="default">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Header */}
            <div className="border-b border-slate-200/80 pb-8">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline mb-6"
              >
                <ArrowLeft size={15} />
                <span>Voltar para o início</span>
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
                <ShieldCheck size={15} />
                <span>Transparência e LGPD</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 m-0">
                Política de Privacidade
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Nós valorizamos a sua privacidade e tratamos seus dados pessoais com respeito e total clareza, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">1. Quem somos</h2>
                <p>
                  A <strong>Tech Hub</strong> é operada sob o CNPJ <strong>53.344.679/0001-00</strong>, com sede em Belo Horizonte/MG e atendimento a empresas de todo o Brasil. Nosso e-mail oficial para contato e dúvidas sobre privacidade é{' '}
                  <a href="mailto:contato@techhubvision.com.br" className="text-blue-600 underline font-medium">
                    contato@techhubvision.com.br
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">2. Quais dados coletamos</h2>
                <p>
                  Coletamos apenas as informações que você nos fornece voluntariamente ao solicitar um orçamento ou entrar em contato pelo site:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Seu nome ou nome da empresa;</li>
                  <li>E-mail e número de WhatsApp / telefone;</li>
                  <li>Objetivo do projeto, prazos e mensagem descritiva do desafio operacional ou do site;</li>
                  <li>Dados técnicos anônimos de navegação para aprimoramento da experiência (caso você permita cookies de análise).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">3. Para que usamos seus dados</h2>
                <p>
                  As informações enviadas são utilizadas exclusivamente para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Compreender o seu contexto de negócio e responder ao seu pedido de orçamento;</li>
                  <li>Agendar conversas de alinhamento e elaborar propostas comerciais sob medida;</li>
                  <li>Prestar o atendimento solicitado sem spam ou envio de propaganda não autorizada.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">4. Com quem compartilhamos</h2>
                <p>
                  <strong>Nunca vendemos, alugamos ou comercializamos seus dados com terceiros.</strong> Seus dados são processados apenas por ferramentas de infraestrutura necessárias para a prestação do serviço (como nosso provedor de entrega de e-mails transacionais e hospedagem em nuvem com criptografia).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">5. Por quanto tempo guardamos</h2>
                <p>
                  Mantemos os dados pelo período necessário para responder à sua solicitação, conduzir a relação comercial ou cumprir prazos legais aplicáveis. Caso você opte por não fechar projeto com a Tech Hub, seus dados cadastrais podem ser excluídos a qualquer momento mediante solicitação.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">6. Seus direitos (LGPD)</h2>
                <p>
                  Você tem o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a exclusão definitiva de seus dados de nossa base de contatos.
                </p>
                <p className="pt-2">
                  Para exercer qualquer desses direitos, basta enviar uma mensagem direta para{' '}
                  <a
                    href="mailto:contato@techhubvision.com.br"
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold underline"
                  >
                    <Mail size={15} />
                    <span>contato@techhubvision.com.br</span>
                  </a>
                  . Responderemos à sua solicitação prontamente.
                </p>
              </section>
            </div>

            <div className="pt-6 border-t border-slate-200 text-xs text-slate-400">
              Última atualização: Setembro de 2026 · Tech Hub
            </div>
          </div>
        </Container>
      </main>

      <Footer page="home" />
    </div>
  );
};
export default Privacy;
