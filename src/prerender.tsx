import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { Home } from './pages/Home';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Keep the same boundary and tree as App so React can hydrate the static HTML.
export function renderHome() {
  return renderToString(<React.StrictMode><Suspense fallback={<LoadingScreen />}><Home /></Suspense></React.StrictMode>);
}
