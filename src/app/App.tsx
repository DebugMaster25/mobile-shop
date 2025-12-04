import React, { useEffect } from 'react';
import { RepositoryFactory } from '@shared/infrastructure';
import { AppProviders } from './providers';
import { AppRouter } from './router';

/**
 * Main App component
 */
export const App: React.FC = () => {
  useEffect(() => {
    // Initialize repository factory on app startup
    RepositoryFactory.initialize();
  }, []);

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};