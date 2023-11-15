import { ButtonHTMLAttributes, memo } from 'react'
import { Loader } from '@/shared/ui/Loader'
import cls from './button.module.scss'
// export type ButtonSize = "M" | "L";
export type ButtonTheme = "primary" | "secondary" | "dangers" | "blue" | "green";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    // size?: ButtonSize;
    content: string ;
    theme?: ButtonTheme;
    isLoading?: boolean;
    fullWidth?: boolean;
    style?: object;
    onClick?: (value?:unknown)=>void;
}
export const Button = memo((props:ButtonProps) => {
  const { 
    theme,
    isLoading,
    content, 
    fullWidth, 
    onClick,
    style
  } = props;
  return (
    <button 
      className={`
        ${
          theme === "primary"? cls.primary :
            theme === "secondary"? cls.secondary :
              theme === "dangers"? cls.dangers :
                theme === "blue"? cls.blue : 
                  cls.green
        }
        ${fullWidth && cls.fullwidth}
        ${isLoading && cls.btn__notAllowed}  
        ${cls.btn}
      `} 
      onClick={onClick}
      disabled={isLoading}
      style={style? style : {}}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
})
