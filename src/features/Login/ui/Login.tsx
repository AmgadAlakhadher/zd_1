import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cls from './login.module.scss';
import {  FormEvent, useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch'
import { Input } from '@/shared/ui/Input';
import { 
    //  getIsLoading,
    //  getIsAuth,
     getEmail,
     getPassword,
     sessionActions,
     loginReq,
    //  getError
} from '@/entities/Session';
import { Form } from '@/shared/ui/Form';
import Button from '@/shared/ui/Button';

export const Login = () => {
    
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(getIsLoading);
  // const error = useAppSelector(getError);
  // const isLoggedIn = useAppSelector(getIsAuth);
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


  return (
    <section className={cls.form}>
      
        <Form
          handleError={resetError} 
          onSubmit={onSubmit}
          isShow={true}
          childern={
            <>
              <h1 className={cls.form__content_title}>Login</h1>
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
                errorMessage='error'
                onChange={onChangePass}
              //   className={cls.input}
              />
              <Button content='login' theme='primary' fullWidth onSubmit={onSubmit}/> 
            </>
          }
          style={
            {
              minWidth: "50%",
              height: "40vh"
            }
          }
        />
    </section>
  );
};
