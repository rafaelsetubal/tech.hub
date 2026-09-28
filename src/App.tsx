import React, { lazy, Suspense, useState, useEffect } from 'react';
import { NotFound } from '@/pages/NotFound';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

// Start the primary route's chunk as the app boots so the hero does not wait
// for React's first render to discover it. Other routes stay on demand.
const homeEntry = typeof window !== 'undefined' && window.location.pathname === '/'
  ? import('@/pages/Home')
  : undefined;
const Home = lazy(() => (homeEntry ?? import('@/pages/Home')).then(module => ({ default: module.Home })));
const sitesEntry = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/sites'
  ? import('@/pages/Sites')
  : undefined;
const Sites = lazy(() => (sitesEntry ?? import('@/pages/Sites')).then(module => ({ default: module.Sites })));
const DesignSystemPlayground = lazy(() => import('@/pages/DesignSystemPlayground').then(module => ({ default: module.DesignSystemPlayground })));

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {currentPath === '/design-system' ? (
        <DesignSystemPlayground />
      ) : currentPath.replace(/\/$/, '') === '/sites' ? <Sites />
        : currentPath === '/' ? <Home />
          : <NotFound />}
    </Suspense>
  );
};

export default App;
