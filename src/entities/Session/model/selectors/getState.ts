import { StateSchema } from '@/app/providers/StorProvider';

export const getEmail = (state: StateSchema) => state.session.email;
export const getPassword = (state: StateSchema) => state.session.password;
export const getIsLoading = (state: StateSchema) => state.session.isLoading;
export const getError = (state: StateSchema) => state.session.error;
export const getIsAuth = (state: StateSchema) => state.session.isAuth;