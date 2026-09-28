export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  role: string;
  category: 'core' | 'support';
}

export interface SemanticToken {
  token: string;
  mapsTo: string;
  description: string;
  category: 'background' | 'surface' | 'text' | 'brand' | 'border' | 'state';
}

export interface GradientToken {
  id: string;
  name: string;
  token: string;
  stops: string[];
  description: string;
}

export interface TypographyToken {
  name: string;
  font: 'Fustat' | 'Inter Tight';
  size: string;
  lineHeight: string;
  tracking: string;
  usage: string;
}

export interface SpacingToken {
  name: string;
  rem: string;
  px: string;
}

/* ==========================================================================
   COLOR TOKENS DATA
   ========================================================================== */
export const primitiveColors: ColorToken[] = [
  // Core
  { name: 'Night', variable: '--color-primitive-night', hex: '#081220', role: 'Dark Base / Primary Canvas', category: 'core' },
  { name: 'Blue', variable: '--color-primitive-blue', hex: '#2563EB', role: 'Brand Primary / Lead Action', category: 'core' },
  { name: 'Sky', variable: '--color-primitive-sky', hex: '#00BAFF', role: 'Accent / Cyan Energy', category: 'core' },
  { name: 'Violet', variable: '--color-primitive-violet', hex: '#7C3AED', role: 'Brand Secondary / Tech Depth', category: 'core' },
  { name: 'Lilac', variable: '--color-primitive-lilac', hex: '#C4B5FD', role: 'Highlight / Soft Glow', category: 'core' },
  { name: 'Ice', variable: '--color-primitive-ice', hex: '#EAF2FF', role: 'Light Canvas / Secondary Text', category: 'core' },
  { name: 'White', variable: '--color-primitive-white', hex: '#FFFFFF', role: 'Pure Light / Primary Text', category: 'core' },

  // Support
  { name: 'Coral', variable: '--color-primitive-coral', hex: '#FF7A5C', role: 'Danger / High Alert Support', category: 'support' },
  { name: 'Peach', variable: '--color-primitive-peach', hex: '#FFB08A', role: 'Warning / Warm Support', category: 'support' },
  { name: 'Mint', variable: '--color-primitive-mint', hex: '#00FFA2', role: 'Success / Tech Confirmation', category: 'support' },
  { name: 'Slate', variable: '--color-primitive-slate', hex: '#94A3B8', role: 'Muted Neutral / Inactive', category: 'support' },
];

export const semanticColors: SemanticToken[] = [
  // Backgrounds
  { token: '--color-bg-primary', mapsTo: '#081220 (Night)', description: 'Primary page background', category: 'background' },
  { token: '--color-bg-secondary', mapsTo: '#0B182B (Deep Navy)', description: 'Secondary section background', category: 'background' },
  { token: '--color-bg-dark', mapsTo: '#081220 (Night)', description: 'Always-dark background surface', category: 'background' },
  { token: '--color-bg-light', mapsTo: '#EAF2FF (Ice)', description: 'Light surface alternative', category: 'background' },

  // Surfaces
  { token: '--color-surface', mapsTo: 'rgba(255, 255, 255, 0.04)', description: 'Base component card surface', category: 'surface' },
  { token: '--color-surface-elevated', mapsTo: 'rgba(255, 255, 255, 0.08)', description: 'Elevated floating card surface', category: 'surface' },
  { token: '--color-surface-glass', mapsTo: 'rgba(8, 18, 32, 0.70)', description: 'Frosted backdrop blur container', category: 'surface' },

  // Text
  { token: '--color-text-primary', mapsTo: '#FFFFFF (White)', description: 'Primary headlines & high-contrast body', category: 'text' },
  { token: '--color-text-secondary', mapsTo: '#EAF2FF (Ice)', description: 'Secondary body & supporting descriptions', category: 'text' },
  { token: '--color-text-muted', mapsTo: '#94A3B8 (Slate)', description: 'Captions, labels & de-emphasized info', category: 'text' },
  { token: '--color-text-inverse', mapsTo: '#081220 (Night)', description: 'Dark text over light buttons/surfaces', category: 'text' },

  // Brand
  { token: '--color-brand-primary', mapsTo: '#2563EB (Blue)', description: 'Primary action color & core identity', category: 'brand' },
  { token: '--color-brand-secondary', mapsTo: '#7C3AED (Violet)', description: 'Secondary brand depth & tech aura', category: 'brand' },
  { token: '--color-brand-accent', mapsTo: '#00BAFF (Sky)', description: 'Electric focal points & active indicators', category: 'brand' },
  { token: '--color-brand-highlight', mapsTo: '#C4B5FD (Lilac)', description: 'Soft luminous gradients & sub-accents', category: 'brand' },

  // Borders
  { token: '--color-border', mapsTo: 'rgba(255, 255, 255, 0.12)', description: 'Default subtle UI boundary', category: 'border' },
  { token: '--color-border-subtle', mapsTo: 'rgba(255, 255, 255, 0.06)', description: 'Very delicate card outline', category: 'border' },
  { token: '--color-border-bright', mapsTo: 'rgba(0, 186, 255, 0.40)', description: 'Active hover or highlighted border', category: 'border' },

  // State
  { token: '--color-success', mapsTo: '#00FFA2 (Mint)', description: 'Success indicators & active states', category: 'state' },
  { token: '--color-warning', mapsTo: '#FFB08A (Peach)', description: 'Warning alerts & pending notices', category: 'state' },
  { token: '--color-danger', mapsTo: '#FF7A5C (Coral)', description: 'Error alerts & destructive actions', category: 'state' },
];

/* ==========================================================================
   GRADIENT TOKENS DATA
   ========================================================================== */
export const gradientsData: GradientToken[] = [
  {
    id: '01',
    name: 'ELECTRIC BLUE',
    token: '--gradient-electric',
    stops: ['#071A45', '#0047FF', '#00BAFF', '#EAF2FF'],
    description: 'High energy electric core visual stream',
  },
  {
    id: '02',
    name: 'BLUE / LILAC',
    token: '--gradient-blue-lilac',
    stops: ['#0059FF', '#4169FF', '#8B7CFF', '#D3D3FF'],
    description: 'Sophisticated transition from blue into soft lilac',
  },
  {
    id: '03',
    name: 'AURORA FLUID',
    token: '--gradient-aurora',
    stops: ['#00BAFF', '#2563EB', '#7C3AED', '#C4B5FD'],
    description: 'Multidimensional brand gradient signature',
  },
  {
    id: '04',
    name: 'GLASS LIGHT',
    token: '--gradient-glass',
    stops: ['white', 'glass', 'ice', 'cyan glow'],
    description: 'Frosted luminous overlay with cyan reflection',
  },
  {
    id: '05',
    name: 'DEEP FLUID',
    token: '--gradient-deep',
    stops: ['#020B1C', '#061B4F', '#003DFF', '#151A8A'],
    description: 'Atmospheric deep night space & background anchor',
  },
  {
    id: '06',
    name: 'MATERIAL / HIGHLIGHT',
    token: '--gradient-material',
    stops: ['#081220 base', 'white highlight', 'cyan glow', 'soft blur'],
    description: 'Top-down luminous spotlight & highlight surface',
  },
  {
    id: '07',
    name: 'LIGHT LILAC',
    token: '--gradient-light-lilac',
    stops: ['#7F7FFC', '#9FA2FC', '#B8BDFC', '#D3DDFC'],
    description: 'Delicate pastel spectrum for elevated highlights',
  },
];

/* ==========================================================================
   TYPOGRAPHY DATA
   ========================================================================== */
export const typographyScale: TypographyToken[] = [
  { name: 'display-xl', font: 'Fustat', size: '3.25rem - 6.00rem (52-96px)', lineHeight: '1.05', tracking: '-0.03em', usage: 'Hero primary headline, colossal impact messages' },
  { name: 'display-lg', font: 'Fustat', size: '2.50rem - 4.50rem (40-72px)', lineHeight: '1.10', tracking: '-0.025em', usage: 'Section major headlines, prominent numbers' },
  { name: 'display-md', font: 'Fustat', size: '2.00rem - 3.25rem (32-52px)', lineHeight: '1.15', tracking: '-0.02em', usage: 'Sub-hero statements, major callout headers' },
  { name: 'heading-xl', font: 'Fustat', size: '1.75rem - 2.50rem (28-40px)', lineHeight: '1.20', tracking: '-0.02em', usage: 'H1 / Section level titles' },
  { name: 'heading-lg', font: 'Fustat', size: '1.375rem - 2.00rem (22-32px)', lineHeight: '1.25', tracking: '-0.015em', usage: 'H2 / Card titles & major group headers' },
  { name: 'heading-md', font: 'Fustat', size: '1.1875rem - 1.50rem (19-24px)', lineHeight: '1.30', tracking: '-0.01em', usage: 'H3 / Feature titles & subsection items' },
  { name: 'heading-sm', font: 'Fustat', size: '1.125rem (18px)', lineHeight: '1.40', tracking: '-0.005em', usage: 'H4 / Small module headings' },
  { name: 'body-lg', font: 'Inter Tight', size: '1.125rem (18px)', lineHeight: '1.60', tracking: '0em', usage: 'Lead paragraph body, editorial introductions' },
  { name: 'body-md', font: 'Inter Tight', size: '1.00rem (16px)', lineHeight: '1.60', tracking: '0em', usage: 'Standard interface & content body' },
  { name: 'body-sm', font: 'Inter Tight', size: '0.875rem (14px)', lineHeight: '1.50', tracking: '0em', usage: 'Secondary descriptions & compact metadata' },
  { name: 'label-lg', font: 'Inter Tight', size: '0.875rem (14px)', lineHeight: '1.20', tracking: '+0.04em', usage: 'Button text, top-level navigation, key filters' },
  { name: 'label-md', font: 'Inter Tight', size: '0.75rem (12px)', lineHeight: '1.20', tracking: '+0.05em', usage: 'Section labels, badge pills, category tags' },
  { name: 'label-sm', font: 'Inter Tight', size: '0.6875rem (11px)', lineHeight: '1.20', tracking: '+0.06em', usage: 'Micro badges, system tags, status markers' },
  { name: 'caption', font: 'Inter Tight', size: '0.75rem (12px)', lineHeight: '1.40', tracking: '0em', usage: 'Footnotes, legal text, data captions' },
];

/* ==========================================================================
   SPACING SCALE DATA
   ========================================================================== */
export const spacingScale: SpacingToken[] = [
  { name: 'space-1', rem: '0.25rem', px: '4px' },
  { name: 'space-2', rem: '0.50rem', px: '8px' },
  { name: 'space-3', rem: '0.75rem', px: '12px' },
  { name: 'space-4', rem: '1.00rem', px: '16px' },
  { name: 'space-6', rem: '1.50rem', px: '24px' },
  { name: 'space-8', rem: '2.00rem', px: '32px' },
  { name: 'space-10', rem: '2.50rem', px: '40px' },
  { name: 'space-12', rem: '3.00rem', px: '48px' },
  { name: 'space-16', rem: '4.00rem', px: '64px' },
  { name: 'space-20', rem: '5.00rem', px: '80px' },
  { name: 'space-24', rem: '6.00rem', px: '96px' },
  { name: 'space-32', rem: '8.00rem', px: '128px' },
];

/* ==========================================================================
   BORDER RADIUS & SHADOW DATA
   ========================================================================== */
export const borderRadiusData = [
  { name: 'radius-sm', value: '4px', usage: 'Tooltips, subtle badges, inner elements' },
  { name: 'radius-md', value: '8px', usage: 'Standard inputs, compact items' },
  { name: 'radius-lg', value: '16px', usage: 'Cards, containers, dialogs' },
  { name: 'radius-xl', value: '24px', usage: 'Major feature modules, elevated surfaces' },
  { name: 'radius-pill', value: '9999px', usage: 'Buttons, section tags, status pills' },
];

export const shadowData = [
  { name: 'shadow-xs', value: '0 1px 2px rgba(0, 0, 0, 0.25)', description: 'Minimal elevation for inner items' },
  { name: 'shadow-sm', value: '0 4px 12px rgba(0, 0, 0, 0.3)', description: 'Subtle separation for cards' },
  { name: 'shadow-md', value: '0 8px 24px rgba(0, 0, 0, 0.4)', description: 'Standard card & dropdown elevation' },
  { name: 'shadow-lg', value: '0 16px 48px rgba(0, 0, 0, 0.5)', description: 'High contrast focal elevation' },
  { name: 'shadow-glow', value: '0 0 32px rgba(0, 186, 255, 0.22)', description: 'Cyan electric focal glow' },
  { name: 'shadow-glow-violet', value: '0 0 32px rgba(124, 58, 237, 0.22)', description: 'Violet aura focal glow' },
];
