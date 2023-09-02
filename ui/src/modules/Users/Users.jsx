import React, {useEffect, useState} from 'react';
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useForm} from "react-hook-form";

import styles from "./Users.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {fetchGet} from "../../utils/Axios/axiosFunctions";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock/LoadingBlock";
import {useSearchParams} from "react-router-dom";
import UserCard from "./UserCard/UserCard";


function Users(props) {

    const [productsType, setProductsType] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltersSelected, setIsFiltersSelected] = useState(false);

    const [firstEffect, setFirstEffect] = useState(true);

    const [isFavoritesUsersSelect, setIsFavoritesUsersSelect] = useState(false);
    const [isBlockedUsersSelect, setIsBlockedUsersSelect] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);

    const [findMessage, setFindMessage] = useState("Use filters and input box to search for users.");

    const [users, setUsers] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState([]);

    const {

        watch,
        register,
        handleSubmit,
        setValue,
    } = useForm({
        mode: "onChange"
    });
    const nickname = watch("nickname");

    useEffect(() => {
        const getProductsTypes = async () => {
            const types = await fetchGet("/products/types")
            setProductsType(types.data.types);

            if (productsType.length > 0) {
                setSelectedProductType(productsType[0])
            }

            setIsLoading(true);
        }
        getProductsTypes();
    }, [])

    useEffect(() => {
        if (firstEffect) {
            setFirstEffect(false);
            return;
        }
        const findInputChange = async () => {
            const nicknameForSent = nickname.slice(1);
            if (nicknameForSent.length < 3) {
                if (searchParams.has("nickname")) {
                    searchParams.delete("nickname");
                    setSearchParams(searchParams);
                }
                setUsers([]);
                return;
            }

            if (!searchParams.has("nickname")) {
                searchParams.append("nickname", nicknameForSent);
            } else {
                searchParams.set("nickname", nicknameForSent);
            }

            setSearchParams(searchParams);

            await find();
        }

        if (nickname.length > 0) {
            if (!nickname.startsWith("@")) {
                setValue("nickname", "@" + nickname);
            }
        }

        findInputChange();


    }, [nickname])

    const onSubmit = async (data) => {
        data.productsType = selectedProductType;
        data.familiarUsers = isFavoritesUsersSelect ? isFavoritesUsersSelect :
            isBlockedUsersSelect ? isBlockedUsersSelect : null;

        Object.keys(data).forEach((key) => {
            if (!data[key]) {
                searchParams.delete(key);
                setSearchParams(searchParams);
                return;
            }
            searchParams.has(key) ? searchParams.set(key, data[key]) : searchParams.append(key, data[key]);
            setSearchParams(searchParams);
        })

        if (nickname.length >= 3) {
            await find();
        }
    }

    const handleFavoritesUsersSelect = () => {
        setIsFavoritesUsersSelect(!isFavoritesUsersSelect);
        setIsBlockedUsersSelect(false);
    }
    const handleBlockedUsersSelect = () => {
        setIsBlockedUsersSelect(!isBlockedUsersSelect);
        setIsFavoritesUsersSelect(false);
    }


    const find = async () => {
        setFindMessage("Not found.")
        const searchParamsObject = Object.fromEntries(searchParams);

        const response = await fetchGet(`/users?${new URLSearchParams(searchParamsObject)}`);
        console.log(response);
        if (response.data.users) {
            setUsers(response.data.users);
            return;
        }
        setUsers([]);

    }


    if (!isLoading) {
        return (
            <BackGround background={"linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"}>
                <Container>
                    <CenterWrapper>
                        <LoadingBlock className={"text-slate-500 h-32"}/>
                    </CenterWrapper>
                </Container>
            </BackGround>
        )
    }


    return (
        <BackGround background={"linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"}>
            <Container>
                <div className={styles.wrap}>
                    <form className={"rounded-t-lg flex border-b  border-gray-400"}
                          onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.filterBlock}>
                            <button type={"button"}
                                    className={`${styles.filterButton} ${isFiltersSelected && styles.selected}`}
                                    onClick={() => setIsFiltersSelected(!isFiltersSelected)}>
                                <span>Filters</span>
                            </button>
                            <div className={`${styles.filters} ${!isFiltersSelected && "hidden"}`}>
                                <div className={"p-3"}>
                                    <div
                                        className={"border border-gray-400 px-2 py-4 rounded-lg flex flex-col bg-white"}>
                                        <h3 className={"text-lg text-center font-bold"}>Familiar users</h3>
                                        <div className={"flex justify-around my-3"}>
                                            <button type={"button"}
                                                    className={`${styles.familiarUsersButtons} ${isFavoritesUsersSelect && styles.selected}`}
                                                    onClick={handleFavoritesUsersSelect}>
                                                <span>Favorites</span>
                                                <FontAwesomeIcon icon={faBookmark} className={"ml-1"}/>
                                            </button>
                                            <button type={"button"}
                                                    className={`${styles.familiarUsersButtons} ${isBlockedUsersSelect && styles.selected}`}
                                                    onClick={handleBlockedUsersSelect}>
                                                <span>Blocked</span>
                                                <FontAwesomeIcon icon={faBan} className={"ml-1"}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={"p-3"}>
                                    <div
                                        className={"border border-gray-400 p-2 py-4 rounded-lg flex flex-col bg-white"}>
                                        <h3 className={"text-lg text-center font-bold"}>Product specialization</h3>
                                        <div className={"flex flex-col"}>
                                            <select name="specialization" id="specialization"
                                                    className={" mt-3 bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "}>
                                                {productsType.map((type, index) => (
                                                    <option key={index}>
                                                        {type}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={"p-3"}>
                                    <div
                                        className={"border border-gray-400 p-2 py-4 rounded-lg flex flex-col bg-white"}>
                                        <h3 className={"text-lg text-center font-bold"}>Params</h3>
                                        <div className={"flex flex-col w-full"}>
                                            <div className={"flex flex-col items-center justify-center mt-2"}>
                                                <div className={"flex justify-center w-full items-center"}>
                                                    <label
                                                        className={"mx-1 cursor-pointer transition-colors hover:text-blue-600"}>
                                                        <input type="radio" className={"mr-1"} name={"filter"}
                                                               value={"rating.likes.length"}
                                                               {...register("filter")}/>

                                                        <span>Most liked</span>
                                                    </label>
                                                    <label
                                                        className={"ml-1 cursor-pointer transition-colors hover:text-blue-600"}>
                                                        <input type="radio" name={"filter"}
                                                               value={"_createdAt"}
                                                               className={"mr-1"} {...register("filter")}/>

                                                        Most old account
                                                    </label>
                                                </div>
                                                <div className={"flex justify-center w-full items-center mt-1"}>
                                                    <label
                                                        className={"ml-2 cursor-pointer transition-colors hover:text-blue-600"}>
                                                        <input type="radio" className={"mr-1"} name={"filter"}
                                                               value={"deals.sales"} {...register("filter")}
                                                               defaultChecked/>

                                                        Most successful sales
                                                    </label>
                                                </div>
                                                <div className={"flex justify-center w-full items-center mt-1"}>

                                                </div>
                                            </div>
                                            <hr className={"my-3 bg-gray-400 h-0.5"}/>
                                            <div className={"flex flex-col items-center justify-center mt-2"}>
                                                <div className={"flex flex-col w-full px-8"}>
                                                    <label className={"text-slate-600 font-bold mb-2"}>Country</label>
                                                    <input type={"text"} {...register("country")}
                                                           className={"border border-gray-400 rounded-lg p-2"}
                                                           placeholder={'I search...'}/>
                                                </div>
                                                <div className={"flex flex-col w-full px-8 mt-3"}>
                                                    <label className={"text-slate-600 font-bold mb-2"}>City</label>
                                                    <input type={"text"} {...register("city")}
                                                           className={"border border-gray-400 rounded-lg p-2"}
                                                           placeholder={'I search...'}/>
                                                </div>
                                            </div>
                                            <hr className={"my-3 mt-5 bg-gray-400 h-0.5"}/>
                                            <div className={"flex justify-center"}>
                                                <button type={"submit"}
                                                        className={"py-3 px-10 text-center bg-blue-500 rounded-lg text-white cursor-pointer transition-colors hover:bg-blue-600 hover:text-slate-100"}>
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="text" className={styles.searchInput}
                               placeholder={"@Nickname..."}
                               {...register("nickname")}
                        />
                    </form>
                    <div className={"w-full flex flex-wrap p-10 gap-[30px] justify-center"}>
                        {users.length > 0
                            ?
                            users.map(user => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                />
                            ))
                            :
                            <CenterWrapper>
                                <h1 className={"text-2xl text-gray-500"}>{findMessage}</h1>
                            </CenterWrapper>
                        }
                    </div>
                </div>
            </Container>
        </BackGround>
    );
}

export default Users;