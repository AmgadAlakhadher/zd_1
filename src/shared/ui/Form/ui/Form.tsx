import { FormEvent, memo } from 'react';
import cls from './form.module.scss'

interface IForm{
  childern: JSX.Element | JSX.Element[];
  errorMessage?: string;
  onSubmit: (e:FormEvent)=> void;
  style?: object;
}
export const Form = memo((props: IForm) => {
  const {
    childern,
    onSubmit,
    style
  } = props;
  return (
    <>
      <form 
        className={`${cls.shForm }`} 
        onSubmit={(e)=>onSubmit(e)} 
        noValidate
        style={style? style: {}}
        >
        {
          childern
        }
      </form>
    </>
  )
});


