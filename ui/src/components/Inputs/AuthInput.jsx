import React from "react";
import styles from "./AuthInput.module.scss"

function AuthInput(props){

    return (
        <input name={props.name} type="text" placeholder={props.placeholder} className={styles.input}/>
    )
}
export default AuthInput;