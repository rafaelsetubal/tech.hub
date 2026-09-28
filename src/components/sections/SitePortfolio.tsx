import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Play, Pause, Film, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { WebsiteConcept } from '@/components/ui/WebsiteConcept';
import { getDailyFeaturedProject, getPortfolioDayKey, siteProjects, type SiteProject } from '@/data/sitePortfolio';

function previewLink(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export const ProjectPreview: React.FC<{ project: SiteProject }> = ({ project }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const pointerOver = useRef(false);
  const refreshPlayback = useRef<(() => void) | null>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [playError, setPlayError] = useState(false);
  const link = previewLink(project.previewUrl);

  useEffect(() => {
    if (!project.videoSrc || !frameRef.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setLoadVideo(true);
      return;
    }
    const near = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoadVideo(true);
        near.disconnect();
      }
    }, { rootMargin: '300px' });
    near.observe(frameRef.current);
    return () => near.disconnect();
  }, [project.videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame || !loadVideo || failed) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)');
    let visible = false;
    const syncPlayback = () => {
      const shouldPlay = hoverDevice.matches ? pointerOver.current : visible;
      if (!shouldPlay || document.hidden) video.pause();
      else if (video.paused && !userPaused.current && !reduced.matches) void video.play().catch(() => {
        // Autoplay policies vary. The manual play button remains available.
      });
    };
    refreshPlayback.current = syncPlayback;
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .45;
      syncPlayback();
    }, { threshold: .45 }) : null;
    const preferenceChanged = () => {
      if (reduced.matches) video.pause();
      else syncPlayback();
    };
    observer?.observe(frame);
    document.addEventListener('visibilitychange', syncPlayback);
    reduced.addEventListener('change', preferenceChanged);
    syncPlayback();
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reduced.removeEventListener('change', preferenceChanged);
      if (refreshPlayback.current === syncPlayback) refreshPlayback.current = null;
      video.pause();
    };
  }, [loadVideo, failed]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    setPlayError(false);
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      try { await video.play(); } catch { setPlayError(true); }
    }
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    pointerOver.current = true;
    if (!loadVideo) setLoadVideo(true);
    refreshPlayback.current?.();
  };
  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    pointerOver.current = false;
    refreshPlayback.current?.();
  };
  const handleFocus = () => {
    if (!loadVideo) setLoadVideo(true);
  };

  return <article className={'portfolio-project portfolio-theme-' + project.theme + (project.featured ? ' portfolio-featured' : '') + (project.videoSrc ? ' portfolio-has-video' : '')}>
    <div className="portfolio-stage" ref={frameRef} tabIndex={project.videoSrc ? 0 : undefined} role={project.videoSrc ? 'group' : undefined} aria-label={project.videoSrc ? 'Prévia de ' + project.title + '. Foque ou passe o cursor para ver o controle de reprodução.' : undefined} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onFocusCapture={handleFocus}>
      <div className="portfolio-stage-ring" aria-hidden="true" />
      {project.featured && <span className="portfolio-featured-ribbon"><Star size={15} fill="currentColor" aria-hidden="true"/>Destaque de hoje</span>}
      <div className="portfolio-monitor">
        <div className="portfolio-browser-bar" aria-hidden="true"><div><i/><i/><i/></div><span>{link ? new URL(link).hostname : project.title.split('.')[0]}</span><span>↗</span></div>
        <div className="portfolio-screen">
          {project.videoSrc && !failed ? <video ref={videoRef} src={loadVideo ? project.videoSrc : undefined} poster={project.posterSrc} muted loop playsInline preload="none" aria-label={'Prévia em vídeo: ' + project.title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
            : project.posterSrc && !posterFailed ? <img src={project.posterSrc} alt={'Prévia de ' + project.title} loading="lazy" onError={() => setPosterFailed(true)} />
            : <WebsiteConcept variant={project.placeholderVariant} />}
          {!project.videoSrc && <span className="portfolio-media-note"><Film size={13}/> Prévia estática</span>}
          {failed && <span className="portfolio-media-note" role="status">O vídeo não carregou.{link ? ' Abra a prévia abaixo.' : ''}</span>}
          {project.videoSrc && !failed && loadVideo && <button type="button" className="portfolio-play" onClick={togglePlayback} aria-label={(playing ? 'Pausar' : 'Reproduzir') + ' prévia de ' + project.title}>{playing ? <Pause size={16}/> : <Play size={16}/>}<span>{playing ? 'Pausar' : 'Reproduzir'}</span></button>}
        </div>
      </div>
      <div className="portfolio-monitor-base" aria-hidden="true" />
    </div>
    <div className="portfolio-project-info"><div>{project.isConcept && <span className="portfolio-concept-label">Estudo visual · marca fictícia</span>}<h3>{project.title}</h3><p>{project.description}</p>{playError && <p role="status">Não foi possível iniciar o vídeo. Tente novamente ou abra a prévia.</p>}</div>{link && <a className="portfolio-preview-link" href={link} target="_blank" rel="noopener noreferrer" aria-label={'Abrir prévia de ' + project.title + ' em nova aba'}><span>Abrir prévia</span><ArrowUpRight size={23}/></a>}</div>
  </article>;
};

export const SitePortfolio: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentDay, setCurrentDay] = useState(getPortfolioDayKey);
  const featuredProject = getDailyFeaturedProject(siteProjects, currentDay);
  const orderedProjects = featuredProject
    ? [featuredProject, ...siteProjects.filter(project => project.id !== featuredProject.id)]
    : [...siteProjects];
  const visibleProjects = showAll ? orderedProjects : orderedProjects.slice(0, 4);
  const remainingCount = orderedProjects.length - visibleProjects.length;

  useEffect(() => {
    const updateDay = () => setCurrentDay(getPortfolioDayKey());
    const interval = window.setInterval(updateDay, 60_000);
    document.addEventListener('visibilitychange', updateDay);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', updateDay);
    };
  }, []);

  if (!siteProjects.length) return null;
  return <section id="portfolio" className="site-portfolio" aria-labelledby="portfolio-title"><Container>
    <div className="portfolio-heading"><h2 id="portfolio-title">Projetos para ver<br/><span>em movimento.</span></h2></div>
    <div className="portfolio-grid" id="portfolio-projects">{visibleProjects.map(project => <ProjectPreview key={project.id} project={{...project, featured:project.id===featuredProject?.id}}/>)}</div>
    {(remainingCount > 0 || showAll) && <div className="portfolio-more"><button className="portfolio-toggle" type="button" aria-expanded={showAll} aria-controls="portfolio-projects" onClick={() => setShowAll(current => !current)}>{showAll ? 'Mostrar menos projetos' : `Ver mais ${remainingCount} projetos`}<ArrowDown size={17} aria-hidden="true" className={showAll ? 'portfolio-toggle-icon is-expanded' : 'portfolio-toggle-icon'}/></button></div>}
  </Container></section>;
};
