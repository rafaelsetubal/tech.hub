import React, { useEffect, useState } from 'react';
import { Send, CheckCircle2, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';

export const ProjectBrief: React.FC<{ digital?: boolean; requestedGoal?: string }> = ({
  digital = false,
  requestedGoal,
}) => {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const business = String(data.get('business') ?? '');
    const contact = String(data.get('contact') ?? '');
    const challenge = String(data.get('challenge') ?? '');

    setFormData({ business, contact, challenge });
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá Tech Hub! Gostaria de conversar sobre um projeto.\n\n*Nome/Negócio:* ${formData.business}\n*Contato:* ${formData.contact}\n*Objetivo:* ${goal}\n*Ideia:* ${formData.challenge}`
  );

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

          <div className="pt-2">
            <button
              type="submit"
              className="solid-link w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all group cursor-pointer"
            >
              <span>Enviar mensagem</span>
              <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="flex items-center justify-center gap-2 pt-3 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Respondemos em até 24 horas</span>
            </div>
          </div>
        </form>
      ) : (
        <div className="brief-result text-center py-4 space-y-5" role="status">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-1">
              Mensagem enviada com sucesso!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Recebemos suas informações. Nossa equipe entrará em contato em até <strong>24 horas</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs sm:text-sm text-slate-700 space-y-1 max-w-md mx-auto">
            <p><strong>Negócio:</strong> {formData.business}</p>
            <p><strong>Contato:</strong> {formData.contact}</p>
            <p><strong>Objetivo:</strong> {goal}</p>
          </div>

          <div className="space-y-3 pt-2 max-w-md mx-auto">
            <a
              href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="solid-link w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Conversar pelo WhatsApp agora</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              className="text-link w-full py-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors text-center block cursor-pointer"
              onClick={() => setSubmitted(false)}
            >
              Enviar outra mensagem
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
