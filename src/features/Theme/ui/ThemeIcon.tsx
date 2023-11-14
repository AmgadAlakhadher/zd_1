import { MdLightMode, MdModeNight } from 'react-icons/md';
import cls from './themeIcon.module.scss'
import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/AppDispatch/AppDispatch';
import { darkModeActions } from '@/entities/DarkMode';

const ThemeIcon = () => {
  const dispatch = useAppDispatch();
  const darkCircle = useRef<HTMLDivElement>(null);
  const lightCircle = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLSpanElement>(null);
  const checkbox = useRef<HTMLInputElement>(null);

  if(!localStorage.getItem("isDark") || localStorage.getItem("isDark") === "false") {
    document.documentElement.setAttribute('data-theme', 'light');
    dispatch(darkModeActions.onChangeMode(false));
  }else{
    document.documentElement.setAttribute('data-theme', 'dark');
    dispatch(darkModeActions.onChangeMode(true));
  }

  const onSwitchTheme = useCallback(() => {
    darkCircle.current?.classList.toggle(cls.grow);
    lightCircle.current?.classList.toggle(cls.grow);
    circle.current?.classList.toggle(cls.grow);
    if(checkbox.current?.checked) {
      dispatch(darkModeActions.onChangeMode(true));
      document.documentElement.setAttribute('data-theme','dark');
    }
    else{
      dispatch(darkModeActions.onChangeMode(false));
      document.documentElement.setAttribute('data-theme','light');
    } 
  },[dispatch]);    
  useEffect(()=> {
    if(localStorage.getItem("isDark") && localStorage.getItem("isDark") === "true") {
      if (checkbox.current) {
        checkbox.current.checked = true;
      }
    }else {
      if (checkbox.current) {
        checkbox.current.checked = false;
      }
    }
  },[])

  return (
    <>
      
    <div className={cls.toggle_container}>
      <MdLightMode className={cls.icon__sun} />
      <label className={cls.switch} >
        <input type='checkbox' className={`${cls.checkbox} ${cls.switch__input}`} onClick={() => onSwitchTheme()} ref={checkbox}/>
        <span className={`${cls.slider} ${cls.round}`} ref={circle}></span>
      </label>
      <MdModeNight className={cls.icon__moon} />
      <div className={cls.darkCircle} ref={darkCircle}></div>
      <div className={`${cls.lightCircle} ${cls.grow}`} ref={lightCircle}></div>
    </div>
  
    </>
  )
}

export default memo(ThemeIcon);