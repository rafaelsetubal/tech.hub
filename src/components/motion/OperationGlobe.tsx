import React, { useId } from 'react';

/** Vector sphere: lighting, surface and typography stay sharp at every size. */
export const OperationGlobe: React.FC = () => {
  const prefix = `globe-${useId().replace(/:/g, '')}`;
  const paint = (name: string) => `url(#${prefix}-${name})`;
  return <g className="story-core">
    <defs>
      <radialGradient id={`${prefix}-body`} cx="32%" cy="20%" r="85%">
        <stop stopColor="#4397ff" /><stop offset=".3" stopColor="#124ce7" /><stop offset=".62" stopColor="#081b69" /><stop offset="1" stopColor="#040b2e" />
      </radialGradient>
      <radialGradient id={`${prefix}-left`} cx="0%" cy="55%" r="85%">
        <stop stopColor="#b7ffff" /><stop offset=".16" stopColor="#00dbff" stopOpacity=".9" /><stop offset=".5" stopColor="#006bff" stopOpacity=".3" /><stop offset="1" stopColor="#003cff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${prefix}-violet`} cx="92%" cy="8%" r="80%">
        <stop stopColor="#fff0ff" /><stop offset=".16" stopColor="#ed7fff" /><stop offset=".36" stopColor="#8e2eff" stopOpacity=".8" /><stop offset=".76" stopColor="#602bff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${prefix}-bottom`} cx="55%" cy="100%" r="65%">
        <stop stopColor="#8fffff" /><stop offset=".16" stopColor="#00d6ff" stopOpacity=".9" /><stop offset=".62" stopColor="#003cff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${prefix}-shade`}>
        <stop offset=".15" stopColor="#050c35" stopOpacity=".84" /><stop offset=".66" stopColor="#030c39" stopOpacity=".55" /><stop offset="1" stopColor="#081e70" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${prefix}-rim`} x1="0" y1="1" x2="1" y2="0">
        <stop stopColor="#00d9ff" /><stop offset=".32" stopColor="#b9ffff" /><stop offset=".62" stopColor="#55aaff" /><stop offset=".84" stopColor="#ffc8ff" /><stop offset="1" stopColor="#b855ff" />
      </linearGradient>
      <filter id={`${prefix}-bloom`} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="7" /></filter>
      <filter id={`${prefix}-soft`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="2.5" /></filter>
      <clipPath id={`${prefix}-clip`}><circle cx="250" cy="250" r="104" /></clipPath>
    </defs>
    <g fill="none" stroke={paint('rim')}>
      <circle cx="250" cy="250" r="142" strokeWidth=".7" opacity=".3" />
      <circle cx="250" cy="250" r="127" strokeWidth=".6" opacity=".25" strokeDasharray="3 8" />
      <circle cx="250" cy="250" r="106" strokeWidth="15" opacity=".7" filter={paint('bloom')} />
    </g>
    <circle cx="250" cy="250" r="104" fill={paint('body')} />
    <g clipPath={paint('clip')}>
      <circle cx="250" cy="250" r="104" fill={paint('left')} />
      <circle cx="250" cy="250" r="104" fill={paint('violet')} />
      <circle cx="250" cy="250" r="104" fill={paint('bottom')} />
      <g className="globe-surface" transform="rotate(-18 250 250)" fill="none" stroke="#78baff" strokeWidth=".8" opacity=".3">
        <ellipse cx="250" cy="250" rx="57" ry="105" /><ellipse cx="250" cy="250" rx="95" ry="105" />
        <ellipse cx="250" cy="250" rx="108" ry="40" /><path d="M 147 221 Q 248 150 351 220 M 149 285 Q 251 350 352 280" />
      </g>
      <circle cx="250" cy="250" r="97" fill={paint('shade')} />
      <path d="M 159 212 A 99 99 0 0 1 275 153" stroke="#e4ffff" strokeWidth="2" fill="none" opacity=".7" filter={paint('soft')} />
    </g>
    <circle cx="250" cy="250" r="105" fill="none" stroke={paint('rim')} strokeWidth="4" filter={paint('soft')} />
    <circle cx="250" cy="250" r="104.5" fill="none" stroke={paint('rim')} strokeWidth="1.8" />
    <g fill="#d6f5ff" stroke="#84dbff" strokeWidth=".8">
      <circle cx="250" cy="108" r="2.5" /><circle cx="108" cy="250" r="2.5" /><circle cx="392" cy="250" r="2.5" /><circle cx="250" cy="392" r="2.5" />
    </g>
    <text x="250" y="227" textAnchor="middle" fill="#c9d7ff" fontSize="11" letterSpacing="2">SUA</text>
    <text x="250" y="260" textAnchor="middle" fill="#fff" fontSize="25" fontWeight="750" letterSpacing="-.6">OPERAÇÃO</text>
    <path d="M 240 281 H 260" stroke="#bacdff" strokeWidth="1" />
  </g>;
};
