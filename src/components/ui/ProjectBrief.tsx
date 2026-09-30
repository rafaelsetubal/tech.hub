import React, { useEffect, useState } from 'react';
import { Send, CheckCircle2, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/whatsapp';

export const ProjectBrief: React.FC<{ digital?: boolean; requestedGoal?: string }> = ({
  digital = false,
  requestedGoal,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [goal, setGoal] = useState(
    requestedGoal ?? (digital ? 'Apresentar minha empresa na internet' : 'Organizar minha operação')
  );
  const [formData, setFormData] = useState({
    business: '',
    contact: '',
    challenge: '',
  });

  useEffect(() => {
    if (requestedGoal) {
      setGoal(requestedGoal);
      setSubmitted(false);
    }
  }, [requestedGoal]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(null);
    const data = new FormData(event.currentTarget);
    const business = String(data.get('business') ?? '').trim();
    const contact = String(data.get('contact') ?? '').trim();
    const challenge = String(data.get('challenge') ?? '').trim();

    setFormData({ business, contact, challenge });
    setSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business,
          contact,
          goal,
          challenge,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Falha ao processar envio.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Erro ao enviar contato:', err);
      setSendError(
        'Não foi possível completar o envio por e-mail no momento. Você pode enviar sua mensagem diretamente pelo WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = `Olá, Tech Hub! Gostaria de conversar sobre um projeto.\n\n*Nome/Negócio:* ${formData.business}\n*Contato:* ${formData.contact}\n*Objetivo:* ${goal}\n*Desafio:* ${formData.challenge}`;

  return (
    <div className="brief-box w-full max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl shadow-blue-950/20 border border-slate-100 text-slate-900 transition-all">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-1">
              Vamos conversar sobre o seu projeto?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Conte sobre o seu negócio e o que você precisa resolver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5 text-left">
              <label htmlFor="brief-business" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Seu nome ou negócio
              </label>
              <input
                id="brief-business"
                name="business"
                defaultValue={formData.business}
                placeholder="Ex.: Rafael / Estúdio XYZ"
                required
                maxLength={120}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="brief-contact" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                WhatsApp ou E-mail
              </label>
              <input
                id="brief-contact"
                name="contact"
                defaultValue={formData.contact}
                placeholder="Ex.: (11) 99999-9999"
                required
                maxLength={120}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label htmlFor="brief-goal" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Seu objetivo principal
            </label>
            <div className="relative">
              <select
                id="brief-goal"
                name="goal"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 text-sm outline-none transition-all appearance-none cursor-pointer pr-10"
              >
                <option value="Apresentar minha empresa na internet">Apresentar minha empresa na internet</option>
                <option value="Vender um produto ou serviço">Vender um produto ou serviço</option>
                <option value="Receber contatos de interessados">Receber contatos de interessados</option>
                <option value="Organizar minha operação">Organizar minha operação</option>
                <option value="Automatizar tarefas">Automatizar tarefas</option>
                <option value="Ainda preciso de orientação">Ainda preciso de orientação</option>
              </select>
              <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label htmlFor="brief-challenge" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Como podemos ajudar?
            </label>
            <textarea
              id="brief-challenge"
              name="challenge"
              defaultValue={formData.challenge}
              placeholder="Conte resumidamente o que você precisa ou qual é o seu principal desafio hoje..."
              rows={3}
              required
              maxLength={1200}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all resize-y min-h-[85px]"
            />
          </div>

          {sendError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left space-y-1.5">
              <p className="font-semibold text-amber-950">Aviso sobre o envio:</p>
              <p>{sendError}</p>
              <a
                href={whatsappLink('orcamento', whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline pt-1"
              >
                <span>Enviar pelo WhatsApp agora ({WHATSAPP_DISPLAY}) ↗</span>
              </a>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="solid-link w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 disabled:cursor-not-allowed text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all group cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Enviando solicitação...</span>
                </>
              ) : (
                <>
                  <span>Enviar mensagem</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <div className="flex flex-col items-center justify-center gap-1.5 pt-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Respondemos em até 24 horas</span>
              </div>
              <a
                href={whatsappLink('geral')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline pt-1 inline-flex items-center gap-1"
              >
                <span>Ou fale direto pelo WhatsApp: {WHATSAPP_DISPLAY} ↗</span>
              </a>
            </div>
          </div>
        </form>
      ) : (
        <div className="brief-result text-center py-5 space-y-6" role="status">
          {/* Animated Success Badge */}
          <div className="relative mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/10 border border-emerald-100">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping" />
            <CheckCircle2 className="w-9 h-9 relative z-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-xs font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Solicitação Confirmada
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Muito obrigado! Mensagem enviada com sucesso!
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              {formData.business ? <strong>{formData.business}</strong> : 'Recebemos seu contato'}. Já estamos analisando seu cenário e retornaremos em até <strong>24 horas úteis</strong>.
            </p>
          </div>

          {/* Dados enviados */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs sm:text-sm text-slate-700 space-y-2 max-w-md mx-auto shadow-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              <span>Resumo do envio</span>
              <span className="text-emerald-600 font-semibold">● Entregue</span>
            </div>
            <p><strong>Nome / Negócio:</strong> {formData.business}</p>
            <p><strong>Contato:</strong> {formData.contact}</p>
            <p><strong>Objetivo:</strong> {goal}</p>
          </div>

          <div className="space-y-3 pt-2 max-w-md mx-auto">
            <p className="text-xs text-slate-500">
              Quer uma resposta ainda mais rápida ou mandar mais detalhes?
            </p>
            <a
              href={whatsappLink('geral', whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-link w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all group"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Falar agora no WhatsApp ({WHATSAPP_DISPLAY})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              className="text-link w-full py-2.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors text-center block cursor-pointer"
              onClick={() => {
                setSubmitted(false);
                setSendError(null);
              }}
            >
              ← Enviar outra mensagem ou alterar dados
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
