import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className, variant = 'dark' }) => {
  return (
    <a href="/" aria-label="Tech Hub, ir para o início" className={cn('inline-flex items-center gap-3 select-none group', className)}>
      {/* SVG Icon mark with official gradient */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 225 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-normal ease-smooth group-hover:scale-105"
      >
        <path
          d="M129.451 217.411C123.102 222.721 105.905 220.601 98.8179 217.015C77.672 206.314 84.3229 185.76 79.0827 167.343C77.5093 161.814 73.1903 155.837 68.7482 152.23C53.6609 138.354 33.6483 148.2 16.949 139.987C-0.136224 131.585 -4.09175 108.946 4.12118 92.8541C15.159 71.2278 36.6338 78.4444 55.4484 74.8354C58.5229 74.2462 64.407 70.1043 67.2631 68.3039C87.1082 57.5679 77.7672 31.7163 85.6099 16.921C99.34 -8.97919 139.812 -4.02705 148.206 24.1425C151.264 34.4081 150.281 42.2856 145.857 51.2032C134.986 74.2844 114.125 65.6927 96.0354 71.0895C68.742 79.2317 67.423 110.463 74.6705 132.247C99.0056 166.323 119.675 134.399 143.004 165.259C155.95 182.385 148.906 209.326 129.451 217.411Z"
          fill="url(#paint0_linear_logo)"
        />
        <path
          d="M178.832 77.5667C196.9 75.2696 213.418 88.0255 215.752 106.078C218.084 124.131 205.353 140.663 187.293 143.03C169.185 145.403 152.588 132.636 150.248 114.534C147.909 96.4324 160.715 79.8701 178.832 77.5667Z"
          fill="url(#paint1_linear_logo)"
        />
        <defs>
          <linearGradient id="paint0_linear_logo" x1="0" y1="220.614" x2="205.145" y2="81.1542" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0059FF" />
            <stop offset="0.42" stopColor="#4169FF" />
            <stop offset="0.72" stopColor="#8B7CFF" />
            <stop offset="1" stopColor="#D8D3FF" />
          </linearGradient>
          <linearGradient id="paint1_linear_logo" x1="149.973" y1="143.314" x2="215.987" y2="77.259" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7F7FFC" />
            <stop offset="0.38" stopColor="#9FA2FC" />
            <stop offset="0.68" stopColor="#B8BDFC" />
            <stop offset="1" stopColor="#D3DDFC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark in Fustat font */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-extrabold text-[17px] tracking-tight',
            variant === 'white' ? 'text-white' : 'text-[#081220]'
          )}
        >
          TECH
        </span>{' '}
        <span
          className={cn(
            'font-display font-light text-[11px] tracking-[0.25em]',
            variant === 'white' ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          HUB
        </span>
      </div>
    </a>
  );
};
