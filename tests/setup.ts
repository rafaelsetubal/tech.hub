import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); vi.restoreAllMocks(); window.history.replaceState(null, '', '/'); });
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {writable:true,value:vi.fn().mockImplementation(query=>({matches:false,media:query,addEventListener:vi.fn(),removeEventListener:vi.fn(),addListener:vi.fn(),removeListener:vi.fn(),dispatchEvent:vi.fn()}))});
  vi.stubGlobal('IntersectionObserver', class {
    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    observe() {}
    disconnect() {}
    unobserve() {}
  });
  Element.prototype.scrollIntoView = vi.fn();
});
