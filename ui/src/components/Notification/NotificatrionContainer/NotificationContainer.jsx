import styles from './NotificationContainer.module.scss'

function NotificationContainer(props) {
    return (
        <div className={`${styles.container}`}>
            <div className={"w-full flex items-center justify-around"}>
                <button className={`${styles.button} ${styles.activeFilter}`}>App</button>
                <span className={"border-r-2 border-white rounded-lg h-full"}></span>
                <button className={styles.button}>Users</button>
            </div>

        </div>
    );
}

export default NotificationContainer;