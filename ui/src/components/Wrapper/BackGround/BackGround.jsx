import React from 'react';

import styles from "./BackGround.module.scss"
function BackGround(props) {
    return (
        <div  className={"w-full h-full"} style={{background: props.background}} >
            {props.children}
        </div>
    );
}

export default BackGround;