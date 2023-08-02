import React, {useEffect, useState} from 'react';
import AuthInput from "../../../components/Inputs/Auth/AuthInput";
import styles from "./UserSetting.module.scss"
import {useForm} from "react-hook-form";
import {colors, passwordRegex, validateRepeatPassword} from "../../../utils/Auth/authFunctions";
import FormErrorMessage from "../../../components/Message/FormErrorMessage";
import {fetchUpdate} from "../../../utils/Axios/axiosFunctions";
import {HelperCard} from "../../../components/Card/AuthCard/AuthCard";

import zxcvbn from "zxcvbn";
import UserProfileInput from "../../../components/Inputs/UserPofileInputs/UserProfileInput";
import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";

function SecuritySetting(props) {
   const owner = useSelector(selectUserData);
   const id = owner._id;

    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [passwordReliability, setPasswordReliability] = useState("");
    const [firstEffect, setFirstEffect] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    const {
    formState: {
        isValid,
        errors,
        dirtyFields,
    },
        handleSubmit,
        register,
        watch,
    }
    = useForm({
        defaultValues: {
            email: owner.email || "",
            phoneNumber: owner.phoneNumber || "",
        },
        mode: "onChange"
    });

    const email = watch("email");
    const phoneNumber = watch("phoneNumber")
    const password = watch("password");

    const setFocus = (set) =>{
        set(true);
    }
    const setBlur = (set) =>{
        set(false);
    }

    const onSubmit = async (data) =>{
        const formData = new FormData();

        if (data.repPassword){
            delete data.repPassword;
        }

        for (const [key, value] of Object.entries(data)) {
            if (value) formData.append(key, value);

        }
        const response = await fetchUpdate(`/users/${id}`, formData);
        console.log(response);
    }

    useEffect(() => {
        if (firstEffect){
            setFirstEffect(false);
            return;
        }
        if (password.length===0){
            setPasswordReliability(colors.white);
            return;
        }
        const score = zxcvbn(password).score;
        setPasswordReliability(colors[score]);
    },[password]);
    useEffect(()=>{
        console.log(isValid)
        Object.keys(dirtyFields).length > 0 ?
            setIsDirty(true) : setIsDirty(false);
    },[email, phoneNumber]);

    return (
            <form className={"flex flex-col w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex justify-between w-full h-full"}>
                    <div className={"border rounded-lg flex flex-col p-7 bg-white shadow-md items-center justify-start "}
                         style={{maxWidth: "300px"}}>
                        <h1 className={"text-2xl"}>Change password</h1>
                        <hr className={"bg-slate-800 w-full my-3"}/>
                        <div className={"flex flex-col w-full mt-10"}>
                            <label>New password.</label>
                            <AuthInput type={"password"} placeholder={"Password"} register={{
                                ...register('password',
                                    {
                                        minLength: {
                                            value: 8,
                                            message: "Password too short."
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "Password too long."
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).+$/,
                                            message: "Invalid password."
                                        }
                                    })}}
                                       onFocus={()=> setFocus(setIsPasswordFocus)}
                                       onBlur={()=> setBlur(setIsPasswordFocus)}
                            />

                            {isPasswordFocus &&
                                <HelperCard height={"250px"} right={"710px"}>
                                    <div className={"flex justify-between items-center text-lg"}>
                                        <span>Reliability:</span>
                                        <span className={"border border-black rounded-3xl h-7 w-7 " + passwordReliability}></span>
                                    </div>
                                    <hr className={"mt-3 h-2"}/>
                                    <ul>
                                        <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.mainRegex, password)}>
                                            Contain one capital letter, one small letter, one number.
                                        </li>
                                        <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.latin, password)}>
                                            Contain only latin letters.
                                        </li>
                                        <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.length, password)}>
                                            Contain at least 8 and no more than 15 characters.
                                        </li>
                                    </ul>
                                </HelperCard>}
                            <FormErrorMessage errorField={errors?.password}/>

                        </div>
                        <div className={"flex flex-col w-full my-3"}>
                            <label>Repeat new password.</label>
                            <AuthInput register={{
                                ...register('repPassword',{
                                    required: {
                                        value: !!password,
                                        message: "Field is required"
                                    },
                                    validate: (repeatPassword) => validateRepeatPassword(repeatPassword, password)
                                })
                            }} placeholder={"Repeat password"} type={"password"} />
                            <FormErrorMessage errorField={errors?.repPassword}/>
                        </div>

                    </div>
                    <div className={"border rounded-lg flex flex-col p-7 bg-white shadow-md items-center justify-start ml-2"}
                    style={{minWidth: "280px"}}>
                        <h1 className={"text-2xl"}>Change email</h1>
                        <hr className={"bg-slate-800 w-full my-3"}/>
                        <div className={"flex flex-col w-full my-3"}>
                            <label>Email</label>
                            <UserProfileInput placeholder={owner.email || "Not indicated."} register={{
                                ...register("email", {
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Invalid email.",
                                    }
                                })
                            }}/>
                            <FormErrorMessage errorField={errors?.email}/>
                        </div>
                       <ul className={"list-disc text-gray-500"}>
                           <li className={"mt-3"}>Data about your account activity will be sent to this email.</li>
                           <li className={"mt-3"}>Login details will be changed.</li>
                           {owner.email &&
                               <li className={"mt-3"}>The old email will no longer be used.</li>
                           }
                       </ul>
                    </div>
                    <div className={"border rounded-lg flex flex-col p-7 bg-white shadow-md items-center justify-start ml-2"}
                         style={{minWidth: "270px"}}>
                        <h1 className={"text-2xl"}>Change phone number</h1>
                        <hr className={"bg-slate-800 w-full my-3"}/>
                        <div className={"flex flex-col w-full my-3"}>
                            <label>Phone number</label>
                            <UserProfileInput placeholder={owner.phoneNumber || "Not indicated."} register={{
                                ...register("phoneNumber", {
                                    pattern: {
                                        value: /^\+\d{12}$/,
                                        message: "Invalid phone number"
                                    }
                                })
                            }}/>
                            <FormErrorMessage errorField={errors?.phoneNumber}/>
                        </div>
                        <ul className={"list-disc text-gray-500"}>
                            <li className={"mt-3"}>Data about your account activity will be sent to this phone number.</li>
                            <li className={"mt-3"}>Login details will be changed.</li>
                            {owner.phoneNumber &&
                                <li className={"mt-3"}>The old phone number will no longer be used.</li>
                            }
                        </ul>
                    </div>
                    <div className={"border rounded-lg flex flex-col p-7 bg-white shadow-md items-center justify-start ml-2"}
                         style={{maxWidth: "300px"}}>
                        <h1 className={"text-2xl"}>Remove account</h1>
                        <hr className={"bg-slate-800 w-full my-3"}/>
                        <div className={"w-full"}>
                            <label>Password</label>
                            <AuthInput type={"password"} classname={"w-full"} placeholder={"Current password"}/>
                        </div>

                        <div className={"flex items-center w-full justify-center mt-4"}>
                            <button className={"bg-red-500 p-2 rounded-lg transition-colors hover:bg-red-600 cursor-pointer"}>
                                Remove account
                            </button>
                        </div>
                        <ul className={"list-disc text-gray-500"}>
                            <li className={"mt-3"}>All data associated with your account, except for the history of transactions and messages, will be deleted.</li>
                            <li className={"mt-3"}>Once deleted, the account cannot be recovered.</li>
                        </ul>
                    </div>
                </div>
                <div className={"w-full flex items-center justify-center mt-3"}>
                    <div className={"border rounded-lg flex p-3 bg-white shadow-md items-center justify-center ml-2 w-1/5"}>
                        <button className={`rounded-lg bg-blue-500 text-white  cursor-pointer py-2 px-7 ${styles.submit}`}
                                disabled={!(isDirty && isValid)}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
    );
}

export default SecuritySetting;