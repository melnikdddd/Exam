import React from 'react';

import styles from "./BackGround.module.scss"
function BackGround(props) {
    return (
        <div  className={"w-full h-full"} style={{background: props.background, minHeight:"900px"}} >
            {props.children}
        </div>
    );
}

export default BackGround;