import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (root.dataset.prerendered === 'home' && window.location.pathname === '/') {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
