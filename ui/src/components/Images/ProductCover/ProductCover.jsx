import React from 'react';
import RemoveImageButton from "../../Buttons/RemoveImageButton/RemoveImage";

function ProductCover(props) {
    const {className, image} = props;

    const {isChanged} = props;

    const {setIsClicked, isClicked} = props;

    return (
        <div className={`${isChanged && "bg-[#c0c0c0] flex justify-center"} ${className}`}>
            {isChanged && !isClicked &&
                <RemoveImageButton
                    setIsClicked={setIsClicked}
                    isClicked={isClicked}
                    className={"ml-64 -mt-3"}
                />}
            <img src={image}
                 alt="defaultProductCover"
                 className={" cursor-pointer h-full w-auto"}
                 onClick={props.onClick}
            />
        </div>
    );
}

export default ProductCover;