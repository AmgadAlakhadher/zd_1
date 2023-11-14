import{ memo, useRef, useState } from 'react';
import {FaBars, FaHome} from 'react-icons/fa'
import cls from './header.module.scss';
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { ThemeIcon } from 'features/Theme';
import { Dropdown, Button, Space, message } from 'antd';  
import {useTranslation} from 'react-i18next';
import type { MenuProps } from 'antd';

const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active,setAction] = useState<string>("home");
  const [t,i18n] = useTranslation();


  const handleOptionsMenu = (section:string) => {
    const sectionDom = document.getElementById(section);
    const headerHeight = document.getElementById('header')!.clientHeight;
    if (sectionDom) {
      const sectionOffset = sectionDom.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = sectionOffset - headerHeight;
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
      setAction(section);
    }
  };

  window.addEventListener('scroll', () => {
    const headerHeight = document.getElementById('header')!.clientHeight;
    const scrollPosition = window.scrollY + headerHeight;
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');

    if(homeSection && scrollPosition >= homeSection.offsetTop && scrollPosition < homeSection.offsetTop + homeSection.offsetHeight){
      setAction('home');
    } else if (aboutSection && scrollPosition >= aboutSection.offsetTop && scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight) {
      setAction('about');
    } else if (projectsSection && scrollPosition >= projectsSection.offsetTop && scrollPosition < projectsSection.offsetTop + projectsSection.offsetHeight) {
      setAction('projects');
    } else if (contactSection && scrollPosition >= contactSection.offsetTop && scrollPosition < contactSection.offsetTop + contactSection.offsetHeight) {
      setAction('contact');
    } 
  });

  const barsIcon = () => {
    navRef.current?.classList.toggle(cls.active);
    overlayRef.current?.classList.toggle(cls.active);
  }
  
  const onChangeLanguage: MenuProps['onClick'] = (e) => {
    if(i18n.language !== e.key){
      i18n.changeLanguage(e.key);
      message.success(t('message_change_language'));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  const contentDropdown = {
    items: [
      {label: t('english'),key:'en'},
      {label: t('russian'),key: 'ru'}
    ],
    onClick: onChangeLanguage
  }



  return (
    <header className={cls.header} id='header'>
      <div className={cls.header__container}>
        <Link to="/" className={cls.header__container__logo}>{t('logo')}</Link>
        <nav className={cls.header__container__nav } ref={navRef}>
          <AiOutlineClose className={cls.header__container__close_icon} onClick={barsIcon} />
          <ul className={cls.header__container__nav__list}>
            <li className={`${cls.header__container__nav__list_item} ${active === "home"? cls.active : ""}`} onClick={() => handleOptionsMenu("home")}><FaHome className={cls.home_icon} /></li>
            <li className={`${cls.header__container__nav__list_item} ${active === "about"? cls.active : ""}`} onClick={() => handleOptionsMenu("about")}>{t('menu_about')}</li>
            <li className={`${cls.header__container__nav__list_item} ${active === "projects"? cls.active : ""}`} onClick={()=>handleOptionsMenu("projects")}>{t('menu_projects')}</li>
            <li className={`${cls.header__container__nav__list_item} ${active === "contact"? cls.active : ""}`} onClick={()=>handleOptionsMenu("contact")}>{t('menu_contact')}</li>
          </ul>
          <div className={cls.header__container__content__info__mobile}>
            <Dropdown menu={contentDropdown}>
              <Button>
                <Space>
                  {t('languages')}
                  <IoIosArrowDown />
                </Space>
              </Button>
            </Dropdown>
            <ThemeIcon />
          </div>
          <div className={cls.header__container__content}>
            <div className={cls.header__container__content__info}>
              <Dropdown menu={contentDropdown} className={cls.header__container__content__info_dropdown}>
                <Button className={cls.header__container__content__info_btn}>
                  <Space>
                    {t('languages')}
                    <IoIosArrowDown />
                  </Space>
                </Button>
              </Dropdown>
              <ThemeIcon />
            </div>
          </div>
        </nav>
        <FaBars className={cls.header__container__content__bar_icon} onClick={barsIcon}/>
        <div className={cls.header__container__overlay} ref={overlayRef} onClick={barsIcon}></div>
      </div>
    </header>

  )
}

export default memo(Header)
