export type ProjectStatus = 'live' | 'in-production' | 'concept';

export interface PortfolioCategory {
  id: string;
  label: string;
}

export interface SiteProject {
  id: string;
  title: string;
  formatLine?: string;
  description: string;
  status: ProjectStatus;
  statusLabel?: string;
  /** Direct MP4/WebM file URL or path inside public/. */
  videoSrc?: string;
  posterSrc?: string;
  previewUrl?: string;
  categoryId?: string;
  /** UI-only flag, set to the project selected for the current day. */
  featured?: boolean;
  /** Explicitly identify illustrative studies. */
  isConcept?: boolean;
  placeholderVariant: 0 | 1 | 2;
  theme: 'sand' | 'coral' | 'lime' | 'blue';
}

export const portfolioCategories: PortfolioCategory[] = [
  { id: 'institutional', label: 'Sites institucionais' },
  { id: 'sales', label: 'Páginas de venda' },
  { id: 'capture', label: 'Páginas de captura' },
];

export const siteProjects: SiteProject[] = [
  {
    id: 'academia-da-fala',
    title: 'Academia da Fala',
    formatLine: 'Página de venda · aula experimental',
    description: 'Página para escola de inglês: apresenta as aulas e convida para uma aula experimental.',
    status: 'live',
    statusLabel: 'Site no ar',
    previewUrl: 'https://academiadafalaonline.com.br',
    videoSrc: '/portfolio/videos-techub/academia-da-fala.mp4',
    posterSrc: '/portfolio/videos-techub/academia-da-fala.webp',
    placeholderVariant: 0,
    theme: 'sand',
  },
  {
    id: 'barbaros-tattoo',
    title: 'Barbaros Tattoo',
    formatLine: 'Site institucional · agendamento pelo WhatsApp',
    description: 'Site para estúdio de tatuagem: portfólio por artista e um caminho direto para agendar.',
    status: 'in-production',
    statusLabel: 'Em produção',
    videoSrc: '/portfolio/videos-techub/barbaros-tattoo.mp4',
    posterSrc: '/portfolio/videos-techub/barbaros-tattoo.webp',
    placeholderVariant: 1,
    theme: 'blue',
  },
  {
    id: 'credit-black',
    title: 'CreditBlack',
    formatLine: 'Página de produto · cadastro',
    description: 'Conceito de página para fintech: explica os recursos da plataforma e leva direto ao cadastro.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/credit-black.mp4',
    posterSrc: '/portfolio/videos-techub/credit-black.webp',
    placeholderVariant: 2,
    theme: 'coral',
  },
  {
    id: 'arena-training',
    title: 'Arena Training',
    formatLine: 'Site institucional · primeira aula',
    description: 'Conceito de site para academia: modalidades, horários e estrutura em um só lugar, com convite para a primeira aula.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/arena-training.mp4',
    posterSrc: '/portfolio/videos-techub/arena-training.webp',
    placeholderVariant: 1,
    theme: 'blue',
  },
  {
    id: 'hollywood-wg',
    title: 'Hollywood WG',
    formatLine: 'Site institucional · agendamento',
    description: 'Site para barbearia: destaca serviços e profissionais e facilita o agendamento de um horário.',
    status: 'in-production',
    statusLabel: 'Em produção',
    videoSrc: '/portfolio/videos-techub/hollywood-wg.mp4',
    posterSrc: '/portfolio/videos-techub/hollywood-wg.webp',
    placeholderVariant: 2,
    theme: 'sand',
  },
  {
    id: 'linhas-e-formas',
    title: 'Linhas e Formas',
    formatLine: 'Site institucional · portfólio',
    description: 'Conceito de site para escritório de arquitetura: projetos, ambientes e seu processo de trabalho.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/linhas-e-formas.mp4',
    posterSrc: '/portfolio/videos-techub/linhas-e-formas.webp',
    placeholderVariant: 0,
    theme: 'coral',
  },
  {
    id: 'clinica-nassri',
    title: 'Clínica Nassri',
    formatLine: 'Site institucional · marcação de consulta',
    description: 'Conceito de site para clínica: áreas de atendimento e um caminho claro para marcar consulta.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/clinica-nassri.mp4',
    posterSrc: '/portfolio/videos-techub/clinica-nassri.webp',
    placeholderVariant: 2,
    theme: 'blue',
  },
  {
    id: 'pilates-ana',
    title: 'Pilates Ana',
    formatLine: 'Site institucional · aula experimental',
    description: 'Site para estúdio de pilates: apresenta a prática, sua profissional e formas de conhecer as aulas.',
    status: 'in-production',
    statusLabel: 'Em produção',
    videoSrc: '/portfolio/videos-techub/pilates-ana.mp4',
    posterSrc: '/portfolio/videos-techub/pilates-ana.webp',
    placeholderVariant: 0,
    theme: 'sand',
  },
  {
    id: 'prime-fitness',
    title: 'Prime Fitness',
    formatLine: 'Página de captura · visita ao espaço',
    description: 'Conceito de página para academia: proposta de treino e convite para conhecer o espaço.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/prime-fitness.mp4',
    posterSrc: '/portfolio/videos-techub/prime-fitness.webp',
    placeholderVariant: 1,
    theme: 'coral',
  },
  {
    id: 'vital',
    title: 'Vital',
    formatLine: 'Site institucional · saúde',
    description: 'Conceito de site de saúde: atendimentos e informações para diferentes fases da vida.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/vital.mp4',
    posterSrc: '/portfolio/videos-techub/vital.webp',
    placeholderVariant: 2,
    theme: 'lime',
  },
  {
    id: 'dayanne-costa',
    title: 'Dayanne Costa',
    formatLine: 'Site pessoal · conteúdo',
    description: 'Conceito de site profissional para personal trainer: trabalho, conteúdos de treino e bem-estar.',
    status: 'concept',
    statusLabel: 'Conceito',
    isConcept: true,
    videoSrc: '/portfolio/videos-techub/dayanne-costa.mp4',
    posterSrc: '/portfolio/videos-techub/dayanne-costa.webp',
    placeholderVariant: 1,
    theme: 'sand',
  },
  {
    id: 'rafael-setubal',
    title: 'Rafael Setúbal',
    formatLine: 'Site pessoal · portfólio criativo',
    description: 'Site pessoal para profissional criativo: apresentação e projetos selecionados.',
    status: 'live',
    statusLabel: 'Site no ar',
    previewUrl: 'https://marzcreativedesign.com',
    videoSrc: '/portfolio/videos-techub/rafael-setubal.mp4',
    posterSrc: '/portfolio/videos-techub/rafael-setubal.webp',
    placeholderVariant: 2,
    theme: 'coral',
  },
];

/** Returns a day key shared by all visitors, aligned to the audience's local calendar. */
export function getPortfolioDayKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

/** Selects one project per São Paulo calendar day; stable across reloads and visitors. */
export function getDailyFeaturedProject(projects: SiteProject[], dayKey = getPortfolioDayKey()): SiteProject | undefined {
  if (!projects.length) return undefined;
  const [year, month, day] = dayKey.split('-').map(Number);
  const dayIndex = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  return projects[((dayIndex % projects.length) + projects.length) % projects.length];
}
