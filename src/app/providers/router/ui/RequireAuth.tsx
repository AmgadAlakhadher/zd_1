import { Navigate, useLocation } from 'react-router-dom';
import { getNotFound } from '@/shared/consts/router';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = Boolean(localStorage.getItem('isAuth'));
  const location = useLocation();

  if (!auth)
    return <Navigate replace to={getNotFound()} state={{ from: location }} />;
  return children;
}
