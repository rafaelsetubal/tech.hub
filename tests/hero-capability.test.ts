import { describe, expect, it } from 'vitest';
import { canEnhanceHero, type HeroDevice } from '../src/lib/heroCapability';

const capable: HeroDevice = { cores: 8, memory: 8, touch: false, reducedMotion: false, effectiveType: '4g' };
describe('Adaptive 3D eligibility', () => {
  it('allows capable desktops and phones', () => {
    expect(canEnhanceHero(capable)).toBe(true);
    expect(canEnhanceHero({...capable,memory:12,touch:true})).toBe(true);
  });
  it.each([
    {cores:4}, {memory:2}, {memory:undefined}, {cores:undefined},
    {touch:true,memory:8}, {saveData:true}, {reducedMotion:true}, {effectiveType:'3g'},
  ])('keeps the static logo for insufficient or constrained capabilities: %o', restrictions => {
    expect(canEnhanceHero({...capable,...restrictions})).toBe(false);
  });
});
