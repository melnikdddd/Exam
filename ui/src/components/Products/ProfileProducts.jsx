import React from 'react';
import ProductCard from "./ProductCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function ProfileProducts(props) {
    const {products, isOwner} = props;
    return (
        <div className={"p-8"}>
            {
                products.length > 0 ?
                    products.map((product) => (
                        <div>
                            <ProductCard product={product} key={product._id}/>
                        </div>
                    ))

                 :  <h1 className={"text-2xl text-slate-500 text-center"}>No products.</h1>

            }
            {isOwner &&
                <div>
                    <div className={"bg-white h-96 w-60 flex flex-col items-center text-center rounded-lg shadow-md mt-10 p-7"}>
                            <h1 className={"text-xl"}>Create product</h1>
                            <div className={"rounded-full mt-20 bg-slate-200 h-40 w-40 items-center flex justify-center hover:bg-slate-300 hover:text-slate-600 transition-color cursor-pointer"}>
                                <FontAwesomeIcon icon={faPlus} className={"h-20 text-slate-500"}/>
                            </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProfileProducts;