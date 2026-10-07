export const WHATSAPP_NUMBER = '553171306771';
export const WHATSAPP_DISPLAY = '(31) 7130-6771';

export type WhatsAppTopic =
  | 'geral'
  | 'consultoria'
  | 'sites'
  | 'duvida'
  | 'processos'
  | 'projetos'
  | 'automacao'
  | 'orcamento';

const MENSAGENS: Record<WhatsAppTopic, string> = {
  geral: 'Olá, Tech Hub! Vim pelo site e queria conversar.',
  consultoria: 'Olá, Tech Hub! Quero conversar sobre como organizar a operação da minha empresa.',
  sites: 'Olá, Tech Hub! Quero conversar sobre um site para o meu negócio.',
  duvida: 'Olá, Tech Hub! Fiquei com uma dúvida sobre os projetos e serviços.',
  processos: 'Olá, Tech Hub! Quero conversar sobre organização de processos.',
  projetos: 'Olá, Tech Hub! Quero conversar sobre gestão de projetos.',
  automacao: 'Olá, Tech Hub! Quero conversar sobre automação e integração de ferramentas.',
  orcamento: 'Olá, Tech Hub! Gostaria de pedir um orçamento para o meu projeto.',
};

export function whatsappLink(topic: WhatsAppTopic = 'geral', customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? MENSAGENS[topic] ?? MENSAGENS.geral);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
