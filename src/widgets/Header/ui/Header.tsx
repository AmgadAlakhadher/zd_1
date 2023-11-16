import{ memo, useRef} from 'react';
import {FaBars} from 'react-icons/fa'
import cls from './header.module.scss';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { ThemeIcon } from '@/features/Theme';
import {useTranslation} from 'react-i18next';
import { Button } from '@/shared/ui/Button';

export const Header = memo(() => {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [t,i18n] = useTranslation();

  const barsIcon = () => {
    navRef.current?.classList.toggle(cls.active);
    overlayRef.current?.classList.toggle(cls.active);
  }

  const onChangeLanguage = (str: "en" | "ru") => {
    if(str) i18n.changeLanguage(str);
  }

  return (
    <header className={cls.header} id='header'>
      <div className={cls.header__container}>
        <Link to="https://amgadalakhadher.github.io/zd_1/" className={cls.header__container__logo}>{t('logo')}</Link>
        <nav className={cls.header__container__nav } ref={navRef}>
          <AiOutlineClose className={cls.header__container__close_icon} onClick={barsIcon} />
          <div className={cls.header__container__content__info__mobile}>
            {
              i18n.language === "en"? (
                <Button content='Russian' theme="primary" style={{fontSize: "1.2rem"}} onClick={()=>onChangeLanguage("ru")} />
              ): <Button content='English' theme="primary" style={{fontSize: "1.2rem"}} onClick={()=>onChangeLanguage("en")} />
            }
            <ThemeIcon />
          </div>
          <div className={cls.header__container__content}>
            <div className={cls.header__container__content__info}>
              {
              i18n.language === "en"? (
                  <Button content='Russian' style={{fontSize: "1.2rem"}} theme="primary" onClick={()=>onChangeLanguage("ru")} />
                ): <Button content='English' style={{fontSize: "1.2rem"}} theme="primary" onClick={()=>onChangeLanguage("en")} />
              }
              <ThemeIcon />
            </div>
          </div>
        </nav>
        <FaBars className={cls.header__container__content__bar_icon} onClick={barsIcon}/>
        <div className={cls.header__container__overlay} ref={overlayRef} onClick={barsIcon}></div>
      </div>
    </header>
  )
})

