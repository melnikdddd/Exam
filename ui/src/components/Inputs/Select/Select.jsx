import styles from "./Select.module.scss"
function Select(props) {
    const {name, id, className, selectColor} = props;

    return (
        <select name={name} id={id}
                className={`${styles.select} ${className}
                 ${selectColor && `focus:ring-${selectColor}-500 focus:border-${selectColor}-500`}`}
        >
            {props.children}
        </select>
    );
}

export default Select;