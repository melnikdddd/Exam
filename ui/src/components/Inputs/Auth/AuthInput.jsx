import React from "react";
import styles from "./AuthInput.module.scss"

function AuthInput(props){

    return (
        <input type={props.type}
               placeholder={props.placeholder}
               className={`${styles.input} ${props.classname}`}
               value={props.value}
               disabled={props.disabled}
               onBlur={props.onBlur}
               onFocus={props.onFocus}
               onChange={props.onChange}
               id={props.id}
               {...props.register}
        />
    )
}
export default AuthInput;