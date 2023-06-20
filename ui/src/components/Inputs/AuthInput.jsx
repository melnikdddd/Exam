import React from "react";
import styles from "./AuthInput.module.scss"

function AuthInput(props){

    return (
        <input type={props.type} {...props.register} placeholder={props.placeholder} className={styles.input}/>
    )
}
export default AuthInput;