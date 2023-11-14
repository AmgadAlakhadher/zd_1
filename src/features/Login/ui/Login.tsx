import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cls from './login.module.scss';
import {  FormEvent, useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch'
import { Input } from '@/shared/ui/Input';
import { 
     getIsLoading,
     getIsAuth,
     getEmail,
     getPassword,
     getUserType,
     sessionActions,
     loginReq,
     getError
} from '@/entities/Session';

export const Login = () => {
    
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const isLoggedIn = useAppSelector(getIsAuth);
  const password = useAppSelector(getPassword);
  const userType = useAppSelector(getUserType);
  const email = useAppSelector(getEmail);
  
  const onChangeEmail = useCallback((value: string) => {
    dispatch(sessionActions.setEmail(value))
  }, [dispatch]);

  const onChangePass = useCallback((value: string) => {
    dispatch(sessionActions.setPassword(value))
  },[dispatch]);

  const resetError = useCallback(() => {
    dispatch(sessionActions.resetError());
  },[dispatch]);

  const onSubmit = useCallback(async(e:FormEvent) => {
      e.preventDefault();
      await dispatch(loginReq());
  }, [dispatch]);


  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Login</h1>
      <form className={cls.formContainer} onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        //   className={cls.input}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePass}
        //   className={cls.input}
        />
        <button type="submit" className={cls.button}>
          Login
        </button>
      </form>
    </div>
  );
};
