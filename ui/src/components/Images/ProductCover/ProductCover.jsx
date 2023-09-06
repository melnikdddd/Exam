import React from 'react';

function ProductCover(props) {
    const {className, image} = props;
    const {setIsClicked, isChanged} = props;



    return (
        <div>
            <div className={`${isChanged && "cursor-pointer hover:outline hover:outline-sky-500"} ${className}`}>
                <img src={image} alt="defaultProductCover" className={"w-full h-full"}/>
            </div>
        </div>
    );
}

export default ProductCover;