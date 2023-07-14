import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import styles from "./RatingBottons.module.scss"

function RatingButtons(props) {
    const {rating, isDisabled, className, owner} = props;

    const handleLikeClick = async () =>{

    }
    const handleDisLikeClick = async () =>{

    }

    return (
        <div className={"flex"}>
            <button className={`${styles.ratingButton} ${styles.left}`}
                    disabled={isDisabled}
            onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faThumbsUp} className={"h-7"}/>
                {rating.likes.length}
            </button>
            <button className={`${styles.ratingButton} ${styles.right}`} disabled={isDisabled}>
                 <FontAwesomeIcon icon={faThumbsDown} className={"h-7"}/>
                {rating.dislikes.length}
            </button>
        </div>

    );
}

export default RatingButtons;