import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { FluidShape } from '@/components/motion/FluidShape';
import { MotionReveal } from '@/components/motion/MotionReveal';
import {
  primitiveColors,
  semanticColors,
  gradientsData,
  typographyScale,
  spacingScale,
  borderRadiusData,
  shadowData,
} from '@/data/tokensData';
import { FluidVariant, FluidBlur, FluidSize } from '@/types';
import {
  ArrowRight,
  Sparkles,
  Check,
  Copy,
  Code2,
  RefreshCw,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const DesignSystemPlayground: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeFluidVariant, setActiveFluidVariant] = useState<FluidVariant>('aurora');
  const [activeFluidBlur, setActiveFluidBlur] = useState<FluidBlur>('2xl');
  const [activeFluidSize, setActiveFluidSize] = useState<FluidSize>('md');
  const [isAnimated, setIsAnimated] = useState(true);
  const [motionTriggerCount, setMotionTriggerCount] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const navItems = [
    { id: 'primitives', label: '1. Primitives' },
    { id: 'semantics', label: '2. Semantics' },
    { id: 'typography', label: '3. Typography' },
    { id: 'buttons', label: '4. Buttons' },
    { id: 'spacing', label: '5. Spacing' },
    { id: 'grid', label: '6. Grid' },
    { id: 'borders', label: '7. Borders' },
    { id: 'shadows', label: '8. Shadows' },
    { id: 'gradients', label: '9. Gradients' },
    { id: 'fluid', label: '10. Fluid Shapes' },
    { id: 'motion', label: '11. Motion' },
    { id: 'ui-cards', label: '12. UI & Cards' },
  ];

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-brand-sky selection:text-night pb-32">
      {/* Ambient background fluid atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <FluidShape
          variant="deep"
          size="2xl"
          className="top-[-10%] right-[-15%]"
          animated={true}
        />
        <FluidShape
          variant="aurora"
          size="xl"
          className="bottom-[10%] left-[-15%]"
          animated={true}
          opacity={0.3}
        />
      </div>

      {/* Top Header & Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-glass border-b border-border">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-radius-md bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center font-display font-bold text-sky text-sm">
                TH
              </span>
              <span className="font-display font-bold text-lg tracking-tight group-hover:text-sky transition-colors">
                TECH HUB
              </span>
            </a>
            <span className="text-text-muted text-xs font-mono px-2 py-0.5 rounded bg-surface border border-border-subtle">
              DS V1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-text-muted">
              <span className={cn('w-2 h-2 rounded-full', prefersReducedMotion ? 'bg-peach' : 'bg-mint animate-pulse')} />
              <span>Reduced Motion: {prefersReducedMotion ? 'Active' : 'Off'}</span>
            </div>
            <Button
              variant="dark"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => (window.location.href = '/')}
            >
              Back to Home
            </Button>
          </div>
        </Container>
      </header>

      {/* Hero Intro */}
      <Section spacing="lg" className="relative z-10 pt-12 md:pt-16 pb-8">
        <Container>
          <MotionReveal variant="slideUp">
            <div className="max-w-3xl space-y-4">
              <SectionLabel indicator="symbol" color="accent">
                Tech Hub Design System V1.0
              </SectionLabel>
              <h1 className="text-display-lg font-bold text-white tracking-tight">
                Foundation & Tokens Playground
              </h1>
              <p className="text-body-lg text-text-muted font-body leading-relaxed">
                Especificação técnica completa dos fundamentos visuais da Tech Hub. Construído com tokens nativos, tipografia editorial de alta escala (Fustat + Inter Tight), formas fluidas, motion GSAP, scroll suave Lenis e acessibilidade rigorosa.
              </p>
            </div>
          </MotionReveal>

          {/* Quick Category Jump Navigation */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 rounded-radius-pill text-xs font-medium text-text-muted bg-surface hover:bg-surface-elevated hover:text-white border border-border-subtle hover:border-border-bright transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="gradient" className="my-6" />

      {/* =====================================================================
          1. COLOR PRIMITIVES
          ===================================================================== */}
      <Section id="primitives" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">01. Palette</SectionLabel>
            <h2 className="text-heading-xl font-bold">Primitive Colors</h2>
            <p className="text-text-muted text-body-sm">
              Base oficial imutável. Componentes devem consumir essas cores através dos tokens semânticos.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-label-md text-text-muted uppercase tracking-wider mb-4">
                Brand / Core Palette
              </h3>
              <Grid cols={4} gap="md">
                {primitiveColors
                  .filter((c) => c.category === 'core')
                  .map((c) => (
                    <Card
                      key={c.variable}
                      variant="default"
                      className="group cursor-pointer hover:border-border-bright transition-all"
                      onClick={() => handleCopy(`var(${c.variable})`)}
                    >
                      <div
                        className="h-24 w-full rounded-radius-md mb-3 border border-white/10 shadow-inner flex items-end justify-end p-2"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                          {c.hex}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-white text-base">{c.name}</span>
                        <button
                          type="button"
                          className="text-text-muted group-hover:text-sky transition-colors p-1"
                          title="Copy Token"
                        >
                          {copiedToken === `var(${c.variable})` ? (
                            <Check className="w-3.5 h-3.5 text-mint" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <code className="text-xs font-mono text-sky/90 block mb-1">
                        var({c.variable})
                      </code>
                      <p className="text-xs text-text-muted">{c.role}</p>
                    </Card>
                  ))}
              </Grid>
            </div>

            <div>
              <h3 className="text-label-md text-text-muted uppercase tracking-wider mb-4">
                Support Palette (Coral, Peach, Mint, Slate)
              </h3>
              <Grid cols={4} gap="md">
                {primitiveColors
                  .filter((c) => c.category === 'support')
                  .map((c) => (
                    <Card
                      key={c.variable}
                      variant="default"
                      className="group cursor-pointer hover:border-border-bright transition-all"
                      onClick={() => handleCopy(`var(${c.variable})`)}
                    >
                      <div
                        className="h-20 w-full rounded-radius-md mb-3 border border-white/10 shadow-inner flex items-end justify-end p-2"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                          {c.hex}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-white text-base">{c.name}</span>
                        <button
                          type="button"
                          className="text-text-muted group-hover:text-sky transition-colors p-1"
                          title="Copy Token"
                        >
                          {copiedToken === `var(${c.variable})` ? (
                            <Check className="w-3.5 h-3.5 text-mint" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <code className="text-xs font-mono text-sky/90 block mb-1">
                        var({c.variable})
                      </code>
                      <p className="text-xs text-text-muted">{c.role}</p>
                    </Card>
                  ))}
              </Grid>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          2. SEMANTIC COLOR TOKENS
          ===================================================================== */}
      <Section id="semantics" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">02. Semantics</SectionLabel>
            <h2 className="text-heading-xl font-bold">Semantic Color Tokens</h2>
            <p className="text-text-muted text-body-sm">
              Mapeamento semântico que desacopla os componentes da paleta física.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {semanticColors.map((s) => (
              <Card
                key={s.token}
                variant="default"
                className="hover:border-border-bright transition-all cursor-pointer"
                onClick={() => handleCopy(`var(${s.token})`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-surface-elevated text-brand-highlight border border-border-subtle">
                    {s.category}
                  </span>
                  <button type="button" className="text-text-muted hover:text-sky p-1">
                    {copiedToken === `var(${s.token})` ? (
                      <Check className="w-3.5 h-3.5 text-mint" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <code className="text-sm font-mono font-semibold text-white block mb-1">
                  {s.token}
                </code>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: `var(${s.token})` }}
                  />
                  <span className="text-xs text-sky font-mono">{s.mapsTo}</span>
                </div>
                <p className="text-xs text-text-muted">{s.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          3. TYPOGRAPHY
          ===================================================================== */}
      <Section id="typography" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">03. Typography</SectionLabel>
            <h2 className="text-heading-xl font-bold">Typography System</h2>
            <p className="text-text-muted text-body-sm">
              Fustat (Display) + Inter Tight (Body & UI). Contraste de escala marcante e muito espaço negativo.
            </p>
          </div>

          {/* Typography Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card variant="glass" className="border-l-4 border-l-brand-primary">
              <div className="flex items-center justify-between mb-4">
                <span className="text-label-md text-sky font-mono font-semibold">PRIMARY DISPLAY</span>
                <span className="text-xs text-text-muted">font-display: swap</span>
              </div>
              <h3 className="text-4xl font-display font-bold text-white mb-2">
                Fustat Display
              </h3>
              <p className="text-text-muted text-body-sm mb-4">
                Utilizada para grandes headlines, H1, H2, frases de alto impacto e métricas. Possui personalidade geométrica firme e contemporânea.
              </p>
              <div className="space-y-1 font-display">
                <p className="text-xl font-light text-text-secondary">Light 300: Tecnologia aplicada com precisão</p>
                <p className="text-xl font-normal text-text-secondary">Regular 400: Infraestrutura e engenharia digital</p>
                <p className="text-xl font-semibold text-white">Semibold 600: Inteligência e alto desempenho</p>
                <p className="text-xl font-bold text-white">Bold 700: TECH HUB FOUNDATION</p>
              </div>
            </Card>

            <Card variant="glass" className="border-l-4 border-l-brand-secondary">
              <div className="flex items-center justify-between mb-4">
                <span className="text-label-md text-lilac font-mono font-semibold">BODY & UI FONT</span>
                <span className="text-xs text-text-muted">font-display: swap</span>
              </div>
              <h3 className="text-4xl font-body font-bold text-white mb-2">
                Inter Tight
              </h3>
              <p className="text-text-muted text-body-sm mb-4">
                Utilizada para textos corridos, navegação, botões, labels, dados tabulares e elementos de controle de UI.
              </p>
              <div className="space-y-2 font-body">
                <p className="text-base font-light text-text-secondary">Light 300: Textos auxiliares e notas descritivas</p>
                <p className="text-base font-normal text-text-secondary">Regular 400: Parágrafos padrão de leitura contínua</p>
                <p className="text-base font-medium text-white">Medium 500: Textos de botões e links de navegação</p>
                <p className="text-base font-semibold text-white">Semibold 600: Micro-labels e tags em caixa alta</p>
              </div>
            </Card>
          </div>

          {/* Scale Table */}
          <div className="space-y-4">
            <h3 className="text-heading-md font-bold mb-4">Escala Tipográfica Oficial</h3>
            <div className="space-y-3">
              {typographyScale.map((t) => (
                <div
                  key={t.name}
                  className="p-4 rounded-radius-md bg-surface border border-border-subtle hover:border-border transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1 lg:w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-sky">{t.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-text-muted border border-border-subtle">
                        {t.font}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{t.usage}</p>
                    <p className="text-[11px] font-mono text-text-muted">
                      Size: {t.size} | LH: {t.lineHeight} | Track: {t.tracking}
                    </p>
                  </div>
                  <div className="lg:w-2/3 overflow-hidden">
                    <p
                      className={cn(
                        'text-white truncate',
                        t.font === 'Fustat' ? 'font-display font-bold' : 'font-body font-normal',
                        t.name === 'display-xl' && 'text-display-xl',
                        t.name === 'display-lg' && 'text-display-lg',
                        t.name === 'display-md' && 'text-display-md',
                        t.name === 'heading-xl' && 'text-heading-xl',
                        t.name === 'heading-lg' && 'text-heading-lg',
                        t.name === 'heading-md' && 'text-heading-md',
                        t.name === 'heading-sm' && 'text-heading-sm',
                        t.name === 'body-lg' && 'text-body-lg',
                        t.name === 'body-md' && 'text-body-md',
                        t.name === 'body-sm' && 'text-body-sm',
                        t.name === 'label-lg' && 'text-label-lg uppercase',
                        t.name === 'label-md' && 'text-label-md uppercase',
                        t.name === 'label-sm' && 'text-label-sm uppercase',
                        t.name === 'caption' && 'text-caption'
                      )}
                    >
                      Aceleração tecnológica e arquitetura escalável
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          4. BUTTONS
          ===================================================================== */}
      <Section id="buttons" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">04. Buttons</SectionLabel>
            <h2 className="text-heading-xl font-bold">Button System</h2>
            <p className="text-text-muted text-body-sm">
              Variantes: Primary (Blue Pill), Secondary (White Pill), Ghost, Dark (Night Pill). Estados: default, hover, active, focus, disabled, loading.
            </p>
          </div>

          <div className="space-y-8">
            {/* Variants Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Primary */}
              <Card variant="glass" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-sky font-semibold">PRIMARY (BLUE)</span>
                  <Badge variant="accent" size="sm">Pill</Badge>
                </div>
                <div className="space-y-3 pt-2">
                  <Button variant="primary" size="lg" fullWidth icon={<Sparkles className="w-4 h-4" />}>
                    Primary Action
                  </Button>
                  <Button variant="primary" size="md" fullWidth>
                    Medium Button
                  </Button>
                  <Button variant="primary" size="sm" fullWidth>
                    Small Button
                  </Button>
                  <Button variant="primary" size="md" loading fullWidth>
                    Carregando
                  </Button>
                </div>
              </Card>

              {/* Secondary */}
              <Card variant="glass" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white font-semibold">SECONDARY (WHITE)</span>
                  <Badge variant="outline" size="sm">Pill</Badge>
                </div>
                <div className="space-y-3 pt-2">
                  <Button variant="secondary" size="lg" fullWidth icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Secondary Action
                  </Button>
                  <Button variant="secondary" size="md" fullWidth>
                    Medium Button
                  </Button>
                  <Button variant="secondary" size="sm" fullWidth>
                    Small Button
                  </Button>
                  <Button variant="secondary" size="md" disabled fullWidth>
                    Disabled State
                  </Button>
                </div>
              </Card>

              {/* Ghost */}
              <Card variant="glass" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-muted font-semibold">GHOST</span>
                  <Badge variant="default" size="sm">Subtle</Badge>
                </div>
                <div className="space-y-3 pt-2">
                  <Button variant="ghost" size="lg" fullWidth icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Ghost Link Action
                  </Button>
                  <Button variant="ghost" size="md" fullWidth>
                    Medium Ghost
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth>
                    Small Ghost
                  </Button>
                  <Button variant="ghost" size="md" disabled fullWidth>
                    Disabled Ghost
                  </Button>
                </div>
              </Card>

              {/* Dark */}
              <Card variant="glass" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-lilac font-semibold">DARK (NIGHT)</span>
                  <Badge variant="secondary" size="sm">Pill</Badge>
                </div>
                <div className="space-y-3 pt-2">
                  <Button variant="dark" size="lg" fullWidth icon={<Code2 className="w-4 h-4" />}>
                    Dark Action
                  </Button>
                  <Button variant="dark" size="md" fullWidth>
                    Medium Dark
                  </Button>
                  <Button variant="dark" size="sm" fullWidth>
                    Small Dark
                  </Button>
                  <Button variant="dark" size="md" loading fullWidth>
                    Processing
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          5. SPACING SYSTEM
          ===================================================================== */}
      <Section id="spacing" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">05. Spacing</SectionLabel>
            <h2 className="text-heading-xl font-bold">Spacing System</h2>
            <p className="text-text-muted text-body-sm">
              Escala métrica estrita para garantir ritmo vertical e horizontal consistente sem valores arbitrários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spacingScale.map((s) => (
              <div
                key={s.name}
                className="p-4 rounded-radius-md bg-surface border border-border-subtle flex items-center justify-between gap-4"
              >
                <div className="w-28 shrink-0">
                  <span className="font-mono text-sm font-semibold text-white block">{s.name}</span>
                  <span className="font-mono text-xs text-sky">
                    {s.px} ({s.rem})
                  </span>
                </div>
                <div className="grow flex items-center">
                  <div
                    className="h-6 bg-brand-primary/30 border border-brand-primary rounded-radius-sm"
                    style={{ width: `var(--${s.name})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          6. GRID & BREAKPOINTS
          ===================================================================== */}
      <Section id="grid" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">06. Layout</SectionLabel>
            <h2 className="text-heading-xl font-bold">Grid & Breakpoints</h2>
            <p className="text-text-muted text-body-sm">
              Desktop: 12 colunas (max 1280px, gutter 24px, padding 32px) | Tablet: 8 colunas | Mobile: 4 colunas (gutter 16px, padding 20px).
            </p>
          </div>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-sky">
                RESPONSIVE GRID VISUALIZER (Redimensione a janela para testar)
              </span>
              <span className="text-xs font-mono text-text-muted">1280px Container</span>
            </div>
            <Grid cols={12} gap="md">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-radius-md bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center font-mono text-xs text-sky font-bold"
                >
                  Col {i + 1}
                </div>
              ))}
            </Grid>
          </Card>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          7. BORDER RADIUS
          ===================================================================== */}
      <Section id="borders" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">07. Geometry</SectionLabel>
            <h2 className="text-heading-xl font-bold">Border Radius System</h2>
            <p className="text-text-muted text-body-sm">
              Cantos suaves e refinados sem transformar a interface em cartões infantis.
            </p>
          </div>

          <Grid cols={4} gap="md">
            {borderRadiusData.map((r) => (
              <Card key={r.name} variant="default" className="text-center space-y-3">
                <div
                  className="w-24 h-24 mx-auto border-2 border-brand-accent bg-brand-accent/10 flex items-center justify-center"
                  style={{ borderRadius: `var(--${r.name})` }}
                >
                  <span className="text-xs font-mono text-white font-bold">{r.value}</span>
                </div>
                <div>
                  <span className="font-mono text-sm font-semibold text-sky block">{r.name}</span>
                  <p className="text-xs text-text-muted mt-1">{r.usage}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          8. SHADOWS & GLOWS
          ===================================================================== */}
      <Section id="shadows" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">08. Elevation</SectionLabel>
            <h2 className="text-heading-xl font-bold">Shadow System</h2>
            <p className="text-text-muted text-body-sm">
              Sombras suaves e glows discretos que evitam o visual saturado de SaaS comum.
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {shadowData.map((s) => (
              <div
                key={s.name}
                className="p-6 rounded-radius-lg bg-[#0e1c31] border border-border flex flex-col justify-between"
                style={{ boxShadow: `var(--${s.name})` }}
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-sky block mb-1">{s.name}</span>
                  <p className="text-xs text-text-muted">{s.description}</p>
                </div>
                <code className="text-[11px] font-mono text-text-muted block mt-4 pt-2 border-t border-border-subtle truncate">
                  {s.value}
                </code>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          9. GRADIENTS
          ===================================================================== */}
      <Section id="gradients" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">09. Gradients</SectionLabel>
            <h2 className="text-heading-xl font-bold">Official Gradient System</h2>
            <p className="text-text-muted text-body-sm">
              7 gradientes oficiais para identidade e expressão visual. Não devem ser aplicados indiscriminadamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradientsData.map((g) => (
              <Card
                key={g.id}
                variant="default"
                className="group cursor-pointer hover:border-border-bright transition-all"
                onClick={() => handleCopy(`var(${g.token})`)}
              >
                <div
                  className="h-32 w-full rounded-radius-md mb-4 border border-white/10 shadow-md flex items-end justify-between p-3"
                  style={{ background: `var(${g.token})` }}
                >
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                    {g.id}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                    {g.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-semibold text-white">{g.token}</span>
                  <button type="button" className="text-text-muted group-hover:text-sky p-1">
                    {copiedToken === `var(${g.token})` ? (
                      <Check className="w-4 h-4 text-mint" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-text-muted mb-2">{g.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
                  {g.stops.map((stop, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-elevated text-text-muted border border-border-subtle"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          10. FLUID SHAPES SYSTEM
          ===================================================================== */}
      <Section id="fluid" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">10. Fluid System</SectionLabel>
            <h2 className="text-heading-xl font-bold">Fluid Shape Visual System</h2>
            <p className="text-text-muted text-body-sm">
              Componente <code>&lt;FluidShape /&gt;</code> desacoplado para atmosferas orgânicas, fundos dinâmicos e assinaturas visuais.
            </p>
          </div>

          <Card variant="glass" className="overflow-hidden relative p-8">
            <div className="relative min-h-[380px] flex items-center justify-center border border-border-subtle rounded-radius-lg overflow-hidden bg-night/80 mb-6">
              {/* Live Interactive Fluid Shape Demo */}
              <FluidShape
                variant={activeFluidVariant}
                blur={activeFluidBlur}
                size={activeFluidSize}
                animated={isAnimated}
                opacity={0.9}
                className="relative"
              />
              <div className="relative z-10 text-center space-y-2 p-4 bg-night/60 rounded-radius-lg backdrop-blur-md border border-border">
                <span className="text-xs font-mono text-sky uppercase tracking-widest block">
                  ACTIVE FLUID PREVIEW
                </span>
                <p className="font-display font-bold text-2xl text-white">
                  {activeFluidVariant.toUpperCase()}
                </p>
                <span className="text-xs font-mono text-text-muted block">
                  Blur: {activeFluidBlur} | Size: {activeFluidSize} | Motion: {isAnimated ? 'Animated' : 'Static'}
                </span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-text-muted uppercase block mb-2">
                  Variant Preset:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['electric', 'blueLilac', 'aurora', 'glass', 'deep', 'lightLilac'] as FluidVariant[]).map(
                    (v) => (
                      <button
                        key={v}
                        onClick={() => setActiveFluidVariant(v)}
                        className={cn(
                          'px-3 py-1.5 rounded-radius-pill text-xs font-mono transition-all',
                          activeFluidVariant === v
                            ? 'bg-brand-primary text-white shadow-glow'
                            : 'bg-surface text-text-muted hover:text-white border border-border-subtle'
                        )}
                      >
                        {v}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 border-t border-border-subtle">
                <div>
                  <span className="text-xs font-mono text-text-muted uppercase block mb-2">Blur:</span>
                  <div className="flex gap-1.5">
                    {(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as FluidBlur[]).map((b) => (
                      <button
                        key={b}
                        onClick={() => setActiveFluidBlur(b)}
                        className={cn(
                          'px-2.5 py-1 rounded-radius-sm text-xs font-mono',
                          activeFluidBlur === b
                            ? 'bg-sky text-night font-bold'
                            : 'bg-surface text-text-muted hover:text-white'
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-text-muted uppercase block mb-2">Size:</span>
                  <div className="flex gap-1.5">
                    {(['sm', 'md', 'lg', 'xl'] as FluidSize[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setActiveFluidSize(s)}
                        className={cn(
                          'px-2.5 py-1 rounded-radius-sm text-xs font-mono',
                          activeFluidSize === s
                            ? 'bg-sky text-night font-bold'
                            : 'bg-surface text-text-muted hover:text-white'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-text-muted uppercase block mb-2">Animation:</span>
                  <button
                    onClick={() => setIsAnimated(!isAnimated)}
                    className={cn(
                      'px-3 py-1 rounded-radius-pill text-xs font-mono transition-all',
                      isAnimated
                        ? 'bg-mint/20 text-mint border border-mint/40'
                        : 'bg-surface text-text-muted border border-border-subtle'
                    )}
                  >
                    {isAnimated ? 'Ambient Motion ON' : 'Paused'}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          11. MOTION SYSTEM
          ===================================================================== */}
      <Section id="motion" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">11. Motion Engine</SectionLabel>
            <h2 className="text-heading-xl font-bold">GSAP + ScrollTrigger + Lenis</h2>
            <p className="text-text-muted text-body-sm">
              Motion unificado com curvas de aceleração expressivas e suporte a reduced motion.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky">INTERACTIVE REVEAL TEST</span>
              <Button
                variant="dark"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={() => setMotionTriggerCount((prev) => prev + 1)}
              >
                Replay Animations
              </Button>
            </div>

            <div key={motionTriggerCount} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MotionReveal variant="slideUp" delay={0.05} triggerOnScroll={false}>
                <Card variant="glass" className="h-44 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-sky">REVEAL: SLIDE UP</span>
                    <h4 className="font-display font-bold text-lg text-white mt-1">
                      Smooth Vertical Lift
                    </h4>
                  </div>
                  <p className="text-xs text-text-muted">GSAP ease: power3.out (slow)</p>
                </Card>
              </MotionReveal>

              <MotionReveal variant="scale" delay={0.15} triggerOnScroll={false}>
                <Card variant="glass" className="h-44 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-lilac">REVEAL: SCALE IN</span>
                    <h4 className="font-display font-bold text-lg text-white mt-1">
                      Expressive Zoom
                    </h4>
                  </div>
                  <p className="text-xs text-text-muted">GSAP ease: expo.out (normal)</p>
                </Card>
              </MotionReveal>

              <MotionReveal variant="clipReveal" delay={0.25} triggerOnScroll={false}>
                <Card variant="glass" className="h-44 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-mint">REVEAL: CLIP REVEAL</span>
                    <h4 className="font-display font-bold text-lg text-white mt-1">
                      Editorial Curtain
                    </h4>
                  </div>
                  <p className="text-xs text-text-muted">Polygon clip-path mask reveal</p>
                </Card>
              </MotionReveal>

              <MotionReveal variant="fade" delay={0.35} triggerOnScroll={false}>
                <Card variant="glass" className="h-44 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-peach">REVEAL: FADE IN</span>
                    <h4 className="font-display font-bold text-lg text-white mt-1">
                      Subtle Dissolve
                    </h4>
                  </div>
                  <p className="text-xs text-text-muted">Clean opacity ramp</p>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="subtle" className="my-6" />

      {/* =====================================================================
          12. UI FOUNDATION & CARDS
          ===================================================================== */}
      <Section id="ui-cards" spacing="lg" className="relative z-10">
        <Container>
          <div className="mb-8 space-y-2">
            <SectionLabel indicator="slash">12. UI Components</SectionLabel>
            <h2 className="text-heading-xl font-bold">UI Foundation Components</h2>
            <p className="text-text-muted text-body-sm">
              Componentes atômicos reutilizáveis: Badges, SectionLabels, Dividers, Icons e Cards.
            </p>
          </div>

          <div className="space-y-8">
            {/* Badges & SectionLabels */}
            <Card variant="glass" className="space-y-6">
              <h3 className="text-label-md text-sky font-mono uppercase">Badges & Section Labels</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="accent" dot>Accent Status</Badge>
                <Badge variant="secondary" dot>Secondary</Badge>
                <Badge variant="success" dot>Success Mint</Badge>
                <Badge variant="warning" dot>Warning Peach</Badge>
                <Badge variant="danger" dot>Danger Coral</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-subtle">
                <SectionLabel indicator="dot" color="accent">
                  Accent Indicator
                </SectionLabel>
                <SectionLabel indicator="slash" color="primary">
                  01. Architectural Tag
                </SectionLabel>
                <SectionLabel indicator="symbol" color="secondary">
                  Editorial Symbol
                </SectionLabel>
                <SectionLabel indicator="none" color="muted">
                  Minimal Label
                </SectionLabel>
              </div>
            </Card>

            {/* Icons System */}
            <Card variant="glass" className="space-y-4">
              <h3 className="text-label-md text-sky font-mono uppercase">Standardized Icon Token Sizing & Colors</h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 p-2 rounded bg-surface border border-border-subtle">
                  <Icon icon={Cpu} size="sm" color="accent" />
                  <span className="text-xs font-mono text-text-muted">sm (18px) - Accent</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-surface border border-border-subtle">
                  <Icon icon={Layers} size="md" color="secondary" />
                  <span className="text-xs font-mono text-text-muted">md (22px) - Secondary</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-surface border border-border-subtle">
                  <Icon icon={ShieldCheck} size="lg" color="success" />
                  <span className="text-xs font-mono text-text-muted">lg (28px) - Success</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-surface border border-border-subtle">
                  <Icon icon={Zap} size="xl" color="warning" />
                  <span className="text-xs font-mono text-text-muted">xl (36px) - Warning</span>
                </div>
              </div>
            </Card>

            {/* Cards Variants */}
            <div>
              <h3 className="text-label-md text-sky font-mono uppercase mb-4">Card Archetypes</h3>
              <Grid cols={3} gap="md">
                <Card variant="default">
                  <span className="text-xs font-mono text-text-muted block mb-2">CARD: DEFAULT</span>
                  <h4 className="font-display font-bold text-lg text-white mb-2">Standard Surface</h4>
                  <p className="text-xs text-text-muted">
                    Superfície base translúcida para blocos estruturais.
                  </p>
                </Card>

                <Card variant="elevated">
                  <span className="text-xs font-mono text-sky block mb-2">CARD: ELEVATED</span>
                  <h4 className="font-display font-bold text-lg text-white mb-2">Elevated Surface</h4>
                  <p className="text-xs text-text-muted">
                    Superfície elevada com maior contraste e sombra md.
                  </p>
                </Card>

                <Card variant="interactive">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-mint">CARD: INTERACTIVE</span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">Hover Active Card</h4>
                  <p className="text-xs text-text-muted">
                    Interação de borda brilhante e deslocamento dinâmico.
                  </p>
                </Card>
              </Grid>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
