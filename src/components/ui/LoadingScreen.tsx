import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#081220] select-none"
      role="status"
      aria-live="polite"
      aria-label="Carregando Tech Hub"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-75"
        style={{
          background: 'radial-gradient(circle at 50% 48%, rgba(224, 237, 255, 0.75) 0%, rgba(255, 255, 255, 0) 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        {/* Soft pulse aura */}
        <div
          className="absolute -top-4 w-32 h-32 rounded-full bg-blue-400/15 blur-2xl animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Brand Symbol and Wordmark */}
        <div className="relative flex items-center gap-3.5 mb-6">
          <svg
            width="46"
            height="46"
            viewBox="0 0 225 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 drop-shadow-sm transition-transform"
          >
            <path
              d="M129.451 217.411C123.102 222.721 105.905 220.601 98.8179 217.015C77.672 206.314 84.3229 185.76 79.0827 167.343C77.5093 161.814 73.1903 155.837 68.7482 152.23C53.6609 138.354 33.6483 148.2 16.949 139.987C-0.136224 131.585 -4.09175 108.946 4.12118 92.8541C15.159 71.2278 36.6338 78.4444 55.4484 74.8354C58.5229 74.2462 64.407 70.1043 67.2631 68.3039C87.1082 57.5679 77.7672 31.7163 85.6099 16.921C99.34 -8.97919 139.812 -4.02705 148.206 24.1425C151.264 34.4081 150.281 42.2856 145.857 51.2032C134.986 74.2844 114.125 65.6927 96.0354 71.0895C68.742 79.2317 67.423 110.463 74.6705 132.247C99.0056 166.323 119.675 134.399 143.004 165.259C155.95 182.385 148.906 209.326 129.451 217.411Z"
              fill="url(#paint0_linear_loader)"
            />
            <path
              d="M178.832 77.5667C196.9 75.2696 213.418 88.0255 215.752 106.078C218.084 124.131 205.353 140.663 187.293 143.03C169.185 145.403 152.588 132.636 150.248 114.534C147.909 96.4324 160.715 79.8701 178.832 77.5667Z"
              fill="url(#paint1_linear_loader)"
            />
            <defs>
              <linearGradient id="paint0_linear_loader" x1="0" y1="220.614" x2="205.145" y2="81.1542" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0059FF" />
                <stop offset="0.42" stopColor="#4169FF" />
                <stop offset="0.72" stopColor="#8B7CFF" />
                <stop offset="1" stopColor="#D8D3FF" />
              </linearGradient>
              <linearGradient id="paint1_linear_loader" x1="149.973" y1="143.314" x2="215.987" y2="77.259" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7F7FFC" />
                <stop offset="0.38" stopColor="#9FA2FC" />
                <stop offset="0.68" stopColor="#B8BDFC" />
                <stop offset="1" stopColor="#D3DDFC" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-[22px] tracking-tight text-[#081220]">
              TECH
            </span>
            <span className="font-display font-light text-[13px] tracking-[0.25em] text-slate-500">
              HUB
            </span>
          </div>
        </div>

        {/* Minimal linear progress bar */}
        <div className="w-32 h-[3px] bg-slate-100 rounded-full overflow-hidden relative">
          <div
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-full"
            style={{
              animation: 'techHubLoaderBar 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
        </div>

        {message && (
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mt-4">
            {message}
          </span>
        )}
      </div>

      <style>{`
        @keyframes techHubLoaderBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};
