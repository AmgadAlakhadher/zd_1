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
}
export const Form = memo((props: IForm) => {
  const {
    childern,
    errorMessage,
    isShow,
    isAbsolute,
    onSubmit,
    handleError,
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
        className={`${cls.shForm } ${isShow? cls.shForm_show : ""} ${isAbsolute ? cls.shForm_absolute : ''}`} 
        onSubmit={(e)=>onSubmit(e)} 
        noValidate
        style={style? style: {}}
        >
        {
          childern
        }
      </form>
      {
        errorMessage && isShow? <p className={cls.errorMessage}>{errorMessage}</p> : ""
      }
    </>
  )
});


