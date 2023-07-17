import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import styles from "./RatingBottons.module.scss"
import {useNavigate} from "react-router-dom";
import {fetchUpdate} from "../../../utils/Axios/functions";

function RatingButtons(props) {
    const {rateObj, isAuth, isDisabled, owner, entity} = props;

    const navigate = useNavigate();

    const rating = rateObj.rating;

    const liked = rating.likes.includes(owner._id);
    const disliked = rating.dislikes.includes(owner._id);


    const [isLiked, seIstLiked] = useState(liked);
    const [isDisliked, seIsDisliked] = useState(disliked);

    const updateRating = async (ratingType, boolean) =>{
        const operation = boolean ? 'remove' : 'add';
        await fetchUpdate(`/${entity}/${rateObj._id}`,
            {userId: owner._id, listType: ratingType, operation: operation});
    }

    const handleLikeClick = async () =>{
        if (isAuth){
            return;
        }
        navigate("/auth/login", { state: {from: `${window.location.pathname}`}});

    }
    const handleDisLikeClick = async () =>{
        if (isAuth){

            return;
        }
        navigate("/auth/login", { state: {from: `${window.location.pathname}`}});

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