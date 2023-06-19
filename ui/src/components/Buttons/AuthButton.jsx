import styles from "./AuthButton.module.scss";

function AuthButton(props){
    return(
        <button type={"submit"} className={"bg-blue-500 w-full py-2 text-center text-white cursor-pointer rounded " + styles.buttonSubmit}>
            {props.text}
        </button>
    )
}

export default AuthButton;