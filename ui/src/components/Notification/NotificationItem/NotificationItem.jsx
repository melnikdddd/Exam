import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faMessage,
    faTriangleExclamation,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import styles from "./NotifiactionItem.module.scss"
import {useDispatch} from "react-redux";
import {removeNotification} from "../../../store/slices/NotificationSlice";
function NotificationItem(props) {
    const dispatch = useDispatch();
    const {text, type, title, index, notifications, createdAt} = props;


    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday at] HH:mm',
            sameDay : '[Today at] HH:mm',
            nextDay : '[Tomorrow at] LT',
            lastWeek : '[last] dddd  LT',
            nextWeek : 'dddd [at] LT',
            sameElse : 'L'
        }
    });

    const currentDate = moment(createdAt).calendar();

    const icons = {
        warning : {
            icon: faTriangleExclamation,
            bg: "text-yellow-500"
        },
        done : {
          icon: faCircleCheck,
            bg: "text-green-500",
        },
        inform : {
            icon: faCircleInfo,
            bg: "text-blue-500"
        },
        error : {
            icon: faCircleExclamation,
            bg: "text-red-500"
        },
        message: {
            icon: faMessage,
            bg: "text-slate-600"
        }
    }

    const handleRemoveClick = (event) =>{
        dispatch(removeNotification({field:notifications, value : index}));
    }

    return (
        <div className={styles.notificationItem}>
            <div className={"right-0 top-0 w-full flex justify-end"}>
                <FontAwesomeIcon icon={faXmark} className={`${styles.closeButton}`} onClick={handleRemoveClick}/>
            </div>
            <div className={'flex flex-col justify-between pb-5 px-4'}>
                <div className={"w-full flex justify-center"}>
                    <span className={"text-xl font-bold mr-2"}>{title}</span>
                    <FontAwesomeIcon icon={icons[type].icon} className={`h-7 ${icons[type].bg}`} />
                </div>

                {text &&
                    <p className={"mt-3 text-center pb-3"}>{text}</p>
                }
                {<span className={"w-full text-right text-gray-400"}>{currentDate}</span>}
            </div>

        </div>
    );
}

export default NotificationItem;