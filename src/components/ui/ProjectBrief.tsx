import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, ChevronDown, Sparkles } from 'lucide-react';

export const ProjectBrief: React.FC<{ digital?: boolean; requestedGoal?: string }> = ({
  digital = false,
  requestedGoal,
}) => {
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [goal, setGoal] = useState(
    requestedGoal ?? (digital ? 'Apresentar minha empresa na internet' : 'Organizar minha operação')
  );
  const [draft, setDraft] = useState({ business: '', challenge: '' });

  useEffect(() => {
    if (requestedGoal) {
      setGoal(requestedGoal);
      setSummary('');
      setCopied(false);
    }
  }, [requestedGoal]);

  return (
    <div className="brief-box w-full max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl shadow-blue-950/20 border border-slate-100 text-slate-900 transition-all">
      {!summary ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setDraft({
              business: String(data.get('business') ?? ''),
              challenge: String(data.get('challenge') ?? ''),
            });
            setSummary(
              `Meu negócio: ${data.get('business')}\nQuero: ${data.get('goal')}\nMeu desafio: ${data.get('challenge')}`
            );
          }}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-1">
              O que você quer fazer acontecer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Preencha os campos abaixo para estruturar sua ideia inicial.
            </p>
          </div>

          <div className="space-y-1.5 text-left">
            <label htmlFor="brief-business" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Seu negócio
            </label>
            <input
              id="brief-business"
              name="business"
              defaultValue={draft.business}
              placeholder="Ex.: estúdio de arquitetura, consultoria..."
              required
              maxLength={150}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none transition-all"
            />
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
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 text-sm sm:text-base outline-none transition-all appearance-none cursor-pointer pr-10"
              >
                <option value="Organizar minha operação">Organizar minha operação</option>
                <option value="Automatizar tarefas">Automatizar tarefas</option>
                <option value="Apresentar minha empresa na internet">Apresentar minha empresa na internet</option>
                <option value="Vender um produto ou serviço">Vender um produto ou serviço</option>
                <option value="Receber contatos de interessados">Receber contatos de interessados</option>
                <option value="Ainda preciso de orientação">Ainda preciso de orientação</option>
              </select>
              <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label htmlFor="brief-challenge" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Conte um pouco da sua ideia
            </label>
            <textarea
              id="brief-challenge"
              name="challenge"
              defaultValue={draft.challenge}
              placeholder="O que você oferece e quem quer alcançar? Já tem um site ou processo hoje?"
              rows={3}
              required
              maxLength={1200}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none transition-all resize-y min-h-[90px]"
            />
          </div>

          <button
            type="submit"
            className="solid-link w-full mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all group cursor-pointer"
          >
            <span>Preparar meu resumo</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <p className="form-note text-[11px] text-slate-500 text-center leading-relaxed pt-1">
            Prévia demonstrativa: nada é enviado. Você pode copiar seu resumo ao final.
          </p>
        </form>
      ) : (
        <div className="brief-result text-left space-y-4" role="status">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 tracking-tight">Sua ideia, mais clara.</h3>
              <p className="text-xs sm:text-sm text-slate-500">Ponto de partida para conversarmos sobre o projeto.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <pre className="font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {summary}
            </pre>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              className="solid-link w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                  setCopied(true);
                  setCopyError(false);
                } catch {
                  setCopyError(true);
                }
              }}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>Resumo copiado com sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar meu resumo</span>
                </>
              )}
            </button>

            {copyError && (
              <p className="text-xs text-amber-600 text-center">
                Não foi possível copiar automaticamente. Selecione e copie o texto acima manualmente.
              </p>
            )}

            <button
              type="button"
              className="text-link w-full py-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors text-center block"
              onClick={() => {
                setSummary('');
                setCopied(false);
              }}
            >
              ← Preparar outro resumo
            </button>
          </div>

          <p className="form-note text-[11px] text-slate-400 text-center leading-relaxed">
            Nenhum dado foi enviado ou armazenado.
          </p>
        </div>
      )}
    </div>
  );
};
