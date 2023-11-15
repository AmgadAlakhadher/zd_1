import { ButtonHTMLAttributes, memo } from 'react'
import { Loader } from '@/shared/ui/Loader'
import './Button.scss'
export type ButtonSize = "M" | "L";
export type ButtonTheme = "primary" | "secondary" | "dangers" | "blue" | "green";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    size?: ButtonSize;
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
      className={`${theme && theme} ${fullWidth && "fullwidth"} btn`} 
      onClick={onClick}
      style={style? style : {}}
    >
      {isLoading ? <Loader /> : content}
    </button>
  )
})
