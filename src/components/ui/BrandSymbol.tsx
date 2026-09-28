import React, { useId } from 'react';

export const BRAND_BODY = 'M199.88 335.697C190.077 343.896 163.524 340.623 152.581 335.086C119.931 318.563 130.2 286.826 122.109 258.388C119.679 249.851 113.011 240.623 106.152 235.054C82.856 213.628 51.9552 228.83 26.1703 216.149C-0.210339 203.175 -6.31793 168.22 6.36338 143.373C23.4065 109.98 56.565 121.123 85.616 115.551C90.3632 114.641 99.4486 108.246 103.859 105.466C134.501 88.8887 120.078 48.9721 132.187 26.1272C153.388 -13.8645 215.879 -6.21803 228.839 37.2777C233.562 53.1284 232.044 65.2917 225.213 79.0611C208.427 114.7 176.216 101.434 148.285 109.767C106.142 122.339 104.106 170.563 115.296 204.199C152.871 256.813 184.785 207.52 220.808 255.171C240.797 281.615 229.921 323.213 199.88 335.697Z';
export const BRAND_DOT = 'M276.132 119.768C304.03 116.221 329.535 135.917 333.138 163.792C336.739 191.666 317.081 217.194 289.195 220.848C261.235 224.512 235.609 204.799 231.996 176.849C228.384 148.898 248.157 123.325 276.132 119.768Z';

/** The original Tech Hub symbol supplied by the brand, not an approximation. */
export const BrandSymbol: React.FC<{ className?: string; outline?: boolean }> = ({ className, outline = false }) => {
  const id = 'brand-' + useId().replace(/:/g, '');
  return <svg className={className} viewBox="-8 -8 350 357" fill="none" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" y1="340.642" x2="316.757" y2="125.307" gradientUnits="userSpaceOnUse"><stop stopColor="#0059ff"/><stop offset=".42" stopColor="#4169ff"/><stop offset=".72" stopColor="#8b7cff"/><stop offset="1" stopColor="#d8d3ff"/></linearGradient><linearGradient id={id+'-dot'} x1="231.57" y1="221.286" x2="333.501" y2="119.293" gradientUnits="userSpaceOnUse"><stop stopColor="#7F7FFC"/><stop offset=".38" stopColor="#9FA2FC"/><stop offset=".68" stopColor="#B8BDFC"/><stop offset="1" stopColor="#D3DDFC"/></linearGradient></defs>
    <path d={BRAND_BODY} fill={outline?'none':`url(#${id})`} stroke={outline?'currentColor':undefined} strokeWidth="1.2"/>
    <path d={BRAND_DOT} fill={outline?'none':`url(#${id}-dot)`} stroke={outline?'currentColor':undefined} strokeWidth="1.2"/>
  </svg>;
};
