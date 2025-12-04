import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './shared/presentation/styles/global.css';

/**
 * Application entry point
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);