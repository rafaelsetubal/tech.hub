import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

export const ProjectBrief: React.FC<{ digital?: boolean; requestedGoal?: string }> = ({ digital = false, requestedGoal }) => {
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [goal,setGoal]=useState(requestedGoal??(digital?'Apresentar minha empresa na internet':'Organizar minha operação'));
  const [draft,setDraft]=useState({business:'',challenge:''});
  useEffect(()=>{if(requestedGoal){setGoal(requestedGoal);setSummary('');setCopied(false);}},[requestedGoal]);
  return <div className="brief-box">
    {!summary ? <form onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setDraft({business:String(data.get('business')??''),challenge:String(data.get('challenge')??'')});
      setSummary(`Meu negócio: ${data.get('business')}\nQuero: ${data.get('goal')}\nMeu desafio: ${data.get('challenge')}`);
    }}>
      
      <h3>O que você quer fazer acontecer?</h3>
      <label>Seu negócio<input name="business" defaultValue={draft.business} placeholder="Ex.: estúdio de arquitetura" required maxLength={150} /></label>
      <label>Seu objetivo<select name="goal" value={goal} onChange={event=>setGoal(event.target.value)}>
        <option>Organizar minha operação</option><option>Automatizar tarefas</option><option>Apresentar minha empresa na internet</option><option>Vender um produto ou serviço</option><option>Receber contatos de interessados</option><option>Ainda preciso de orientação</option>
      </select></label>
      <label>Conte um pouco da sua ideia<textarea name="challenge" defaultValue={draft.challenge} placeholder="O que você oferece e quem quer alcançar? Já tem um site?" rows={3} required maxLength={1200} /></label>
      <button className="solid-link" type="submit">Preparar meu resumo <ArrowUpRight size={18} /></button>
      <p className="form-note">Prévia demonstrativa: nada é enviado. Você pode copiar seu resumo ao final.</p>
    </form> : <div className="brief-result" role="status"><Check size={30} /><h3>Sua ideia, mais clara.</h3><p>Este é o ponto de partida para conversar sobre o projeto.</p><pre>{summary}</pre><button type="button" className="solid-link" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }}>{copied ? 'Resumo copiado' : 'Copiar meu resumo'} <Copy size={16} /></button>{copyError && <p>Selecione e copie o texto acima manualmente.</p>}<button className="text-link" type="button" onClick={() => { setSummary(''); setCopied(false); }}>Preparar outro resumo</button><p className="form-note">Nenhum dado foi enviado ou armazenado.</p></div>}
  </div>;
};
