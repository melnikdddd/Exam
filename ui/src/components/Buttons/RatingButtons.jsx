import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import styles from "./RatingBottons.module.scss"

function RatingButtons(props) {
    const {rating, isDisabled, className} = props;
    return (
        <div className={"flex"}>
            <button className={`${styles.ratingButton} ${styles.left}`} disabled={isDisabled}>
                <FontAwesomeIcon icon={faThumbsUp} className={"h-7"}/>
                {rating.likes}
            </button>
            <button className={`${styles.ratingButton} ${styles.right}`} disabled={isDisabled}>
                 <FontAwesomeIcon icon={faThumbsDown} className={"h-7"}/>
                {rating.dislikes}
            </button>
        </div>

    );
}

export default RatingButtons;