import { memo } from "react"
import cls from './notifications.module.scss';
import { CgCloseR } from "react-icons/cg";
import { TfiAlert } from "react-icons/tfi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

type ToastType = "success" | "info" | "failed" | "warning";
type ToastPosition = "leftBottom" | "leftTop" | "rightTop" | "rightBottom";
interface INotifications{
    msg: string;
    typeNotification: ToastType;
    position?: ToastPosition;
    onClose: () => void;
}

export const Notifications = memo((props:INotifications) => {
  const {
      msg,
      typeNotification,
      position,
      onClose,
  } = props;
return (
  <div 
    className={`
      ${cls.notifications} 
      ${
        position === "leftBottom"? cls.notifications_leftBottom:
          position === "leftTop"? cls.notifications_leftTop:
            position === "rightTop"? cls.notifications_rightTop:
              cls.notifications_rightBottom
      } 
      ${
        typeNotification === "success"? cls.notifications_success:
          typeNotification === "info"? cls.notifications_info:
            typeNotification === "warning"? cls.notifications_warning:
              cls.notifications_failed
      }
    `}
    >
    <div className={cls.notifications__content}>
      {
          typeNotification=== "success"? 
          <FaRegCheckCircle 
            className={cls.notifications__content_icon} 
            style={{color: "var(--primary)"}} 
          />:
            typeNotification=== "info"? 
            <IoMdInformationCircleOutline 
              className={cls.notifications__content_icon} 
              style={{color: "var(--blue)"}} 
            />:
              <TfiAlert 
                className={cls.notifications__content_icon} 
                style={
                  typeNotification === "warning"? 
                    {color: "var(--yellow)"}: {color: "var(--red)"}} 
              />
      }
      <p className={cls.notifications__content_msg}>{msg}</p>
      <CgCloseR className={cls.notifications__content_close} onClick={onClose}/>
    </div>
  </div>
)
})
