import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cls from './login.module.scss';
import {  FormEvent, useCallback, useEffect } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch'
import { Input } from '@/shared/ui/Input';
import { 
     getIsLoading,
     getIsAuth,
     getEmail,
     getPassword,
     sessionActions,
     loginReq,
     getError
} from '@/entities/Session';
import { Form } from '@/shared/ui/Form';
import { Button } from '@/shared/ui/Button';
import { Notifications } from '@/shared/ui/Notifications';
// import { useNavigate } from 'react-router-dom';

export const Login = () => {
    
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const isLoggedIn = useAppSelector(getIsAuth);
  const password = useAppSelector(getPassword);
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

  useEffect(()=>{
    // if(isLoggedIn) navigate('/');
  },[isLoggedIn])

  return (
    <section className={cls.form}>
        <Form
          onSubmit={onSubmit}
          childern={
            <>
              <h1 className={cls.form__content_title}>Login</h1>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChangePass}
              />
              <Button content='login' theme='primary' isLoading={isLoading} fullWidth onSubmit={onSubmit}/> 
            </>
          }
        />
        {
          error && (
            <Notifications 
              msg={error}
              typeNotification='failed'
              onClose={resetError}
            />
          )
        }
    </section>
  );
};
