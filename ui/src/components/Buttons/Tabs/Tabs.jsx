import React from 'react';
import styles from "./Tabs.module.scss";
import {Link} from "react-scroll";
import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";

function Tabs(props) {
    const {boolean, setBoolean, optionA, optionB} = props;

    const ownerId = useSelector(selectUserData)._id;

    const handleTabsProfileClick = (event)=>{
        setBoolean(true);
    }
    const handleTabsProductsClick = (event)=>{
        setBoolean(false);
    }

    return (
        <ul className={styles.tabs}>
            <li className={`${styles.tabsItem} ${styles.left} 
                      ${boolean ? styles.tabsActive : ''}`}
                onClick={boolean ? ()=>{} : handleTabsProfileClick}>
                <Link className={"w-full h-full"} to={`users/${ownerId}/${optionA.toLowerCase()}`}>
                    {optionA}
                </Link>
            </li>
            <li className={`${styles.tabsItem} ${styles.right} 
                      ${!boolean ? styles.tabsActive : ''}`}
                onClick={!boolean ? ()=>{} : handleTabsProductsClick}>
                <Link className={"w-full h-full"} to={`users/${ownerId}/${optionB.toLowerCase()}`}>
                    {optionB}
                </Link>
            </li>
        </ul>
    );
}

export default Tabs;