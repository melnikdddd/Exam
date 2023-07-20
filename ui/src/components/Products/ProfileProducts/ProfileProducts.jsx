import React from 'react';
import ProductCard from "../ProductCard/ProductCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faBookmark, faCircle, faCircleExclamation, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileProducts.module.scss"

function ProfileProducts(props) {
    const {products, isOwner, isBlocked} = props;

    if (isBlocked){
        return (
            <div className={"p-6"}>
                <h1 className={"text-2xl text-slate-500 text-center"}>User is blocked.</h1>
            </div>
        )
    }

    return (
        <div className={"p-6"}>
            {isOwner &&
                <div>
                    <div className={styles.addProduct}>
                        <h1 className={"text-xl"}>Add product</h1>
                        <div className={"rounded-full bg-slate-200 h-12 w-12 items-center flex justify-center ml-5 " + styles.circle}>
                            <FontAwesomeIcon icon={faPlus} className={"h-10 text-slate-500"}/>
                        </div>
                    </div>
                </div>
            }
            {
                products.length > 0 ?
                    products.map((product) => (
                        <div>
                            <ProductCard product={product} key={product._id}/>
                        </div>
                    ))
                 :  <h1 className={"text-2xl text-slate-500 text-center"}>No products.</h1>

            }
        </div>
    );
}

export default ProfileProducts;