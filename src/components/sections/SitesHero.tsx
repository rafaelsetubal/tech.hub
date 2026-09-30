import { ArrowRight, ChartNoAxesColumnIncreasing, Users, MousePointer2, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { NativeHeroScene } from '@/components/ui/NativeHeroScene';

const benefits = [
  { icon: Sparkles, title: 'Sua marca em destaque', text: 'Uma presença com a identidade do seu negócio.' },
  { icon: Users, title: 'Mais confiança', text: 'Mostre seu trabalho, diferenciais e projetos reais.' },
  { icon: MousePointer2, title: 'Contato sem obstáculos', text: 'Botão de WhatsApp direto e caminhos claros.' },
  { icon: ChartNoAxesColumnIncreasing, title: 'Dados para evoluir', text: 'Você vê de onde vêm as visitas e o que gera contato.' },
];

export function SitesHero() {
  return (
    <section id="sites-inicio" className="studio-hero sites-hero-3d">
      <Container>
        <div className="sites-hero-composition">
          <div className="sites-hero-copy">
            <h1>
              Seu negócio,<br />
              <span>fácil de entender.</span><br />
              Fácil de escolher<span className="studio-period">.</span>
            </h1>
            <p>
              Criamos sites institucionais, páginas de venda e páginas de captura para empresas que querem ser encontradas, compreendidas e escolhidas. Do conteúdo à publicação, você fala direto com quem faz.
            </p>
            <div className="sites-hero-actions">
              <a className="studio-button" href="#seu-projeto">
                Conversar agora <ArrowRight size={19} />
              </a>
              <a className="sites-hero-secondary" href="#portfolio">
                Ver portfólio
              </a>
            </div>
          </div>
          <NativeHeroScene />
        </div>
        <ul className="sites-hero-benefits">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="sites-benefit-icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
