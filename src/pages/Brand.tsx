import React, { useState, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Type,
  Palette,
  ShieldCheck,
  FileCode,
  Image as ImageIcon,
  ArrowLeft,
} from 'lucide-react';
import {
  BRAND_ASSETS,
  BrandAsset,
  downloadSvg,
  downloadPng,
  downloadAllAssetsZip,
} from '@/lib/brandAssets';

export const Brand: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cardBgs, setCardBgs] = useState<Record<string, 'light' | 'dark' | 'blue'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingPngId, setDownloadingPngId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Brand Guidelines & Assets Oficiais | Tech Hub';
  }, []);

  const filteredAssets = BRAND_ASSETS.filter((asset) => {
    if (selectedCategory === 'all') return true;
    return asset.category === selectedCategory;
  });

  const handleCopySvg = async (asset: BrandAsset) => {
    try {
      await navigator.clipboard.writeText(asset.svgContent);
      setCopiedId(asset.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadPng = async (asset: BrandAsset) => {
    setDownloadingPngId(asset.id);
    try {
      await downloadPng(asset, 2400);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingPngId(null);
    }
  };

  const handleDownloadAll = async () => {
    if (isZipping) return;
    setIsZipping(true);
    setZipProgress(0);
    try {
      await downloadAllAssetsZip((percent) => setZipProgress(percent));
    } catch (err) {
      console.error(err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyColor = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedColor(val);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const figmaSolidColors = [
    { name: 'night', hex: '#081220', token: '--color-primitive-night', desc: 'Fundo principal Dark, tipografia em fundos claros e cabeçalhos.' },
    { name: 'blue', hex: '#2563EB', token: '--color-primitive-blue', desc: 'Cor primária institucional, botões de ação e links.' },
    { name: 'sky', hex: '#00BAFF', token: '--color-primitive-sky', desc: 'Azul ciano vibrante para realces, auras e gradientes elétricos.' },
    { name: 'violet', hex: '#7C3AED', token: '--color-primitive-violet', desc: 'Violeta digital para transições e cartões analíticos.' },
    { name: 'lilac', hex: '#C4B5FD', token: '--color-primitive-lilac', desc: 'Lilás suave para destaques e acentos luminosos.' },
    { name: 'ice', hex: '#EAF2FF', token: '--color-primitive-ice', desc: 'Fundo suave gelo, superfícies secundárias e cards.', textDark: true },
    { name: 'white', hex: '#FFFFFF', token: '--color-primitive-white', desc: 'Branco puro para fundos limpos e superfícies.', textDark: true, border: true },
    { name: 'coral', hex: '#FF7A5C', token: '--color-primitive-coral', desc: 'Acento quente para gráficos de dados e avisos.' },
    { name: 'peach', hex: '#FFB08A', token: '--color-primitive-peach', desc: 'Pêssego suave para estados secundários e ilustrações.' },
    { name: 'mint', hex: '#00FFA2', token: '--color-primitive-mint', desc: 'Verde menta de alta energia para status ativo e sucesso.', textDark: true },
    { name: 'slate', hex: '#94A3B8', token: '--color-primitive-slate', desc: 'Cinza neutro para textos de apoio, ícones e bordas sutis.' },
  ];

  const figmaGradients = [
    {
      name: '01 — ELECTRIC BLUE',
      gradient: 'linear-gradient(135deg, #071A45 0%, #0047FF 38%, #00BAFF 72%, #EAF2FF 100%)',
      stops: '0% #071A45 • 38% #0047FF • 72% #00BAFF • 100% #EAF2FF',
      cssVar: '--gradient-electric',
      desc: 'Gradiente principal elétrico para Hero, banners e elementos tridimensionais.',
    },
    {
      name: '02 — BLUE LILAC',
      gradient: 'linear-gradient(135deg, #0059FF 0%, #4169FF 42%, #8B7CFF 72%, #D8D3FF 100%)',
      stops: '0% #0059FF • 42% #4169FF • 72% #8B7CFF • 100% #D8D3FF',
      cssVar: '--gradient-blue-lilac',
      desc: 'Gradiente oficial aplicado no símbolo vetorial e identidades principais.',
    },
    {
      name: '03 — AURORA FLUID',
      gradient: 'linear-gradient(135deg, #00BAFF 0%, #2563EB 36%, #7C3AED 68%, #C4B5FD 100%)',
      stops: '0% #00BAFF • 36% #2563EB • 68% #7C3AED • 100% #C4B5FD',
      cssVar: '--gradient-aurora',
      desc: 'Gradiente fluido com transição ciano para violeta e lilás.',
    },
    {
      name: '04 — GLASS LIGHT',
      gradient: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.72) 40%, rgba(221,231,255,0.78) 72%, rgba(0,186,255,0.35) 100%)',
      stops: '0% #FFFFFF (100%) • 40% #FFFFFF (72%) • 72% #DDE7FF (78%) • 100% #00BAFF (35%)',
      cssVar: '--gradient-glass',
      desc: 'Gradiente translúcido para efeitos de vidro, frosted glass e reflexos de luz.',
      textDark: true,
      border: true,
    },
    {
      name: '05 — DEEP FLUID',
      gradient: 'linear-gradient(135deg, #020B1C 0%, #061B4F 38%, #003DFF 68%, #151A8A 100%)',
      stops: '0% #020B1C • 38% #061B4F • 68% #003DFF • 100% #151A8A',
      cssVar: '--gradient-deep',
      desc: 'Gradiente de profundidade para seções noturnas densas e fundos imersivos.',
    },
    {
      name: '07 — LIGHT LILAC',
      gradient: 'linear-gradient(135deg, #7F7FFC 0%, #9FA2FC 38%, #B8BDFC 68%, #D3DDFC 100%)',
      stops: '0% #7F7FFC • 38% #9FA2FC • 68% #B8BDFC • 100% #D3DDFC',
      cssVar: '--gradient-light-lilac',
      desc: 'Gradiente suave para o sub-elemento do símbolo e badges claras.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081220] font-sans antialiased selection:bg-blue-100">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao site</span>
            </a>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-tight text-slate-900 text-sm sm:text-lg whitespace-nowrap">TECH HUB</span>
              <span className="hidden sm:inline text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
                Brand Kit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isZipping}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-75"
            >
              <Download className="w-4 h-4" />
              <span className="sm:hidden whitespace-nowrap">{isZipping ? `${zipProgress}%` : 'Baixar ZIP'}</span>
              <span className="hidden sm:inline">{isZipping ? `Gerando ZIP (${zipProgress}%)…` : 'Baixar Todos os Assets (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia de Marca & Arquivos Oficiais</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.08]">
            Assets de Marca & Identidade Visual
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Aqui você encontra todas as variações oficiais da marca <strong>Tech Hub</strong> em vetor (.SVG) e alta
            resolução (.PNG transparente), além de tipografia, códigos de cores e boas práticas de aplicação.
          </p>
        </section>

        {/* Quick Navigation Anchor Pills */}
        <section className="flex flex-wrap gap-2 border-b border-slate-200 pb-6">
          <a
            href="#logos"
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Logos & Variações ({BRAND_ASSETS.length})</span>
          </a>
          <a
            href="#tipografia"
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 transition-colors flex items-center gap-2"
          >
            <Type className="w-4 h-4 text-blue-600" />
            <span>Tipografia Oficial</span>
          </a>
          <a
            href="#cores"
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 transition-colors flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-blue-600" />
            <span>Paleta de Cores & Tokens</span>
          </a>
          <a
            href="#regras"
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200 transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Área de Proteção & Regras</span>
          </a>
        </section>

        {/* Logos Section */}
        <section id="logos" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                Logos & Símbolos
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Todas as orientações (Horizontal, Vertical, Símbolo, Wordmark) e paletas (Colorida, Branca, Preta, Cinza).
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl w-fit">
              {[
                { id: 'all', label: 'Todas as Versões' },
                { id: 'horizontal', label: 'Horizontal' },
                { id: 'vertical', label: 'Vertical' },
                { id: 'symbol', label: 'Símbolo' },
                { id: 'wordmark', label: 'Wordmark' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Asset Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              // Determine current background of the card (custom cardBg, default bestOn, or globalBg)
              const cardBg = cardBgs[asset.id] ?? (asset.bestOn === 'dark' ? 'dark' : 'light');

              return (
                <div
                  key={asset.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  {/* Top Preview Canvas */}
                  <div
                    className={`relative p-6 h-64 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
                      cardBg === 'dark'
                        ? 'bg-[#081220]'
                        : cardBg === 'blue'
                        ? 'bg-[#2563EB]'
                        : 'bg-[#F8FAFC] border-b border-slate-100'
                    }`}
                  >
                    {/* Background Toggle Pill */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/20 backdrop-blur-md p-1 rounded-lg border border-white/10 z-10">
                      <button
                        type="button"
                        title="Fundo Claro"
                        onClick={() => setCardBgs({ ...cardBgs, [asset.id]: 'light' })}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          cardBg === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-400" />
                      </button>
                      <button
                        type="button"
                        title="Fundo Escuro"
                        onClick={() => setCardBgs({ ...cardBgs, [asset.id]: 'dark' })}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          cardBg === 'dark' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#081220]" />
                      </button>
                      <button
                        type="button"
                        title="Fundo Azul"
                        onClick={() => setCardBgs({ ...cardBgs, [asset.id]: 'blue' })}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          cardBg === 'blue' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      </button>
                    </div>

                    {/* SVG Render */}
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden [&>svg]:max-w-[85%] [&>svg]:max-h-[85%] [&>svg]:w-auto [&>svg]:h-auto [&>svg]:object-contain"
                      dangerouslySetInnerHTML={{ __html: asset.svgContent }}
                    />
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {asset.variantLabel}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {asset.width}×{asset.height}
                        </span>
                      </div>

                      <h3 className="font-semibold text-base text-slate-900 tracking-tight">
                        {asset.name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {asset.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => downloadSvg(asset)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                          title="Baixar arquivo vetor .SVG"
                        >
                          <FileCode className="w-3.5 h-3.5 text-blue-600" />
                          <span>Baixar SVG</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPng(asset)}
                          disabled={downloadingPngId === asset.id}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                          title="Baixar imagem PNG transparente em 2400px"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{downloadingPngId === asset.id ? 'Gerando…' : 'Baixar PNG'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopySvg(asset)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
                      >
                        {copiedId === asset.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Código SVG Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar código SVG</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Typography Section */}
        <section id="tipografia" className="space-y-8 pt-8 border-t border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50 mb-2">
              <Type className="w-3.5 h-3.5" />
              <span>Tipografia Institucional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Famílias Tipográficas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              A tipografia da Tech Hub combina precisão geométrica contemporânea com calor editorial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Display Font Card: Fustat */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-blue-600 font-semibold">Fonte de Títulos / Display</span>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mt-0.5">Fustat</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Variable / WOFF2</span>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Aa Bb Gg 123
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-2">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ • abcdefghijklmnopqrstuvwxyz • 0123456789
                  </p>
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 font-display font-light">
                    <span>Fustat Light (300)</span>
                    <span className="text-slate-400">Wordmark &quot;HUB&quot;, subtítulos finos</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 font-display font-medium">
                    <span>Fustat Medium (500)</span>
                    <span className="text-slate-400">Destaques editoriais</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 font-display font-bold">
                    <span>Fustat Bold (700)</span>
                    <span className="text-slate-400">Títulos de seções (H2, H3)</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-display font-extrabold">
                    <span>Fustat ExtraBold (800)</span>
                    <span className="text-slate-400">Wordmark &quot;TECH&quot;, Hero Titles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Font Card: Inter Tight */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-blue-600 font-semibold">Fonte de Texto / UI</span>
                  <h3 className="text-2xl font-bold font-sans text-slate-900 mt-0.5">Inter Tight</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Variable / WOFF2</span>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-normal leading-snug">
                    Tecnologia não é o ponto de partida. A operação é.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Projetada para alta legibilidade em telas de qualquer resolução, interfaces densas e leitura de parágrafos.
                  </p>
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 font-normal">
                    <span>Inter Tight Regular (400)</span>
                    <span className="text-slate-400">Parágrafos, artigos e descrições</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 font-medium">
                    <span>Inter Tight Medium (500)</span>
                    <span className="text-slate-400">Botões, inputs e navegação</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-semibold">
                    <span>Inter Tight SemiBold (600)</span>
                    <span className="text-slate-400">Labels, badges e ênfases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors & Tokens Section */}
        <section id="cores" className="space-y-12 pt-8 border-t border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Design Tokens & Paleta Oficial Figma</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Paleta Cromática & Gradientes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Valores oficiais extraídos diretamente do Figma (<strong>tech-hub-figma-native-colors-v2</strong>). Clique em qualquer amostra para copiar o HEX ou CSS Token.
            </p>
          </div>

          {/* 1. Official Figma System Gradients */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">Gradientes de Sistema</h3>
                <p className="text-xs text-slate-500">Gradientes lineares multi-stop para Hero, 3D, símbolos e auras luminosas.</p>
              </div>
              <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md font-semibold">
                6 Estilos de Gradiente
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {figmaGradients.map((g) => (
                <div
                  key={g.name}
                  onClick={() => handleCopyColor(g.gradient)}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-4"
                >
                  {/* Swatch */}
                  <div
                    className={`h-32 rounded-xl relative flex flex-col justify-between p-3.5 overflow-hidden ${
                      g.border ? 'border border-slate-200 shadow-inner' : ''
                    }`}
                    style={{ background: g.gradient }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-md ${
                          g.textDark ? 'bg-black/10 text-slate-900 font-semibold' : 'bg-black/40 text-white font-medium'
                        }`}
                      >
                        {g.cssVar}
                      </span>

                      <span
                        className={`text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${
                          g.textDark ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {copiedColor === g.gradient ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedColor === g.gradient ? 'Copiado!' : 'Copiar CSS'}</span>
                      </span>
                    </div>

                    <p
                      className={`text-[10px] font-mono leading-tight ${
                        g.textDark ? 'text-slate-800' : 'text-white/90'
                      }`}
                    >
                      {g.stops}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{g.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Official Figma Native Solid Colors */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">Cores Sólidas Nativas</h3>
                <p className="text-xs text-slate-500">Conjunto primitivo completo do design system (tech-hub-figma-native-colors-v2).</p>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-semibold">
                11 Cores Nativas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {figmaSolidColors.map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleCopyColor(c.hex)}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
                >
                  <div
                    className={`h-20 rounded-xl relative flex items-end justify-between p-2 ${
                      c.border ? 'border border-slate-200' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        c.textDark ? 'bg-black/10 text-slate-900 font-bold' : 'bg-black/40 text-white font-medium'
                      }`}
                    >
                      {c.hex}
                    </span>

                    <span
                      className={`text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ${
                        c.textDark ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {copiedColor === c.hex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs uppercase tracking-tight">{c.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Zone & Safe Margins */}
        <section id="regras" className="space-y-8 pt-8 border-t border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Regras de Aplicação</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Área de Proteção & Dimensionamento
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Diretrizes para preservar a legibilidade e o impacto da marca em todos os pontos de contato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold font-display">
                X
              </div>
              <h3 className="font-bold text-slate-900 text-base">Área de Não-Interferência</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mantenha sempre uma margem de segurança equivalente à metade da altura do símbolo em torno de qualquer versão da logo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold font-display">
                24px
              </div>
              <h3 className="font-bold text-slate-900 text-base">Tamanho Mínimo Digital</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Para o símbolo isolado em telas digitais, a altura mínima é de <strong>24px</strong>. Para a logo horizontal completa, a altura mínima é de <strong>28px</strong>.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold font-display">
                SVG
              </div>
              <h3 className="font-bold text-slate-900 text-base">Preferência de Formato</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sempre dê preferência aos arquivos em formato <strong>SVG</strong> para uso digital e web, garantindo nitidez infinita em telas Retina.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tech Hub. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-blue-600 transition-colors">Início</a>
            <a href="/sites" className="hover:text-blue-600 transition-colors">Sites</a>
            <button type="button" onClick={handleDownloadAll} className="text-blue-600 font-semibold hover:underline">
              Baixar Pacote Completo (.ZIP)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Brand;
