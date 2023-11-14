import { FormEvent, memo } from 'react';
import cls from './form.module.scss'

interface IForm{
  childern: JSX.Element | JSX.Element[];
  errorMessage?: string;
  onSubmit: (e:FormEvent)=> void;
  isAbsolute?: boolean;
  isShow:boolean;
  style?: object;
  handleError: () => void;
  onToggleForm: (e:FormEvent)=> void;
}
export const Form = memo((props: IForm) => {
  const {
    childern,
    errorMessage,
    isShow,
    isAbsolute,
    onSubmit,
    handleError,
    onToggleForm,
    style
  } = props;
  if(errorMessage && isShow){
    setTimeout(()=>{
      handleError();
    },5000)
  }
  return (
    <>
      <form 
        className={`${cls.form} ${isShow? cls.form_show : ""} ${isAbsolute ? cls.form_absolute : ''}`} 
        onSubmit={(e)=>onSubmit(e)} 
        noValidate
        style={style? style: {}}
        >
        {
          childern
        }
      </form>
      <div className={`${cls.overlay} ${isShow && isAbsolute ? cls.overlay_show : ''}`} onClick={onToggleForm}></div>
      {
        errorMessage && isShow? <p className={cls.errorMessage}>{errorMessage}</p> : ""
      }
    </>
  )
});


