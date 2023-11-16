import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import {  FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch'
import { Input } from '@/shared/ui/Input';
import { Form } from '@/shared/ui/Form';
import { Button } from '@/shared/ui/Button';
import { Notifications } from '@/shared/ui/Notifications';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import cls from './login.module.scss';
import { 
  getIsLoading,
  getIsAuth,
  getEmail,
  getPassword,
  sessionActions,
  loginReq,
  getError
} from '@/entities/Session';
import GoogleLogin from 'react-google-login';
// import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [t, i18n] = useTranslation();
  const [success,setSuccess] = useState<boolean>(false);
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
    if(success || error){
      setTimeout(()=>{
        setSuccess(false);
        resetError();
      },5000);
    }
    // if(isLoggedIn) navigate('/');
  },[error, isLoggedIn, resetError, success])

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
              <ReCAPTCHA 
                ref={recaptcha}
                style={{marginTop: "10px"}} 
                sitekey="6LfadxApAAAAAFXb3GC8VB5HVe7bfFwN4FE0RHEl"
              />
              <Button content={t("form_btn")} theme='primary' isLoading={isLoading} fullWidth onSubmit={onSubmit}/> 
              <Link className={cls.form__link_pw} to='#reset_password'>{t("form_reset_pw")}</Link>
              <span className={cls.form_or}>
                {i18n.language === "en"? "or" : "или"}
              </span>
              <div className={cls.form__box}>
                <p className={cls.form__box_title}>{t("form_social")}</p>
                <div className={cls.form__box__icons}>
                  <Link 
                    to={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID_GITHUB}`} 
                    target='_top'
                    className={cls.form__box__icons__link}
                  >
                    <FaGithub className={cls.form__box__icons__link_item} />
                  </Link>
                  <Link 
                    to={`https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID_LINKEDIN}&scope=*&state=*&redirect_uri=https%3A%2F%2Famgadalakhadher.github.io%2Fzd_1%2F`} 
                    className={cls.form__box__icons__link}>
                    <FaLinkedin className={cls.form__box__icons__link_item} />
                  </Link>
                  <GoogleLogin 
                    className={`${cls.form__box__icons_googleIcon} ${cls.form__box__icons__link_item}`}
                    clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}
                    buttonText={''}
                    onSuccess={()=>setSuccess(true)}
                    onFailure={()=>{}}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  />
                </div>
                <p className={cls.form__box_signup}>{t("form_havntaccount")}&nbsp; 
                  <Link className={cls.form__box_signup_link} to='#signup'>{t("form_signup")}</Link>
                </p>
              </div>
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
        {
           success && (
            <Notifications 
              msg={t("success")}
              typeNotification='success'
              onClose={resetError}
            />
          )
        }
    </section>
  );
};
