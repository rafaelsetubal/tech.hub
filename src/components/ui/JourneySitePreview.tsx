import { useId } from 'react';
import { BRAND_BODY, BRAND_DOT } from './BrandSymbol';

/** One proportional illustration: text, CTA and mark always scale together. */
export function JourneySitePreview() {
  const id=useId().replace(/:/g,'');
  return <svg className="journey-preview-art" viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs>
      <linearGradient id={id+'body'} x1="0" y1="340.642" x2="316.757" y2="125.307" gradientUnits="userSpaceOnUse"><stop stopColor="#0059FF"/><stop offset=".42" stopColor="#4169FF"/><stop offset=".72" stopColor="#8B7CFF"/><stop offset="1" stopColor="#D8D3FF"/></linearGradient>
      <linearGradient id={id+'dot'} x1="231.57" y1="221.286" x2="333.501" y2="119.293" gradientUnits="userSpaceOnUse"><stop stopColor="#7F7FFC"/><stop offset=".38" stopColor="#9FA2FC"/><stop offset=".68" stopColor="#B8BDFC"/><stop offset="1" stopColor="#D3DDFC"/></linearGradient>
    </defs>
    <text x="32" y="39" fill="#243d75" fontSize="19" fontWeight="650" letterSpacing="-1">sua marca</text>
    <text x="605" y="38" fill="#405785" fontSize="10" textAnchor="end">Sobre · Projetos · Contato</text>
    <text x="32" y="115" fill="#173166" fontSize="38" fontWeight="500" letterSpacing="-2">O seu próximo</text>
    <text x="32" y="155" fill="#4a66de" fontSize="38" fontWeight="500" letterSpacing="-2">capítulo.</text>
    <text x="32" y="186" fill="#53678b" fontSize="12">Uma presença que traduz quem você é.</text>
    <rect x="32" y="208" width="158" height="38" rx="19" fill="#355be1"/>
    <text x="51" y="232" fill="white" fontSize="12">Vamos conversar</text>
    <path d="M165 222h8v8m-8 0 8-8" fill="none" stroke="white" strokeWidth="1.5"/>
    <g transform="translate(399 76) scale(.55)"><path d={BRAND_BODY} fill={`url(#${id}body)`}/><path d={BRAND_DOT} fill={`url(#${id}dot)`}/></g>
    <path d="M32 277H608" stroke="#d6deee"/>
    <text x="32" y="299" fill="#53678b" fontSize="10">Sua história merece ser vista.</text>
    <text x="604" y="299" textAnchor="end" fill="#53678b" fontSize="14">↓</text>
  </svg>;
}
