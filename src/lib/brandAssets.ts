import JSZip from 'jszip';

export interface BrandAsset {
  id: string;
  name: string;
  category: 'horizontal' | 'vertical' | 'symbol' | 'wordmark';
  variant: 'color' | 'white' | 'black' | 'gray';
  variantLabel: string;
  description: string;
  bestOn: 'light' | 'dark' | 'any';
  width: number;
  height: number;
  viewBox: string;
  svgContent: string;
  aspectRatio: string;
}

// Raw vector paths
const SYMBOL_PATH_MAIN =
  'M199.88 335.697C190.077 343.896 163.524 340.623 152.581 335.086C119.931 318.563 130.2 286.826 122.109 258.388C119.679 249.851 113.011 240.623 106.152 235.054C82.8559 213.628 51.9551 228.83 26.1703 216.149C-0.210339 203.175 -6.31793 168.22 6.36338 143.373C23.4065 109.98 56.5649 121.123 85.616 115.551C90.3632 114.641 99.4486 108.246 103.859 105.466C134.501 88.8887 120.078 48.9721 132.187 26.1272C153.388 -13.8645 215.879 -6.21803 228.839 37.2777C233.562 53.1284 232.044 65.2917 225.213 79.0611C208.427 114.7 176.216 101.434 148.285 109.767C106.142 122.339 104.106 170.563 115.296 204.199C152.871 256.813 184.785 207.52 220.808 255.171C240.797 281.615 229.921 323.213 199.88 335.697Z';

const SYMBOL_PATH_SUB =
  'M276.132 119.768C304.03 116.221 329.535 135.917 333.138 163.792C336.739 191.666 317.081 217.194 289.195 220.848C261.235 224.512 235.609 204.799 231.996 176.849C228.384 148.898 248.157 123.325 276.132 119.768Z';

// Typography Paths for Horizontal Layout
const PATH_TECH_HORIZONTAL = `
<path d="M392.096 155.49V30.1305H416.272V155.49H392.096ZM355.562 53.0533V30.1305H452.805V53.0533H355.562Z" fill="FILL_TECH"/>
<path d="M468.924 155.49V30.1305H493.101V155.49H468.924ZM481.281 155.49V132.567H553.81V155.49H481.281ZM481.281 103.376V80.4532H548.438V103.376H481.281ZM481.281 53.0533V30.1305H553.81V53.0533H481.281Z" fill="FILL_TECH"/>
<path d="M628.307 158.355C616.248 158.355 605.682 155.609 596.609 150.117C587.535 144.625 580.491 136.984 575.477 127.194C570.582 117.285 568.134 105.823 568.134 92.81C568.134 79.6772 570.582 68.2158 575.477 58.4258C580.491 48.6359 587.535 40.9949 596.609 35.503C605.682 30.0111 616.248 27.2651 628.307 27.2651C640.723 27.2651 651.647 30.4887 661.079 36.9357C670.511 43.3827 677.137 52.2176 680.957 63.4402L659.646 69.7081L657.676 69.35C655.408 63.3805 651.588 58.7243 646.215 55.3814C640.962 51.9191 634.992 50.1879 628.307 50.1879C620.904 50.1879 614.517 51.9788 609.145 55.5605C603.772 59.0228 599.593 63.9774 596.609 70.4245C593.743 76.7521 592.311 84.214 592.311 92.81C592.311 101.406 593.743 108.928 596.609 115.375C599.593 121.702 603.772 126.657 609.145 130.239C614.517 133.701 620.904 135.432 628.307 135.432C634.992 135.432 640.962 133.761 646.215 130.418C651.588 126.955 655.408 122.24 657.676 116.27L659.646 115.912L680.957 122.18C677.137 133.402 670.511 142.237 661.079 148.684C651.647 155.131 640.723 158.355 628.307 158.355Z" fill="FILL_TECH"/>
<path d="M779.31 155.49V30.1305H803.486V155.49H779.31ZM698.901 155.49V30.1305H723.077V155.49H698.901ZM711.258 102.481V79.5578H792.741V102.481H711.258Z" fill="FILL_TECH"/>
`;

const PATH_HUB_HORIZONTAL = `
<path d="M475.963 311.944V186.585H481.336V311.944H475.963ZM393.585 311.944V186.585H398.957V311.944H393.585ZM396.629 249.981V244.966H479.903V249.981H396.629Z" fill="FILL_HUB"/>
<path d="M559.852 313.377C550.301 313.377 542.182 311.466 535.496 307.646C528.93 303.706 523.916 298.155 520.453 290.991C517.11 283.708 515.439 275.053 515.439 265.024V186.585H520.811V265.382C520.811 278.993 524.095 289.558 530.661 297.08C537.347 304.602 547.077 308.362 559.852 308.362C572.626 308.362 582.297 304.602 588.863 297.08C595.549 289.558 598.892 278.993 598.892 265.382V186.585H604.265V265.024C604.265 275.053 602.534 283.708 599.071 290.991C595.728 298.155 590.774 303.706 584.207 307.646C577.641 311.466 569.522 313.377 559.852 313.377Z" fill="FILL_HUB"/>
<path d="M641.117 311.944V306.93H681.232C691.38 306.93 699.14 304.184 704.513 298.692C710.005 293.2 712.751 285.857 712.751 276.664C712.751 267.71 709.945 260.666 704.334 255.532C698.842 250.399 691.261 247.832 681.59 247.832H641.117V242.817H678.366C684.097 242.817 689.052 241.683 693.23 239.415C697.409 237.146 700.633 234.102 702.901 230.282C705.169 226.342 706.304 222.103 706.304 217.567C706.304 209.926 703.916 203.717 699.14 198.942C694.365 194.047 687.321 191.599 678.008 191.599H641.117V186.585H678.008C688.634 186.585 696.872 189.51 702.722 195.36C708.691 201.091 711.676 208.493 711.676 217.567C711.676 222.103 710.661 226.282 708.632 230.102C706.721 233.923 704.095 237.206 700.752 239.952C697.409 242.579 693.648 244.489 689.47 245.683V244.071C695.678 244.787 700.871 246.698 705.05 249.802C709.348 252.906 712.572 256.786 714.721 261.442C716.989 266.098 718.123 271.172 718.123 276.664C718.123 287.171 714.84 295.707 708.274 302.273C701.826 308.721 692.813 311.944 681.232 311.944H641.117ZM638.252 311.944V186.585H643.624V311.944H638.252Z" fill="FILL_HUB"/>
`;

// Vector Paths for Vertical / Stacked Layout (from logo-horizontal.svg)
const PATH_VERTICAL_SYMBOL_MAIN =
  'M129.451 217.411C123.102 222.721 105.905 220.601 98.8179 217.015C77.672 206.314 84.3229 185.76 79.0827 167.343C77.5093 161.814 73.1903 155.837 68.7482 152.23C53.6609 138.354 33.6483 148.2 16.949 139.987C-0.136224 131.585 -4.09175 108.946 4.12118 92.8541C15.159 71.2278 36.6338 78.4444 55.4484 74.8354C58.5229 74.2462 64.407 70.1043 67.2631 68.3039C87.1082 57.5679 77.7672 31.7163 85.6099 16.921C99.34 -8.97919 139.812 -4.02705 148.206 24.1425C151.264 34.4081 150.281 42.2856 145.857 51.2032C134.986 74.2844 114.125 65.6927 96.0354 71.0895C68.742 79.2317 67.423 110.463 74.6705 132.247C99.0056 166.323 119.675 134.399 143.004 165.259C155.95 182.385 148.906 209.326 129.451 217.411Z';

const PATH_VERTICAL_SYMBOL_SUB =
  'M178.832 77.5667C196.9 75.2696 213.418 88.0255 215.752 106.078C218.084 124.131 205.353 140.663 187.293 143.03C169.185 145.403 152.588 132.636 150.248 114.534C147.909 96.4324 160.715 79.8701 178.832 77.5667Z';

const PATH_TECH_VERTICAL = `
<path d="M17.7148 294.789V234.003H29.4379V294.789H17.7148ZM0 245.118V234.003H47.1527V245.118H0Z" fill="FILL_TECH"/>
<path d="M54.9688 294.789V234.003H66.6918V294.789H54.9688ZM60.9606 294.789V283.674H96.1297V294.789H60.9606ZM60.9606 269.52V258.404H93.5246V269.52H60.9606ZM60.9606 245.118V234.003H96.1297V245.118H60.9606Z" fill="FILL_TECH"/>
<path d="M132.253 296.179C126.406 296.179 121.282 294.847 116.883 292.184C112.483 289.521 109.067 285.816 106.636 281.069C104.262 276.264 103.075 270.706 103.075 264.396C103.075 258.028 104.262 252.471 106.636 247.723C109.067 242.976 112.483 239.271 116.883 236.608C121.282 233.945 126.406 232.614 132.253 232.614C138.273 232.614 143.571 234.177 148.144 237.303C152.717 240.429 155.93 244.713 157.783 250.155L147.449 253.194L146.494 253.021C145.394 250.126 143.542 247.868 140.937 246.247C138.389 244.568 135.495 243.729 132.253 243.729C128.663 243.729 125.566 244.597 122.961 246.334C120.356 248.013 118.33 250.415 116.883 253.542C115.493 256.61 114.798 260.228 114.798 264.396C114.798 268.564 115.493 272.212 116.883 275.338C118.33 278.406 120.356 280.809 122.961 282.545C125.566 284.224 128.663 285.064 132.253 285.064C135.495 285.064 138.389 284.253 140.937 282.632C143.542 280.953 145.394 278.667 146.494 275.772L147.449 275.598L157.783 278.638C155.93 284.079 152.717 288.363 148.144 291.49C143.571 294.616 138.273 296.179 132.253 296.179Z" fill="FILL_TECH"/>
<path d="M205.474 294.789V234.003H217.197V294.789H205.474ZM166.484 294.789V234.003H178.207V294.789H166.484ZM172.475 269.086V257.97H211.987V269.086H172.475Z" fill="FILL_TECH"/>
`;

const PATH_HUB_VERTICAL = `
<path d="M54.4469 371.297V310.51H57.052V371.297H54.4469ZM14.5017 371.297V310.51H17.1068V371.297H14.5017ZM15.9779 341.251V338.819H56.3573V341.251H15.9779Z" fill="FILL_HUB"/>
<path d="M95.1242 371.991C90.4928 371.991 86.5562 371.065 83.3143 369.212C80.1302 367.302 77.6988 364.61 76.0199 361.137C74.399 357.605 73.5885 353.408 73.5885 348.545V310.51H76.1936V348.719C76.1936 355.318 77.7856 360.442 80.9697 364.089C84.2116 367.736 88.9298 369.56 95.1242 369.56C101.319 369.56 106.008 367.736 109.192 364.089C112.434 360.442 114.055 355.318 114.055 348.719V310.51H116.66V348.545C116.66 353.408 115.82 357.605 114.142 361.137C112.521 364.61 110.118 367.302 106.934 369.212C103.75 371.065 99.8134 371.991 95.1242 371.991Z" fill="FILL_HUB"/>
<path d="M134.529 371.297V368.865H153.981C158.902 368.865 162.665 367.534 165.27 364.871C167.933 362.208 169.264 358.647 169.264 354.19C169.264 349.848 167.904 346.432 165.183 343.943C162.52 341.453 158.844 340.209 154.155 340.209H134.529V337.777H152.592C155.37 337.777 157.773 337.227 159.799 336.127C161.825 335.027 163.388 333.551 164.488 331.699C165.588 329.788 166.138 327.733 166.138 325.533C166.138 321.828 164.98 318.818 162.665 316.502C160.349 314.129 156.933 312.942 152.418 312.942H134.529V310.51H152.418C157.57 310.51 161.565 311.929 164.401 314.765C167.296 317.544 168.743 321.133 168.743 325.533C168.743 327.733 168.251 329.759 167.267 331.612C166.341 333.464 165.067 335.056 163.446 336.388C161.825 337.661 160.002 338.588 157.975 339.167V338.385C160.986 338.732 163.504 339.659 165.53 341.164C167.614 342.669 169.178 344.551 170.22 346.808C171.319 349.066 171.869 351.527 171.869 354.19C171.869 359.284 170.277 363.423 167.093 366.607C163.967 369.733 159.596 371.297 153.981 371.297H134.529ZM133.14 371.297V310.51H135.745V371.297H133.14Z" fill="FILL_HUB"/>
`;

// Helper to assemble SVG
function buildHorizontalLogoSvg(opts: {
  symbolFillMain: string;
  symbolFillSub: string;
  defs?: string;
  techFill: string;
  hubFill: string;
}): string {
  const tech = PATH_TECH_HORIZONTAL.replace(/FILL_TECH/g, opts.techFill);
  const hub = PATH_HUB_HORIZONTAL.replace(/FILL_HUB/g, opts.hubFill);
  const defs = opts.defs ? `<defs>${opts.defs}</defs>` : '';

  return `<svg width="804" height="341" viewBox="0 0 804 341" fill="none" xmlns="http://www.w3.org/2000/svg">
${defs}
<path d="${SYMBOL_PATH_MAIN}" fill="${opts.symbolFillMain}"/>
<path d="${SYMBOL_PATH_SUB}" fill="${opts.symbolFillSub}"/>
${tech}
${hub}
</svg>`;
}

function buildVerticalLogoSvg(opts: {
  symbolFillMain: string;
  symbolFillSub: string;
  defs?: string;
  techFill: string;
  hubFill: string;
}): string {
  const tech = PATH_TECH_VERTICAL.replace(/FILL_TECH/g, opts.techFill);
  const hub = PATH_HUB_VERTICAL.replace(/FILL_HUB/g, opts.hubFill);
  const defs = opts.defs ? `<defs>${opts.defs}</defs>` : '';

  return `<svg width="225" height="372" viewBox="0 0 225 372" fill="none" xmlns="http://www.w3.org/2000/svg">
${defs}
<path d="${PATH_VERTICAL_SYMBOL_MAIN}" fill="${opts.symbolFillMain}"/>
<path d="${PATH_VERTICAL_SYMBOL_SUB}" fill="${opts.symbolFillSub}"/>
${tech}
${hub}
</svg>`;
}

function buildSymbolSvg(opts: {
  fillMain: string;
  fillSub: string;
  defs?: string;
}): string {
  const defs = opts.defs ? `<defs>${opts.defs}</defs>` : '';
  return `<svg width="225" height="230" viewBox="0 0 225 230" fill="none" xmlns="http://www.w3.org/2000/svg">
${defs}
<path d="${PATH_VERTICAL_SYMBOL_MAIN}" fill="${opts.fillMain}"/>
<path d="${PATH_VERTICAL_SYMBOL_SUB}" fill="${opts.fillSub}"/>
</svg>`;
}

function buildWordmarkSvg(opts: {
  techFill: string;
  hubFill: string;
}): string {
  const tech = PATH_TECH_HORIZONTAL.replace(/FILL_TECH/g, opts.techFill);
  const hub = PATH_HUB_HORIZONTAL.replace(/FILL_HUB/g, opts.hubFill);
  return `<svg width="460" height="341" viewBox="350 0 460 341" fill="none" xmlns="http://www.w3.org/2000/svg">
${tech}
${hub}
</svg>`;
}

// Gradients definitions
const GRADIENT_DEFS_HORIZONTAL = `
<linearGradient id="p0_h_grad" x1="0" y1="340.642" x2="316.757" y2="125.307" gradientUnits="userSpaceOnUse">
  <stop stop-color="#0059FF"/>
  <stop offset="0.42" stop-color="#4169FF"/>
  <stop offset="0.72" stop-color="#8B7CFF"/>
  <stop offset="1" stop-color="#D8D3FF"/>
</linearGradient>
<linearGradient id="p1_h_grad" x1="231.57" y1="221.286" x2="333.501" y2="119.293" gradientUnits="userSpaceOnUse">
  <stop stop-color="#7F7FFC"/>
  <stop offset="0.38" stop-color="#9FA2FC"/>
  <stop offset="0.68" stop-color="#B8BDFC"/>
  <stop offset="1" stop-color="#D3DDFC"/>
</linearGradient>
`;

const GRADIENT_DEFS_VERTICAL = `
<linearGradient id="p0_v_grad" x1="0" y1="220.614" x2="205.145" y2="81.1542" gradientUnits="userSpaceOnUse">
  <stop stop-color="#0059FF"/>
  <stop offset="0.42" stop-color="#4169FF"/>
  <stop offset="0.72" stop-color="#8B7CFF"/>
  <stop offset="1" stop-color="#D8D3FF"/>
</linearGradient>
<linearGradient id="p1_v_grad" x1="149.973" y1="143.314" x2="215.987" y2="77.259" gradientUnits="userSpaceOnUse">
  <stop stop-color="#7F7FFC"/>
  <stop offset="0.38" stop-color="#9FA2FC"/>
  <stop offset="0.68" stop-color="#B8BDFC"/>
  <stop offset="1" stop-color="#D3DDFC"/>
</linearGradient>
`;

export const BRAND_ASSETS: BrandAsset[] = [
  // 1. LOGO HORIZONTAL
  {
    id: 'logo-horizontal-color',
    name: 'Logo Horizontal — Colorida',
    category: 'horizontal',
    variant: 'color',
    variantLabel: 'Versão Oficial / Colorida',
    description: 'Uso primário em cabeçalhos, apresentações, assinaturas e fundos claros.',
    bestOn: 'light',
    width: 804,
    height: 341,
    viewBox: '0 0 804 341',
    aspectRatio: '804 / 341',
    svgContent: buildHorizontalLogoSvg({
      symbolFillMain: 'url(#p0_h_grad)',
      symbolFillSub: 'url(#p1_h_grad)',
      defs: GRADIENT_DEFS_HORIZONTAL,
      techFill: '#081220',
      hubFill: '#081220',
    }),
  },
  {
    id: 'logo-horizontal-white',
    name: 'Logo Horizontal — Branca',
    category: 'horizontal',
    variant: 'white',
    variantLabel: 'Versão Branca (Dark Mode)',
    description: 'Para aplicação sobre fundos escuros, fotos ou superfícies de alto contraste.',
    bestOn: 'dark',
    width: 804,
    height: 341,
    viewBox: '0 0 804 341',
    aspectRatio: '804 / 341',
    svgContent: buildHorizontalLogoSvg({
      symbolFillMain: '#FFFFFF',
      symbolFillSub: '#FFFFFF',
      techFill: '#FFFFFF',
      hubFill: '#FFFFFF',
    }),
  },
  {
    id: 'logo-horizontal-black',
    name: 'Logo Horizontal — Preta',
    category: 'horizontal',
    variant: 'black',
    variantLabel: 'Versão Monocromática Preta',
    description: 'Para impressão monocromática, carimbos, documentos P&B e notas fiscais.',
    bestOn: 'light',
    width: 804,
    height: 341,
    viewBox: '0 0 804 341',
    aspectRatio: '804 / 341',
    svgContent: buildHorizontalLogoSvg({
      symbolFillMain: '#000000',
      symbolFillSub: '#000000',
      techFill: '#000000',
      hubFill: '#000000',
    }),
  },
  {
    id: 'logo-horizontal-gray',
    name: 'Logo Horizontal — Cinza / Slate',
    category: 'horizontal',
    variant: 'gray',
    variantLabel: 'Versão Neutra / Cinza',
    description: 'Para aplicações discretas, rodapés secundários ou marcas d’água.',
    bestOn: 'light',
    width: 804,
    height: 341,
    viewBox: '0 0 804 341',
    aspectRatio: '804 / 341',
    svgContent: buildHorizontalLogoSvg({
      symbolFillMain: '#64748B',
      symbolFillSub: '#94A3B8',
      techFill: '#475569',
      hubFill: '#64748B',
    }),
  },

  // 2. LOGO VERTICAL / EMPILHADA
  {
    id: 'logo-vertical-color',
    name: 'Logo Vertical — Colorida',
    category: 'vertical',
    variant: 'color',
    variantLabel: 'Versão Oficial / Colorida',
    description: 'Uso em cartões de visita, crachás, banners verticais e avatares ampliados.',
    bestOn: 'light',
    width: 225,
    height: 372,
    viewBox: '0 0 225 372',
    aspectRatio: '225 / 372',
    svgContent: buildVerticalLogoSvg({
      symbolFillMain: 'url(#p0_v_grad)',
      symbolFillSub: 'url(#p1_v_grad)',
      defs: GRADIENT_DEFS_VERTICAL,
      techFill: '#081220',
      hubFill: '#081220',
    }),
  },
  {
    id: 'logo-vertical-white',
    name: 'Logo Vertical — Branca',
    category: 'vertical',
    variant: 'white',
    variantLabel: 'Versão Branca (Dark Mode)',
    description: 'Aplicação vertical sobre fundos escuros ou backgrounds coloridos.',
    bestOn: 'dark',
    width: 225,
    height: 372,
    viewBox: '0 0 225 372',
    aspectRatio: '225 / 372',
    svgContent: buildVerticalLogoSvg({
      symbolFillMain: '#FFFFFF',
      symbolFillSub: '#FFFFFF',
      techFill: '#FFFFFF',
      hubFill: '#FFFFFF',
    }),
  },
  {
    id: 'logo-vertical-black',
    name: 'Logo Vertical — Preta',
    category: 'vertical',
    variant: 'black',
    variantLabel: 'Versão Monocromática Preta',
    description: 'Aplicação vertical em impressos monocromáticos e materiais institucionais.',
    bestOn: 'light',
    width: 225,
    height: 372,
    viewBox: '0 0 225 372',
    aspectRatio: '225 / 372',
    svgContent: buildVerticalLogoSvg({
      symbolFillMain: '#000000',
      symbolFillSub: '#000000',
      techFill: '#000000',
      hubFill: '#000000',
    }),
  },
  {
    id: 'logo-vertical-gray',
    name: 'Logo Vertical — Cinza / Slate',
    category: 'vertical',
    variant: 'gray',
    variantLabel: 'Versão Neutra / Cinza',
    description: 'Aplicação sutil em embalagens, selos neutros ou fundos claros.',
    bestOn: 'light',
    width: 225,
    height: 372,
    viewBox: '0 0 225 372',
    aspectRatio: '225 / 372',
    svgContent: buildVerticalLogoSvg({
      symbolFillMain: '#64748B',
      symbolFillSub: '#94A3B8',
      techFill: '#475569',
      hubFill: '#64748B',
    }),
  },

  // 3. SÍMBOLO / ÍCONE
  {
    id: 'simbolo-gradient',
    name: 'Símbolo — Gradiente Oficial',
    category: 'symbol',
    variant: 'color',
    variantLabel: 'Gradiente Oficial Tech Hub',
    description: 'Ícone para perfis de redes sociais, favicons, apps e selos de autenticidade.',
    bestOn: 'any',
    width: 225,
    height: 230,
    viewBox: '0 0 225 230',
    aspectRatio: '1 / 1',
    svgContent: buildSymbolSvg({
      fillMain: 'url(#p0_v_grad)',
      fillSub: 'url(#p1_v_grad)',
      defs: GRADIENT_DEFS_VERTICAL,
    }),
  },
  {
    id: 'simbolo-white',
    name: 'Símbolo — Branco',
    category: 'symbol',
    variant: 'white',
    variantLabel: 'Silhueta Branca',
    description: 'Uso em fundos escuros, botões de ação e aplicações em tecido/brindes.',
    bestOn: 'dark',
    width: 225,
    height: 230,
    viewBox: '0 0 225 230',
    aspectRatio: '1 / 1',
    svgContent: buildSymbolSvg({
      fillMain: '#FFFFFF',
      fillSub: '#FFFFFF',
    }),
  },
  {
    id: 'simbolo-black',
    name: 'Símbolo — Preto',
    category: 'symbol',
    variant: 'black',
    variantLabel: 'Silhueta Preta',
    description: 'Uso em impressão em escala de cinza e matrizes de gravação a laser.',
    bestOn: 'light',
    width: 225,
    height: 230,
    viewBox: '0 0 225 230',
    aspectRatio: '1 / 1',
    svgContent: buildSymbolSvg({
      fillMain: '#000000',
      fillSub: '#000000',
    }),
  },
  {
    id: 'simbolo-blue',
    name: 'Símbolo — Azul Tech',
    category: 'symbol',
    variant: 'color',
    variantLabel: 'Azul Sólido #2563EB',
    description: 'Uso quando não for permitida a reprodução de degradês (ex.: bordados).',
    bestOn: 'light',
    width: 225,
    height: 230,
    viewBox: '0 0 225 230',
    aspectRatio: '1 / 1',
    svgContent: buildSymbolSvg({
      fillMain: '#2563EB',
      fillSub: '#60A5FA',
    }),
  },

  // 4. SOMENTE TEXTO / WORDMARK
  {
    id: 'wordmark-dark',
    name: 'Wordmark — Escura',
    category: 'wordmark',
    variant: 'black',
    variantLabel: 'Tipografia Escura (#081220)',
    description: 'Somente a tipografia institucional TECH HUB para uso em cabeçalhos editoriais.',
    bestOn: 'light',
    width: 460,
    height: 341,
    viewBox: '350 0 460 341',
    aspectRatio: '460 / 341',
    svgContent: buildWordmarkSvg({
      techFill: '#081220',
      hubFill: '#081220',
    }),
  },
  {
    id: 'wordmark-white',
    name: 'Wordmark — Branca',
    category: 'wordmark',
    variant: 'white',
    variantLabel: 'Tipografia Branca (#FFFFFF)',
    description: 'Somente a tipografia institucional TECH HUB para fundos escuros e fotos.',
    bestOn: 'dark',
    width: 460,
    height: 341,
    viewBox: '350 0 460 341',
    aspectRatio: '460 / 341',
    svgContent: buildWordmarkSvg({
      techFill: '#FFFFFF',
      hubFill: '#FFFFFF',
    }),
  },
  {
    id: 'wordmark-gray',
    name: 'Wordmark — Cinza',
    category: 'wordmark',
    variant: 'gray',
    variantLabel: 'Tipografia Cinza Neutro',
    description: 'Somente a tipografia institucional TECH HUB para rodapés e sub-títulos.',
    bestOn: 'light',
    width: 460,
    height: 341,
    viewBox: '350 0 460 341',
    aspectRatio: '460 / 341',
    svgContent: buildWordmarkSvg({
      techFill: '#475569',
      hubFill: '#64748B',
    }),
  },
];

/** Downloads single SVG file */
export function downloadSvg(asset: BrandAsset) {
  const blob = new Blob([asset.svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `techhub-${asset.id}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Converts SVG to high-res transparent PNG and downloads */
export async function downloadPng(asset: BrandAsset, targetWidth = 2000): Promise<void> {
  return new Promise((resolve, reject) => {
    const scale = targetWidth / asset.width;
    const targetHeight = Math.round(asset.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    const img = new Image();
    const svgBlob = new Blob([asset.svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to generate PNG blob'));
          return;
        }
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `techhub-${asset.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        resolve();
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG for PNG conversion'));
    };

    img.src = url;
  });
}

/** Downloads complete ZIP with all SVGs and PNGs */
export async function downloadAllAssetsZip(onProgress?: (percent: number) => void): Promise<void> {
  const zip = new JSZip();

  const folders = {
    horizontal: zip.folder('01-logo-horizontal'),
    vertical: zip.folder('02-logo-vertical'),
    symbol: zip.folder('03-simbolo-icone'),
    wordmark: zip.folder('04-wordmark-texto'),
  };

  const total = BRAND_ASSETS.length;
  let done = 0;

  for (const asset of BRAND_ASSETS) {
    const targetFolder = folders[asset.category] || zip;
    // Add SVG
    targetFolder.file(`techhub-${asset.id}.svg`, asset.svgContent);

    // Render PNG blob
    try {
      const pngBlob = await new Promise<Blob | null>((resolve) => {
        const targetWidth = 2000;
        const scale = targetWidth / asset.width;
        const targetHeight = Math.round(asset.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);

        const img = new Image();
        const svgBlob = new Blob([asset.svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          URL.revokeObjectURL(url);
          canvas.toBlob((b) => resolve(b), 'image/png');
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(null);
        };
        img.src = url;
      });

      if (pngBlob) {
        targetFolder.file(`techhub-${asset.id}.png`, pngBlob);
      }
    } catch {
      // Continue if PNG conversion encounters canvas limitation
    }

    done++;
    if (onProgress) onProgress(Math.round((done / total) * 100));
  }

  // Add Readme / Brand Guidelines info file
  zip.file(
    'LEIAME-GUIA-MARCA-TECH-HUB.txt',
    `TECH HUB — GUIA DE IDENTIDADE VISUAL & ASSETS DE MARCA
=====================================================

1. CORES OFICIAIS:
- Azul Elétrico: #0059FF / #2563EB
- Gradiente Oficial: #0059FF -> #4169FF -> #8B7CFF -> #D8D3FF
- Escuro Noturno (Night): #081220
- Branco Puro: #FFFFFF
- Cinza Neutro (Slate): #64748B

2. TIPOGRAFIA OFICIAL:
- Display / Títulos: Fustat (Pesos: Light, Medium, SemiBold, ExtraBold)
- Texto / Corpo: Inter Tight (Pesos: Regular, Medium, SemiBold)

3. ESTRUTURA DOS ARQUIVOS:
- 01-logo-horizontal: Versões horizontais para cabeçalhos e apresentações.
- 02-logo-vertical: Versões verticais empilhadas para avatares e crachás.
- 03-simbolo-icone: Símbolo isolado (favicon, apps, redes sociais).
- 04-wordmark-texto: Somente tipografia TECH HUB.

Todos os arquivos estão disponíveis nos formatos vetor (.SVG) e alta resolução transparente (.PNG 2000px).
`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'TechHub-Brand-Assets-Completo.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
