import styles from "./Product.module.scss"


function ProductInput(props) {
    const {register, className, placeholder, type, maxLength} = props;

    if (type === "textarea"){
        return (
            <textarea {...register} placeholder={placeholder}
                   className={`${styles.input} ${styles.textarea} ${className}`} maxLength={maxLength} />
        );
    }

    return (
        <input {...register} placeholder={placeholder} type={type}
               className={`${styles.input} ${className}`} maxLength={maxLength}/>
    );
}

export default ProductInput;