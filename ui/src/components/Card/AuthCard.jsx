import styles from "./AuthCard.module.scss"

function AuthCard(props){

    return(
        <div className={styles.AuthCard} style={{height: props.height}}>
            {props.children}
        </div>
    )
}

export default AuthCard;