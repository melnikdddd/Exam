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
import {removeNotification, removePopupNotification} from "../../../store/slices/NotificationSlice";
import LoadingBar from "../../Loading/LoadingBar/LoadingBar";
import {useEffect, useState} from "react";
function NotificationItem(props) {
    const dispatch = useDispatch();
    const {text, type, title, index, notificationType, createdAt, isPopup} = props;

    const totalDuration = 5000;


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

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPopup){
            const step = (100 / totalDuration) * 100;
            const interval = setInterval(() => {
                if (progress < 100) {
                    setProgress(progress + step);
                    return;
                }
                clearInterval(interval);
                dispatch(removePopupNotification({value: index}))
            }, totalDuration / 100);

            return () => {

                clearInterval(interval);
            };
        }

    }, [progress]);


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
        console.log(notificationType)
        dispatch(removeNotification({field:notificationType, value : index}));
        if (isPopup){
            dispatch(removePopupNotification({field: "popupNotifications", value: index}))
        }
    }

    return (
        <div className={`${styles.notificationItem} ${isPopup && styles.popup}`}>
            <div className={"right-0 top-0 w-full flex justify-end"}>
                <FontAwesomeIcon icon={faXmark} className={`${styles.closeButton} ${isPopup && styles.popupButton}`} onClick={handleRemoveClick}/>
            </div>
            <div className={'flex flex-col justify-between pb-5 px-4'}>
                <div className={"w-full flex justify-center"}>
                    <span className={"text-xl font-bold mr-2"}>{title}</span>
                    <FontAwesomeIcon icon={icons[type].icon} className={`h-7 ${icons[type].bg}`} />
                </div>

                {text &&
                    <p className={"mt-3 text-center pb-3"}>{text}</p>
                }

                {createdAt &&
                    <span className={"w-full text-right text-gray-400"}>{currentDate}</span>
                }
            </div>
            {isPopup &&
                <LoadingBar progress={progress}/>
            }
        </div>
    );
}

export default NotificationItem;