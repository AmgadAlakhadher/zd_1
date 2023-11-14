import {
  CSSProperties,
  InputHTMLAttributes,
  memo,
  useMemo,
  useState,
} from 'react';
import cls from './input.module.scss';

import { AiFillEyeInvisible , AiFillEye } from 'react-icons/ai'
import { classNames } from '@/shared/lib/classNames/classNames';


type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string,params: string) => void;
  label?: string | undefined | null;
  ariaLabel?: string;
  errorMessage?: string;
  style?: CSSProperties;
  name: string;
  params?: string;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    errorMessage,
    style,
    name,
    params = "",
    ...othreProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const onShowPasspord = () => {
    setShowPassword(prev => !prev);
  };

  const onChangeHandler = ( e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value,params);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const Types = useMemo(() => {
    if (type === 'password' && showPassword) return 'text';

    return type;
  }, [showPassword, type]);

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <div className={cls.inputWrapper}>
        <input
          style={style}
          id={`${name}inputUI`}
          value={value}
          type={Types}
          name={`${name}inputUI`}
          required={required}
          aria-invalid={!!focused && Boolean(errorMessage)}
          onChange={onChangeHandler}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
          {...othreProps}
        />
        {type === 'password' && (
          <div className={cls.icon} onClick={onShowPasspord}>
            {showPassword ? <AiFillEyeInvisible className={cls.icon_item} /> : <AiFillEye className={cls.icon_item}/>}
          </div>
        )}
      </div>
      {errorMessage && (
        <span className={cls.error}>
          {errorMessage}
        </span>
      )}
      {!!label && (
        <label htmlFor={`${name}inputUI`}>
          <span className={cls.Label}>
            {`${label} ${required ? '*' : ''}`}
          </span>
        </label>
      )}
    </div>
  );
});
