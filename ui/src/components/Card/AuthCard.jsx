import styles from "./AuthCard.module.scss"
import {useState} from "react";

function AuthCard(props){

    return(
        <div className={styles.AuthCard}
             style={{height: props.height, width: props.width}}>
            {props.children}
        </div>
    )
}

export const HelperCard  = (props) => {
        return (
            <div className={"absolute " + styles.HelperCard} style={{height: props.height}}>
                {props.children}
            </div>
        )
}

export default AuthCard;