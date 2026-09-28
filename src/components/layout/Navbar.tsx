import React, { useEffect, useId, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC<{ page?: 'home' | 'sites' | 'notFound' }> = ({ page = 'home' }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(page === 'sites' ? 'sites-inicio' : page === 'home' ? 'hero' : '');
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const panelId = 'mobile-navigation-' + useId().replace(/:/g, '');
  const links = page === 'sites' ? [
    { id:'sites-inicio', label:'Início', href:'#sites-inicio' },
    { id:'portfolio', label:'Portfólio', href:'#portfolio' },
    { id:'formatos', label:'Formatos', href:'#formatos' },
    { id:'como-criamos', label:'Como criamos', href:'#como-criamos' },
    { id:'acompanhamento', label:'Acompanhamento', href:'#acompanhamento' },
    { id:'home', label:'Tech Hub', href:'/' },
  ] : page === 'notFound' ? [
    { id:'hero', label:'Início', href:'/#hero' },
    { id:'servicos', label:'Soluções', href:'/#servicos' },
    { id:'conteudo', label:'Como funciona', href:'/#conteudo' },
    { id:'projetos', label:'Projetos', href:'/#projetos' },
    { id:'sobre', label:'Sobre', href:'/#sobre' },
    { id:'sites', label:'Sites & páginas', href:'/sites' },
  ] : [
    { id:'hero', label:'Início', href:'#hero' },
    { id:'servicos', label:'Soluções', href:'#servicos' },
    { id:'conteudo', label:'Como funciona', href:'#conteudo' },
    { id:'projetos', label:'Projetos', href:'#projetos' },
    { id:'sobre', label:'Sobre', href:'#sobre' },
    { id:'sites', label:'Sites & páginas', href:'/sites' },
  ];
  const contact = page === 'sites' ? '#seu-projeto' : page === 'notFound' ? '/#cta-diagnostico' : '#cta-diagnostico';

  useEffect(() => {
    const update = () => {
      const current = links.filter(link => link.href.startsWith('#')).find(link => {
        const rect = document.getElementById(link.id)?.getBoundingClientRect();
        return rect && rect.top <= 180 && rect.bottom > 180;
      });
      setActive(current?.id ?? '');
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
    return () => window.removeEventListener('scroll', update);
  }, [page]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, []);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const focusOutside = (event: FocusEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', focusOutside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', focusOutside);
    };
  }, [open]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    setOpen(false);
    if (!href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    // Move keyboard focus with the viewport, rather than leaving it in a hidden menu.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
    window.history.pushState(null, '', href);
  };

  return <header className="shared-header" ref={header}>
    <a className="skip-content" href="#main-content">Pular para o conteúdo</a>
    <div className="shared-nav-bar">
      <Logo/>
      <nav className="shared-desktop-nav" aria-label="Navegação principal">{links.map(link=><a key={link.id} href={link.href} aria-current={active===link.id?(link.id==='sites'?'page':'location'):undefined} onClick={event=>navigate(event,link.href)}>{link.label}</a>)}</nav>
      <div className="shared-nav-actions"><a className="shared-nav-cta" href={contact} onClick={event=>navigate(event,contact)}>Conversar agora <ArrowRight size={16}/></a>
        <button className="shared-menu-toggle" ref={toggle} type="button" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(value=>!value)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
      </div>
    </div>
    <nav className="shared-mobile-nav" id={panelId} ref={panel} aria-label="Navegação mobile" hidden={!open}>
      {links.map(link=><a key={link.id} href={link.href} aria-current={active===link.id?(link.id==='sites'?'page':'location'):undefined} onClick={event=>navigate(event,link.href)}>{link.label}<ArrowRight size={18}/></a>)}
      <a className="shared-mobile-cta" href={contact} onClick={event=>navigate(event,contact)}>Conversar agora <ArrowRight size={18}/></a>
    </nav>
  </header>;
};
