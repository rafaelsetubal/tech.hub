import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/whatsapp';

export const FloatingWhatsApp: React.FC<{ page?: 'home' | 'sites' }> = ({ page = 'home' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let contactInView = false;
    let scrolledPastHero = false;

    const checkVisibility = () => {
      scrolledPastHero = window.scrollY > 350;
      setVisible(scrolledPastHero && !contactInView);
    };

    const contactEl =
      document.getElementById('orcamento') ||
      document.getElementById('seu-projeto') ||
      document.getElementById('cta-diagnostico');

    let observer: IntersectionObserver | null = null;
    if (contactEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          contactInView = entry.isIntersecting;
          checkVisibility();
        },
        { threshold: 0.1 }
      );
      observer.observe(contactEl);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      observer?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Contato rápido no WhatsApp" className="md:hidden fixed bottom-4 right-4 z-50">
      <a
        href={whatsappLink(page === 'sites' ? 'sites' : 'geral')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-950/30 active:scale-95 transition-transform"
      >
        <MessageCircle size={28} className="fill-current" />
      </a>
    </aside>
  );
};
