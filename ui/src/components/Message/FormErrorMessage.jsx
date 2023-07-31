
function FormErrorMessage(props) {
    return (
        <div className={"h-3 my-1"}>
            {props.errorField &&
            <p className={"text-red-500"}>{props.errorField.message || "Invalid field."}</p> }
        </div>
    );
}

export default FormErrorMessage;