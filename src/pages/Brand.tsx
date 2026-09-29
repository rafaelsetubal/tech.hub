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

  const colors = [
    {
      name: 'Electric Blue',
      role: 'Cor Primária / Ação',
      hex: '#2563EB',
      rgb: 'rgb(37, 99, 235)',
      textDark: false,
      desc: 'Cor de destaque principal para CTAs, links ativos e elementos luminosos.',
    },
    {
      name: 'Gradient Brand Blue',
      role: 'Gradiente do Símbolo',
      hex: '#0059FF → #D8D3FF',
      gradient: 'linear-gradient(135deg, #0059FF 0%, #4169FF 42%, #8B7CFF 72%, #D8D3FF 100%)',
      textDark: false,
      desc: 'Gradiente proprietário do símbolo e elementos fluidos tridimensionais.',
    },
    {
      name: 'Night',
      role: 'Escuro Institucional',
      hex: '#081220',
      rgb: 'rgb(8, 18, 32)',
      textDark: false,
      desc: 'Cor para tipografia em fundos claros e backgrounds do modo noturno.',
    },
    {
      name: 'Brand Sky',
      role: 'Gelo / Fundo Suave',
      hex: '#EAF2FF',
      rgb: 'rgb(234, 242, 255)',
      textDark: true,
      desc: 'Fundo sutil, auras e cartões em segundo plano.',
    },
    {
      name: 'Slate Medium',
      role: 'Tipografia Secundária',
      hex: '#64748B',
      rgb: 'rgb(100, 116, 139)',
      textDark: false,
      desc: 'Legendas, textos de apoio e bordas de suporte.',
    },
    {
      name: 'Pure White',
      role: 'Luz / Superfície',
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      textDark: true,
      border: true,
      desc: 'Fundo principal da interface e cartões de conteúdo.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#081220] font-sans antialiased selection:bg-blue-100">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao site</span>
            </a>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-tight text-slate-900 text-lg">TECH HUB</span>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
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
              <span>{isZipping ? `Gerando ZIP (${zipProgress}%)…` : 'Baixar Todos os Assets (.ZIP)'}</span>
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
                    className={`relative p-8 h-64 flex items-center justify-center transition-colors duration-300 ${
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
                      className="w-full h-full max-w-[220px] max-h-[160px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
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
        <section id="cores" className="space-y-8 pt-8 border-t border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Cores Oficiais & Tokens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Paleta Cromática
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Clique em qualquer amostra para copiar o código HEX para a área de transferência.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => handleCopyColor(c.hex)}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-4"
              >
                {/* Color Swatch */}
                <div
                  className={`h-28 rounded-xl relative flex items-end justify-between p-3 ${
                    c.border ? 'border border-slate-200' : ''
                  }`}
                  style={{
                    background: c.gradient || c.hex,
                    backgroundColor: c.hex,
                  }}
                >
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-md backdrop-blur-md ${
                      c.textDark ? 'bg-black/10 text-slate-900' : 'bg-black/40 text-white'
                    }`}
                  >
                    {c.hex}
                  </span>

                  <span
                    className={`text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${
                      c.textDark ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {copiedColor === c.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedColor === c.hex ? 'Copiado!' : 'Copiar'}</span>
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{c.role}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
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
