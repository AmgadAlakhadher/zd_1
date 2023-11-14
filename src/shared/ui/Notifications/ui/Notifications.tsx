import { memo } from "react"
import cls from './notifications.module.scss';
import { CgCloseR } from "react-icons/cg";

type notType = "success" | "info" | "failed" | "warning";
type notPosition = "success" | "info" | "failed" | "warning";
interface INotifications{
    msg: string;
    type: notType;
    position?: notPosition;
}

const Notifications = (props:INotifications) => {
    const {
        msg,
        // type,
        // position,
    } = props;
  return (
    <div className={cls.notifications}>
        {/* {
            type=== "success"? 
        } */}
      <p className={cls.notifications_msg}>{msg}</p>
      <CgCloseR className={cls.notifications_close} />
    </div>

  )
}

export default memo(Notifications);
