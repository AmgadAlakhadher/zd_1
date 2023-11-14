import cls from "./msgbox.module.scss";
import { memo } from "react";

interface IMsgBox{
    title: string;
    msg: string;
    check?: boolean;
    isAvailable?: boolean;
    onClick: ()=>void;
}
const MsgBox = (props:IMsgBox) => {
  const {
        title,
        msg,
        check,
        onClick,
        // isAvailable,
    } = props;
  return (
    <>
        <div className={cls.msgbox}>
      <div className={cls.msgbox__content}>
        <h3 className={cls.msgbox__content_title}>
            {title}
        </h3>
        <p className={cls.msgbox__content_msg}>
            {
                msg
            }
        </p>
        <div className={cls.msgbox__content__btns}>
            {
                check? 
                    <>
                        <button>yes</button>
                        <button>no</button>
                    </>
                : <button onClick={onClick}>ok</button>
            }
        </div>
      </div>
    </div>
    <div className="overlay"></div>
    </>
  )
}

export default memo(MsgBox);
