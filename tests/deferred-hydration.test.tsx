import React, { useId, useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { DeferredHydration } from '../src/components/motion/DeferredHydration';

describe('Deferred hydration', () => {
  it('preserves server content and IDs, then activates controls near the viewport', async () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
      observe() {} disconnect() {} unobserve() {}
    });
    const rendered = vi.fn();
    function Section() { const id = useId(); const [count, setCount] = useState(0); rendered(); return <button id={id} onClick={() => setCount(value => value + 1)}>{count}</button>; }
    const app = <DeferredHydration><Section /></DeferredHydration>;
    const container = document.createElement('div');
    container.id = 'root';
    document.body.append(container);
    container.innerHTML = renderToString(app);
    const serverId = container.querySelector('button')!.id;
    container.dataset.prerendered = 'home';
    const errors = vi.fn();
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, app, { onRecoverableError: errors }); });
    expect(rendered).toHaveBeenCalledTimes(1);
    expect(container.querySelector('button')?.textContent).toBe('0');
    await act(async () => { observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver); });
    expect(container.querySelector('button')!.id).toBe(serverId);
    await act(async () => { container.querySelector('button')!.click(); });
    expect(container.querySelector('button')?.textContent).toBe('1');
    expect(errors).not.toHaveBeenCalled();
    await act(async () => root!.unmount());
    container.remove();
  });
});
