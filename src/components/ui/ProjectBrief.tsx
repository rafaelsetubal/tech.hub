import React, { useEffect, useState } from 'react';
import { Send, CheckCircle2, ChevronDown, MessageSquare, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/whatsapp';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export interface ProjectBriefProps {
  pagina?: 'home' | 'sites';
  digital?: boolean;
  requestedGoal?: string;
  servicoInicial?: string;
}

export const ProjectBrief: React.FC<ProjectBriefProps> = ({
  pagina = 'home',
  digital = false,
  requestedGoal,
  servicoInicial,
}) => {
  const isSites = pagina === 'sites' || digital;

  const serviceOptions = isSites
    ? [
        'Site institucional',
        'Página de venda',
        'Página de captura',
        'Organizar processos',
        'Gestão de projetos',
        'Automação e integração',
        'Ainda não sei',
      ]
    : [
        'Organizar processos',
        'Gestão de projetos',
        'Automação e integração',
        'Site institucional',
        'Página de venda',
        'Página de captura',
        'Ainda não sei',
      ];

  const defaultService =
    servicoInicial ||
    requestedGoal ||
    (isSites ? 'Apresentar minha empresa na internet' : 'Organizar minha operação');

  const [servico, setServico] = useState(defaultService);
  const [temSite, setTemSite] = useState<'Tenho site' | 'Tenho só o domínio' | 'Ainda não tenho' | ''>('');
  const [prazo, setPrazo] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    email: '',
    mensagem: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    if (requestedGoal) {
      setServico(requestedGoal);
      setSubmitted(false);
    }
  }, [requestedGoal]);

  const isSiteType =
    ['Site institucional', 'Página de venda', 'Página de captura'].includes(servico) ||
    servico.includes('Apresentar minha empresa') ||
    servico.includes('Vender um produto') ||
    servico.includes('Receber contatos');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const nomeVal = String(data.get('nome') || data.get('business') || '').trim();
    const empresaVal = String(data.get('empresa') || '').trim();
    const whatsappVal = String(data.get('whatsapp') || data.get('contact') || '').trim();
    const emailVal = String(data.get('email') || '').trim();
    const msgVal = String(data.get('challenge') || data.get('mensagem') || '').trim();
    const hp = String(data.get('empresa_site') || '').trim();

    setFormData({
      nome: nomeVal,
      empresa: empresaVal,
      whatsapp: whatsappVal,
      email: emailVal,
      mensagem: msgVal,
    });

    if (!nomeVal) {
      setSendError('Por favor, informe seu nome.');
      return;
    }
    if (!whatsappVal && !emailVal) {
      setSendError('Por favor, informe seu WhatsApp ou E-mail para retorno.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nomeVal,
          empresa: empresaVal,
          whatsapp: whatsappVal,
          email: emailVal,
          servico,
          tem_site: isSiteType ? temSite : '',
          prazo,
          mensagem: msgVal,
          empresa_site: hp,
          pagina: isSites ? 'sites' : 'home',
          business: empresaVal ? `${nomeVal} (${empresaVal})` : nomeVal,
          contact: whatsappVal || emailVal,
          goal: servico,
          challenge: msgVal,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Servidor retornou status ${response.status}`);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Erro ao enviar contato:', err);
      const detail = err?.message ? ` Detalhes: ${err.message}.` : '';
      setSendError(
        `Não conseguimos enviar agora.${detail} Tente de novo em instantes ou fale com a gente pelo WhatsApp.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = `Olá, Tech Hub! Vim pelo site e gostaria de um orçamento.\n\n*Nome:* ${formData.nome}\n${formData.empresa ? `*Empresa:* ${formData.empresa}\n` : ''}*Contato:* ${formData.whatsapp || formData.email}\n*Serviço:* ${servico}\n${temSite ? `*Já tem site:* ${temSite}\n` : ''}${prazo ? `*Prazo:* ${prazo}\n` : ''}*Mensagem:* ${formData.mensagem}`;

  return (
    <div id="orcamento" className="brief-section-wrapper w-full max-w-5xl mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Budget Form (Col 1-8 on desktop) */}
        <div className="lg:col-span-8 brief-box w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl shadow-blue-950/15 border border-slate-200/90 text-slate-900 transition-all">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="empresa_site_hp">Deixe em branco</label>
                <input
                  id="empresa_site_hp"
                  name="empresa_site"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Form Heading & Subtitle */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                  {isSites ? 'PROPOSTA SOB MEDIDA' : 'DIAGNÓSTICO & ORÇAMENTO'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                  {isSites ? 'Peça seu orçamento' : 'Conte o que está travando'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {isSites
                    ? 'Quanto mais você contar, mais precisa fica a proposta. Leva uns 2 minutos.'
                    : 'Com essas informações, a gente já chega na primeira conversa entendendo o seu contexto.'}
                </p>
              </div>

              {/* 1. Nome & 2. Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="brief-nome" className="block text-xs font-semibold text-slate-700">
                    Seu nome ou negócio <span className="text-blue-600">*</span>
                  </label>
                  <input
                    id="brief-nome"
                    name="nome"
                    defaultValue={formData.nome}
                    placeholder="Ex.: Ana Souza / Estúdio XYZ"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-600 text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="brief-empresa" className="block text-xs font-semibold text-slate-700">
                    Empresa ou negócio <span className="text-slate-600 font-normal">(opcional)</span>
                  </label>
                  <input
                    id="brief-empresa"
                    name="empresa"
                    defaultValue={formData.empresa}
                    placeholder="Ex.: Estúdio Aurora"
                    maxLength={120}
                    autoComplete="organization"
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-600 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 3. WhatsApp & 4. E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="brief-whatsapp" className="block text-xs font-semibold text-slate-700">
                    WhatsApp ou E-mail <span className="text-blue-600">*</span>
                  </label>
                  <input
                    id="brief-whatsapp"
                    name="whatsapp"
                    defaultValue={formData.whatsapp}
                    onChange={(e) => {
                      if (/^[\d\s()+-]*$/.test(e.target.value)) {
                        e.target.value = formatPhone(e.target.value);
                      }
                    }}
                    placeholder="(31) 99999-9999 ou email@exemplo.com"
                    required
                    maxLength={120}
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-600 text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="brief-email" className="block text-xs font-semibold text-slate-700">
                    E-mail alternativo <span className="text-slate-600 font-normal">(opcional)</span>
                  </label>
                  <input
                    id="brief-email"
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    placeholder="ana@empresa.com.br"
                    maxLength={120}
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-600 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 5. Chips de escolha única: O que você precisa? */}
              <div className="space-y-2 text-left pt-1">
                <label htmlFor="brief-servico-select" className="block text-xs font-semibold text-slate-700">
                  Seu objetivo principal / O que você precisa <span className="text-blue-600">*</span>
                </label>
                <select
                  id="brief-servico-select"
                  aria-label="Seu objetivo principal"
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm outline-none transition-all cursor-pointer"
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                >
                  {Array.from(new Set([
                    servico,
                    ...serviceOptions,
                    'Apresentar minha empresa na internet',
                    'Vender um produto ou serviço',
                    'Receber contatos de interessados',
                    'Organizar minha operação',
                    'Automatizar tarefas',
                  ])).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2 pt-1" role="radiogroup" aria-label="O que você precisa">
                  {serviceOptions.map((opt) => {
                    const isSelected =
                      servico === opt ||
                      (opt === 'Site institucional' && servico.includes('Apresentar minha empresa')) ||
                      (opt === 'Página de venda' && servico.includes('Vender um produto')) ||
                      (opt === 'Página de captura' && servico.includes('Receber contatos')) ||
                      (opt === 'Organizar processos' && servico.includes('Organizar minha operação')) ||
                      (opt === 'Automação e integração' && servico.includes('Automatizar tarefas'));
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setServico(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs font-semibold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Você já tem site ou domínio? (Condicional se for site/venda/captura) */}
              {isSiteType && (
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-left space-y-2">
                  <label className="block text-xs font-semibold text-slate-800">
                    Você já tem site ou domínio?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {(['Tenho site', 'Tenho só o domínio', 'Ainda não tenho'] as const).map((item) => (
                      <label
                        key={item}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all border ${
                          temSite === item
                            ? 'bg-white text-blue-700 font-semibold border-blue-400 shadow-xs'
                            : 'bg-white/70 text-slate-600 hover:bg-white border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tem_site"
                          value={item}
                          checked={temSite === item}
                          onChange={() => setTemSite(item)}
                          className="accent-blue-600"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Para quando você precisa? */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="brief-prazo" className="block text-xs font-semibold text-slate-700">
                  Para quando você precisa? <span className="text-slate-600 font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <select
                    id="brief-prazo"
                    name="prazo"
                    value={prazo}
                    onChange={(e) => setPrazo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-800 text-sm outline-none transition-all appearance-none cursor-pointer pr-10"
                  >
                    <option value="">Selecione um prazo aproximado</option>
                    <option value="Nas próximas 2 semanas">Nas próximas 2 semanas</option>
                    <option value="Em até 1 mês">Em até 1 mês</option>
                    <option value="Em 1 a 3 meses">Em 1 a 3 meses</option>
                    <option value="Ainda não tenho data">Ainda não tenho data definida</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 9. Conte um pouco sobre o seu negócio e o que precisa */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="brief-mensagem" className="block text-xs font-semibold text-slate-700">
                  Como podemos ajudar? Conte um pouco sobre o seu negócio e o que precisa <span className="text-blue-600">*</span>
                </label>
                <textarea
                  id="brief-mensagem"
                  name="challenge"
                  defaultValue={formData.mensagem}
                  placeholder={
                    isSites
                      ? 'Ex.: Tenho um estúdio de pilates e quero um site para mostrar as aulas e receber agendamentos.'
                      : 'Ex.: Os pedidos chegam por WhatsApp, e-mail e planilha, e a equipe perde o que é prioridade.'
                  }
                  rows={3}
                  required
                  maxLength={1500}
                  className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 placeholder:text-slate-600 text-sm outline-none transition-all resize-y min-h-[85px]"
                />
              </div>

              {/* Error Alert */}
              {sendError && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left space-y-1.5">
                  <p className="font-semibold text-amber-950">Aviso sobre o envio:</p>
                  <p>{sendError}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="font-semibold text-blue-700 hover:underline cursor-pointer"
                    >
                      Tentar de novo
                    </button>
                    <a
                      href={whatsappLink('orcamento', whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                    >
                      <span>Falar no WhatsApp agora ({WHATSAPP_DISPLAY}) ↗</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button & Policies */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="solid-link w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 disabled:cursor-not-allowed text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all group cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando mensagem...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar mensagem / Enviar pedido</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <div className="text-center space-y-1.5 text-xs text-slate-500">
                  <p className="text-[11px] text-slate-600">
                    Usamos seus dados só para responder a este pedido. Veja nossa{' '}
                    <a href="/privacidade" className="text-slate-600 underline hover:text-blue-600">
                      política de privacidade
                    </a>
                    .
                  </p>
                  <p className="text-slate-600 font-medium pt-0.5">
                    Você recebe uma resposta em até 2 horas em horário comercial. Se fizer sentido, marcamos uma conversa e enviamos a proposta com escopo, prazo e investimento.
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className="brief-result text-center py-5 space-y-6" role="status">
              <div className="relative mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/10 border border-emerald-100">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping" />
                <CheckCircle2 className="w-9 h-9 relative z-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-block text-xs font-mono font-semibold uppercase tracking-[0.16em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Pedido Recebido
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
                  Pedido recebido, {formData.nome}! Mensagem enviada com sucesso!
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                  A gente responde em <strong>até 2 horas em horário comercial</strong> no WhatsApp ou e-mail que você informou.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs sm:text-sm text-slate-700 space-y-2 max-w-md mx-auto shadow-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  <span>Resumo do envio</span>
                  <span className="text-emerald-600 font-semibold">● Entregue</span>
                </div>
                <p><strong>Nome / Negócio:</strong> {formData.nome}</p>
                {formData.empresa && <p><strong>Empresa:</strong> {formData.empresa}</p>}
                <p><strong>Contato:</strong> {formData.whatsapp || formData.email}</p>
                <p><strong>Objetivo:</strong> {servico}</p>
                {temSite && <p><strong>Site/Domínio:</strong> {temSite}</p>}
                {prazo && <p><strong>Prazo:</strong> {prazo}</p>}
              </div>

              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <p className="text-xs text-slate-500">
                  Quer adiantar a conversa ou enviar detalhes adicionais?
                </p>
                <a
                  href={whatsappLink('orcamento', whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="solid-link w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Quer adiantar? Fale no WhatsApp ({WHATSAPP_DISPLAY})</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  className="text-link w-full py-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors text-center block cursor-pointer"
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

        {/* Secondary Column: "Prefere conversar antes?" (Col 9-12 on desktop) */}
        <div className="lg:col-span-4 w-full space-y-4">
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-blue-950/10 text-slate-900 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Canal direto</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight m-0">
                Prefere conversar antes?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Tire dúvidas direto com a gente pelo WhatsApp. Sem compromisso e sem burocracia.
              </p>
            </div>

            <a
              href={whatsappLink(isSites ? 'sites' : 'consultoria')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageCircle size={17} />
              <span>Falar no WhatsApp</span>
              <ArrowUpRight size={17} />
            </a>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <span>●</span>
              <span>Resposta em até 2 horas em horário comercial</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-950 text-xs space-y-2">
            <p className="font-semibold text-blue-900">
              {isSites ? 'Como funciona nosso processo:' : 'Atendimento consultivo e direto:'}
            </p>
            <p className="text-slate-600 leading-relaxed">
              Você fala diretamente com os fundadores da Tech Hub, sem repasses ou intermediários.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

