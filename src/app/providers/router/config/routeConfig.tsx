import {ErrorPage} from '@/pages/errorPage/';
import { LoginPage } from '@/pages/loginPage';
import { 
  AppRoutes, 
  getRouteMain,
} from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    authOnly: false,
    element: <LoginPage />,
    path: getRouteMain(),
  },
  // last
  [AppRoutes.NOTFOUND]: {
    element: <ErrorPage />,
    path: '*',
  },
};
