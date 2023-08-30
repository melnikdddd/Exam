import {Link, NavLink, useLocation} from "react-router-dom";
import styles from "./header.module.scss"
import Container from "../Wrapper/Container/Container";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {selectUserData} from "../../store/slices/UserDataSlice";
import {faBagShopping, faBars, faComments, faHouse, faShop, faUsers} from "@fortawesome/free-solid-svg-icons";
import {selectIsShowedNotifications, setIsShowedNotification} from "../../store/slices/NotificationSlice";
import {useEffect, useState} from "react";

function Header(props) {

    const location = useLocation()

    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();
    const isShowedNotifications = useSelector(selectIsShowedNotifications);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        dispatch(setIsShowedNotification({set: false}));
        setIsMenuOpen(false);
    }, [location]);

    useEffect(()=>{
        setIsMenuOpen(false);
    },[isShowedNotifications])


    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.nav}>
                    <div className="flex justify-between items-center ">
                        <FontAwesomeIcon icon={faBars}
                                         className={`${styles.dropDownMenuButton} ${isMenuOpen && styles.activeButton}`}
                                         onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                        <NavLink to={"/home"} className={styles.logo}>
                            iMarketPlace
                        </NavLink>
                        <NavLink to={"/market"} className={`${styles.marketButton} ${styles.hideIcon}`}>
                            Market
                        </NavLink>
                        <NavLink to={"/users"} className={`${styles.marketButton} ${styles.hideIcon}`}>
                            Users
                        </NavLink>
                    </div>
                    {
                        isAuth === true ?
                            <div className={"flex justify-around items-center" + `${styles.navItem} `}>
                                {
                                    location.pathname !== `/users/${userData._id}` &&
                                    (
                                        <Link to={`users/${userData._id}`} state={{isProfile: true}}
                                              className={styles.hideIcon}>
                                            <FontAwesomeIcon icon={faUser} className={styles.navigationIcon}/>
                                        </Link>
                                    )

                                }
                                {
                                    location.pathname !== `/users/${userData._id}/chats` &&
                                    (
                                        <Link to={`users/${userData._id}/chats`}>
                                            <FontAwesomeIcon icon={faComments} className={styles.navigationIcon}/>
                                        </Link>
                                    )
                                }
                                <Link to={`users/${userData._id}`} state={{isProfile: false}}
                                      className={styles.hideIcon}>
                                    <FontAwesomeIcon icon={faBagShopping}
                                                     className={styles.navigationIcon}/>
                                </Link>
                                <FontAwesomeIcon icon={faBell}
                                                 className={`${styles.navigationIcon} ${isShowedNotifications ? styles.active : ""}`}
                                                 onClick={() =>
                                                     dispatch(setIsShowedNotification({set: !isShowedNotifications}))}
                                />
                            </div>
                            : <Link to={"/auth/login"} className={styles.login}>Login</Link>
                    }
                </div>
            </Container>
            {
                isMenuOpen &&
                <div className={styles.dropDownMenu}>
                    <ul className={"flex flex-col items-center"}>
                        <li>
                            <Link to={'/home'} className={`${styles.dropDownMenuItem} mt-3`}>
                                <span className={"text-2xl text-slate-100"}>Home</span>
                                <FontAwesomeIcon icon={faHouse}
                                                 className={styles.dropDownIcon}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/products'} className={`${styles.dropDownMenuItem} mt-3`}>
                                <span className={"text-2xl text-slate-100"}>Market</span>
                                <FontAwesomeIcon icon={faShop}
                                                 className={styles.dropDownIcon}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/users'} className={`${styles.dropDownMenuItem} mt-3`}>
                                <span className={"text-2xl text-slate-100"}>Users</span>
                                <FontAwesomeIcon icon={faUsers}
                                                 className={styles.dropDownIcon}
                                />
                            </Link>
                        </li>

                        {isAuth &&
                            <>
                                <li>
                                    <Link to={``} className={`${styles.dropDownMenuItem} mt-3`}>
                                        <span className={"text-2xl text-slate-100"}>My products</span>
                                        <FontAwesomeIcon icon={faBagShopping}
                                                         className={styles.dropDownIcon}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`users/${userData._id}`} className={`${styles.dropDownMenuItem}`}>
                                        <span className={"text-2xl text-slate-100"}>Profile</span>
                                        <FontAwesomeIcon icon={faUser}
                                                         className={styles.dropDownIcon}
                                        />
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            }
        </header>
    );
}

export default Header;