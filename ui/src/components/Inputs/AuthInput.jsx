import React from "react";
import styles from "./AuthInput.module.scss"

function AuthInput(props){

    return (
        <input type={props.type} {...props.register}
               placeholder={props.placeholder}
               className={styles.input}
               value={props.value}
               disabled={props.disabled}
               onBlur={props.onBlur}
               onFocus={props.onFocus}
        />
    )
}
export default AuthInput;