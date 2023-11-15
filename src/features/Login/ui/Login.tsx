import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cls from './login.module.scss';
import {  FormEvent, useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch'
import { Input } from '@/shared/ui/Input';
import { Form } from '@/shared/ui/Form';
import { Button } from '@/shared/ui/Button';
import { Notifications } from '@/shared/ui/Notifications';
import ReCAPTCHA from "react-google-recaptcha";
import { 
     getIsLoading,
     getIsAuth,
     getEmail,
     getPassword,
     sessionActions,
     loginReq,
     getError
} from '@/entities/Session';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [t] = useTranslation();
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

  const onSetError = useCallback((value: string) => {
    dispatch(sessionActions.setError(value))
  },[dispatch]);

  const resetError = useCallback(() => {
    dispatch(sessionActions.resetError());
  },[dispatch]);

  const onSubmit = useCallback(async(e:FormEvent) => {
      e.preventDefault();
      if (recaptcha.current) {
        const captchaValue = recaptcha.current.getValue();
        if (!captchaValue) {
          onSetError(t("form_captcha"));
        } else {
          await dispatch(loginReq());
        }
      }
  }, [dispatch, onSetError, t]);

  useEffect(()=>{
    // if(isLoggedIn) navigate('/');
  },[isLoggedIn])

  return (
    <section className={cls.form}>
        <Form
          onSubmit={onSubmit}
          childern={
            <>
              <h1 className={cls.form__content_title}>{t("form_title")}</h1>
              <Input
                type="email"
                name="email"
                label={t("form_email_lb")}
                placeholder={t("form_email_pl")}
                value={email}
                onChange={onChangeEmail}
              />
              <Input
                type="password"
                name="password"
                label={t("form_password_lb")}
                placeholder={t("form_password_pl")}
                value={password}
                onChange={onChangePass}
              />
              <Button content={t("form_btn")} theme='primary' isLoading={isLoading} fullWidth onSubmit={onSubmit}/> 
              <ReCAPTCHA 
                ref={recaptcha} 
                sitekey={import.meta.env.VITE_SITE_KEY} 
              />
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
