import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import textStyles from "../../../styles/textStyles.module.scss"


import AuthCard from "../../../components/Card/AuthCard";
import BackGround from "../../../components/Wrapper/BackGround/BackGround";
import Container from "../../../components/Wrapper/Container/Container";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import AuthInput from "../../../components/Inputs/AuthInput";
import AuthButton from "../../../components/Buttons/AuthButton";


import {initialIdentityValues, setIdentityValue} from "../../../utils/Auth/authFunctions";
import AuthErrorMessage from "../../../components/Message/AuthErrorMessage";


function Registration(){

    const [regex, setRegex] = useState(initialIdentityValues.regex);
    const [identityType, setIdentity] = useState(initialIdentityValues.identityType);
    const [message, setMessage] = useState(initialIdentityValues.message);


    const {
        register,
        formState: { errors, isValid},
        handleSubmit,
        watch,
        reset,
    } = useForm({mode: "onBlur"});


    const identityValue = watch('identity');
    const password = watch('password')

    useEffect(()=>{
        setIdentityValue(identityValue, {setRegex, setIdentity, setMessage});
    },[identityValue])

    const onSubmit = (data) =>{
        alert(data);
        reset();
    }

    const validateRepeatPassword = (value) => {
        if (value === password) {
            return true;
        } else {
            return 'Passwords must match';
        }
    };


    return (
        <BackGround background={"linear-gradient(90deg, #C33764, #1D2671)"}>
            <Container>
                <CenterWrapper>
                    <AuthCard height={"750px"}>
                        <h1 className={textStyles.title}>Sign up and join to our Marketplace.</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col mb-3"}>
                            <div className={"flex flex-col mt-3"}>
                                <label htmlFor={"identity"}>{identityType}</label>
                                <AuthInput register={{
                                    ...register("identity", {
                                        required: "Field is required.",
                                        pattern: {value: regex , message: message}
                                    })
                                }} placeholder={"Email or phone number"} />
                                <AuthErrorMessage condition={errors?.identity} message={errors?.identity?.message}/>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-col"}>
                                <label form={"firstname"}>Firstname</label>
                                <AuthInput register={{
                                    ...register('firstname', {
                                        required: "Field is required.",
                                        minLength: {
                                            value: 3,
                                            message: "Firstname too short."
                                        },
                                        maxLength:{
                                            value: 15,
                                            message: "Firstname too long."
                                        },
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Only letters."
                                        }
                                    })
                                }} placeholder={"Firstname"}/>
                                <AuthErrorMessage condition={errors?.firstname} message={errors?.firstname?.message}/>
                            </div>
                            <div className={"mt-3 flex-1 flex flex-col"}>
                                <label form={"lastname"}>Lastname</label>
                                <AuthInput register={{
                                    ...register('lastname',{
                                        required: "Field is required.",
                                        minLength: {
                                            value: 3,
                                            message: "Lastname too short."
                                        },
                                        maxLength:{
                                            value: 15,
                                            message: "Lastname too long."
                                        },
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Only letters."
                                        }

                                    })
                                }} placeholder={"Lastname"}/>
                                <AuthErrorMessage condition={errors?.lastname} message={errors?.lastname?.message}/>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-col"}>
                                <div className={"flex flex-col"}>
                                    <label htmlFor={"password"}>Password</label>
                                    <AuthInput register={{
                                        ...register('password', {
                                            required: "Field is required.",
                                            maxLength: {
                                                value: 15,
                                                message: "Password too long."
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Password is too short"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).+$/,
                                                message: "Invalid password."
                                            }
                                        })
                                    }} placeholder={"Password"} type={"password"}/>
                                    <AuthErrorMessage condition={errors?.password} message={errors?.password?.message}/>

                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"mt-3"}>Repeat password</label>
                                    <AuthInput register={{
                                        ...register('repPassword',{
                                            required: "Field is required.",
                                            validate: validateRepeatPassword,
                                        })
                                    }} placeholder={"Repeat password"} type={"password"} />
                                    <AuthErrorMessage  condition={errors?.repPassword} message={errors?.repPassword?.message}/>

                                </div>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-row justify-around"}>
                                <input type="checkbox"/> <p>I accept the <NavLink to={"/terms"} className={"text-blue-500 underline hover:text-black transition"}>terms of the user agreement</NavLink>.</p>
                            </div>
                            <div className={"w-full mt-5"}>
                                <AuthButton text={"Sign up"} disabled={!isValid}/>
                            </div>
                        </form>
                    </AuthCard>
                </CenterWrapper>
            </Container>
        </BackGround>
    )
}
export default Registration;