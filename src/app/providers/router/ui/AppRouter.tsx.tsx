import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routesConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { LoaderPage } from '@/widgets/LoaderPage';
import { ErrorPage } from '@/pages/errorPage';
import { ErrorBoundary } from 'react-error-boundary';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderPage />}>{route.element}</Suspense>
      </ErrorBoundary>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routesConfig).map(renderWithWrapper)}</Routes>;
});

