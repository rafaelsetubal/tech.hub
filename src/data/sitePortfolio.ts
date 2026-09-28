export interface PortfolioCategory {
  id: string;
  label: string;
}

export interface SiteProject {
  id: string;
  title: string;
  description: string;
  /** Direct MP4/WebM file URL or a path inside public/. Not a YouTube page. */
  videoSrc?: string;
  posterSrc?: string;
  previewUrl?: string;
  categoryId?: string;
  /** UI-only flag, set to the project selected for the current day. */
  featured?: boolean;
  /** Explicitly identify illustrative studies until real projects are added. */
  isConcept?: boolean;
  placeholderVariant: 0 | 1 | 2;
  theme: 'sand' | 'coral' | 'lime' | 'blue';
}

// Reserved for future filtering. Categories are not displayed in the UI yet.
export const portfolioCategories: PortfolioCategory[] = [
  { id: 'institutional', label: 'Sites institucionais' },
  { id: 'sales', label: 'Páginas de venda' },
  { id: 'capture', label: 'Páginas de captura' },
];

// Add optimized media to public/portfolio/videos-techub/ and edit the paths here.
// Example: videoSrc: '/portfolio/videos-techub/meu-projeto.mp4',
//          posterSrc: '/portfolio/videos-techub/meu-projeto.webp',
//          previewUrl: 'https://preview.example.com'
// Use one project record per preview. Categories remain optional until you decide
// how visitors should browse the portfolio.
export const siteProjects: SiteProject[] = [
  {
    id: 'academia-da-fala',
    title: 'Academia da Fala',
    description: 'Uma página para apresentar aulas de inglês e convidar quem quer se comunicar com mais confiança.',
    videoSrc: '/portfolio/videos-techub/academia-da-fala.mp4',
    posterSrc: '/portfolio/videos-techub/academia-da-fala.webp',
    placeholderVariant: 0,
    theme: 'sand',
  },
  {
    id: 'barbaros-tattoo',
    title: 'Barbaros Tattoo',
    description: 'Um estúdio de tatuagem apresentado pelo trabalho, pelos artistas e por um caminho direto para agendar.',
    videoSrc: '/portfolio/videos-techub/barbaros-tattoo.mp4',
    posterSrc: '/portfolio/videos-techub/barbaros-tattoo.webp',
    placeholderVariant: 1,
    theme: 'blue',
  },
  {
    id: 'credit-black',
    title: 'CreditBlack',
    description: 'Uma plataforma financeira com foco em transações digitais, recursos do produto e acesso à solução.',
    videoSrc: '/portfolio/videos-techub/credit-black.mp4',
    posterSrc: '/portfolio/videos-techub/credit-black.webp',
    placeholderVariant: 2,
    theme: 'coral',
  },
  {
    id: 'arena-training',
    title: 'Arena Training',
    description: 'Uma academia apresenta modalidades, horários e estrutura para quem quer começar a treinar.',
    videoSrc: '/portfolio/videos-techub/arena-training.mp4',
    posterSrc: '/portfolio/videos-techub/arena-training.webp',
    placeholderVariant: 1,
    theme: 'blue',
  },
  {
    id: 'hollywood-wg',
    title: 'Hollywood WG',
    description: 'Uma barbearia destaca serviços e profissionais e facilita o agendamento de um horário.',
    videoSrc: '/portfolio/videos-techub/hollywood-wg.mp4',
    posterSrc: '/portfolio/videos-techub/hollywood-wg.webp',
    placeholderVariant: 2,
    theme: 'sand',
  },
  {
    id: 'linhas-e-formas',
    title: 'Linhas e Formas',
    description: 'Um escritório de arquitetura apresenta projetos, ambientes e seu processo de trabalho.',
    videoSrc: '/portfolio/videos-techub/linhas-e-formas.mp4',
    posterSrc: '/portfolio/videos-techub/linhas-e-formas.webp',
    placeholderVariant: 0,
    theme: 'coral',
  },
  {
    id: 'clinica-nassri',
    title: 'Clínica Nassri',
    description: 'Uma clínica apresenta suas áreas de atendimento e ajuda pacientes a encontrar o próximo passo.',
    videoSrc: '/portfolio/videos-techub/clinica-nassri.mp4',
    posterSrc: '/portfolio/videos-techub/clinica-nassri.webp',
    placeholderVariant: 2,
    theme: 'blue',
  },
  {
    id: 'pilates-ana',
    title: 'Pilates Ana',
    description: 'Um estúdio de pilates apresenta a prática, sua profissional e formas de conhecer as aulas.',
    videoSrc: '/portfolio/videos-techub/pilates-ana.mp4',
    posterSrc: '/portfolio/videos-techub/pilates-ana.webp',
    placeholderVariant: 0,
    theme: 'sand',
  },
  {
    id: 'prime-fitness',
    title: 'Prime Fitness',
    description: 'Uma academia apresenta sua proposta de treino e convida novos alunos a conhecer o espaço.',
    videoSrc: '/portfolio/videos-techub/prime-fitness.mp4',
    posterSrc: '/portfolio/videos-techub/prime-fitness.webp',
    placeholderVariant: 1,
    theme: 'coral',
  },
  {
    id: 'vital',
    title: 'Vital',
    description: 'Uma página de saúde apresenta os atendimentos e informações para diferentes fases da vida.',
    videoSrc: '/portfolio/videos-techub/vital.mp4',
    posterSrc: '/portfolio/videos-techub/vital.webp',
    placeholderVariant: 2,
    theme: 'lime',
  },
  {
    id: 'dayanne-costa',
    title: 'Dayanne Costa',
    description: 'Uma presença profissional para apresentar o trabalho de Dayanne e seus conteúdos de treino e bem-estar.',
    videoSrc: '/portfolio/videos-techub/dayanne-costa.mp4',
    posterSrc: '/portfolio/videos-techub/dayanne-costa.webp',
    placeholderVariant: 1,
    theme: 'sand',
  },
  {
    id: 'rafael-setubal',
    title: 'Rafael Setúbal',
    description: 'Um site profissional com apresentação pessoal e espaço para destacar projetos selecionados.',
    videoSrc: '/portfolio/videos-techub/rafael-setubal.mp4',
    posterSrc: '/portfolio/videos-techub/rafael-setubal.webp',
    placeholderVariant: 2,
    theme: 'coral',
  },
  {
    id: 'widestep',
    title: 'WideStep',
    description: 'Uma página de oferta apresenta a proposta, seus benefícios e o caminho para conhecer ou contratar.',
    videoSrc: '/portfolio/videos-techub/widestep.mp4',
    posterSrc: '/portfolio/videos-techub/widestep.webp',
    placeholderVariant: 0,
    theme: 'lime',
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
