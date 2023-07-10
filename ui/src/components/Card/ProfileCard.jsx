import styles from "./Card.module.scss"
function ProfileCard(props) {
    return (
        <div className={`${styles.Card}  ${props.className}`}>
            {props.children}
        </div>

    );
}

export default ProfileCard;