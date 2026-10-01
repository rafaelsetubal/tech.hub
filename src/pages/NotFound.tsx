import React, { useEffect } from 'react';
import '@/styles/not-found.css';
import { ArrowRight, House } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export const NotFound: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = robots?.content;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const previousOgTitle = ogTitle?.content;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousOgDescription = ogDescription?.content;
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const previousTwitterTitle = twitterTitle?.content;
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const previousTwitterDescription = twitterDescription?.content;

    document.title = 'Página não encontrada | Tech Hub';
    const summary = 'Não encontramos este endereço. Volte para a página inicial ou fale com a Tech Hub para seguir em frente.';
    if (description) description.content = summary;
    if (robots) robots.content = 'noindex,follow';
    if (ogTitle) ogTitle.content = 'Página não encontrada | Tech Hub';
    if (ogDescription) ogDescription.content = summary;
    if (twitterTitle) twitterTitle.content = 'Página não encontrada | Tech Hub';
    if (twitterDescription) twitterDescription.content = summary;

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
      if (robots && previousRobots !== undefined) robots.content = previousRobots;
      if (ogTitle && previousOgTitle !== undefined) ogTitle.content = previousOgTitle;
      if (ogDescription && previousOgDescription !== undefined) ogDescription.content = previousOgDescription;
      if (twitterTitle && previousTwitterTitle !== undefined) twitterTitle.content = previousTwitterTitle;
      if (twitterDescription && previousTwitterDescription !== undefined) twitterDescription.content = previousTwitterDescription;
    };
  }, []);

  return <>
    <Navbar page="notFound" />
    <main id="main-content" className="not-found-page" tabIndex={-1}>
      <section className="not-found-content" aria-labelledby="not-found-title">
        <div className="not-found-art">
          <img
            src="/404-illustration.webp"
            alt="Ilustração de formas quebradas representando uma página não encontrada"
            width="1280"
            height="1280"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="not-found-copy">
          <span className="not-found-code">404</span>
          <h1 id="not-found-title">Não achamos<br/><span>essa página.</span></h1>
          <p>O endereço pode ter mudado. Conte com a gente para encontrar o que você procura.</p>
        </div>
        <div className="not-found-actions">
          <a className="shared-nav-cta not-found-cta" href="/#cta-diagnostico">
            Conversar com a Tech Hub <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="not-found-cta-secondary" href="/">
            <House size={17} aria-hidden="true" /> Voltar para home
          </a>
        </div>
      </section>
    </main>
  </>;
};
