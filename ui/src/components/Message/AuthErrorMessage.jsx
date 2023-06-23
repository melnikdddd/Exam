
function AuthErrorMessage(props) {
    return (
        <div className={"h-3 my-1"}>
            {props.condition &&
            <p className={"text-red-500"}>{props.message || "Invalid field."}</p> }
        </div>
    );
}

export default AuthErrorMessage;