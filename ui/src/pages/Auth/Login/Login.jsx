import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import styles from "./Login.module.scss";
import textStyles from "../../../styles/textStyles.module.scss"

import {faGoogle, faTelegram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import AuthButton from "../../../components/Buttons/AuthButton";
import AuthInput from "../../../components/Inputs/AuthInput";
import AuthCard from "../../../components/Card/AuthCard";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import Container from "../../../components/Wrapper/Container/Container";
import BackGround from "../../../components/Wrapper/BackGround/BackGround";

import {initialIdentityValues, setIdentityValue} from "../../../utils/Auth/authFunctions";
import AuthErrorMessage from "../../../components/Message/AuthErrorMessage";

function Login() {

    const [regex, setRegex] = useState(initialIdentityValues.regex);
    const [identityType, setIdentity] = useState(initialIdentityValues.identityType);
    const [message, setMessage] = useState(initialIdentityValues.message);

    const {
        register,
        formState: {
            errors,
            isValid,
    },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onBlur"
    });

    const identityValue = watch('identity');

    useEffect(()=>{
        setIdentityValue(identityValue, {setRegex, setIdentity, setMessage});
    },[identityValue])



    const onSubmit = (data) =>{
        alert(JSON.stringify(data));
        reset();
    }

    return (
        <BackGround background={"linear-gradient(129deg, #008000, #6c93e8)"}>
        <Container>
        <CenterWrapper>
            <AuthCard height={"550px"}>
                <h1 className={textStyles.title}>
                    Sign in to your account.
                </h1>
                <form className={"w-full flex flex-col mb-3"}  onSubmit={handleSubmit(onSubmit)}>
                    <div className={"mt-3 flex-1 flex flex-col"}>

                        <label form={"identity"}>{identityType}</label>
                        <AuthInput register={{...register('identity',
                                {
                                    required: "Field is required.",
                                    pattern: {value: regex , message: message}
                                }
                            )}}
                                   placeholder={"Email or phone number"}/>
                        <AuthErrorMessage condition={errors?.identity} message={errors?.identity?.message}/>
                    </div>

                    <div className={"mt-3 flex-1 flex flex-col"}>
                        <label form={"password"}>Password</label>
                        <AuthInput register={{...register('password',
                                {
                                    required: "Field is required.",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum 8 characters."
                                    },})
                        }}
                                   placeholder={"Password"}
                                    type={"password"}/>
                        <AuthErrorMessage condition={errors?.password} message={errors?.password?.message}/>
                    </div>
                    <div className={"w-full mt-5"}>
                    <AuthButton text={"Sign in"} disabled={!isValid}/>
                    </div>
                </form>
                <p className={"w-full text-center"}>Don’t have an account yet? <NavLink to={'/auth/registration'} className={"text-blue-500 font-bold underline " + styles.registrationLink}>Sign Up</NavLink></p>
                <div className={"flex items-center my-3"}>
                    <hr className={"mx-2 flex-grow bg-gray-200 h-0.5"}/>
                    <span className={"text-gray-700"}>or</span>
                    <hr className={"mx-2 flex-grow bg-gray-200 h-0.5"}/>
                </div>
                <div className={"flex flex-col w-full"}>
                    <NavLink to={'/auth/google'} className={"bg-green-600 " + styles.brandLink}>
                        <FontAwesomeIcon icon={faGoogle} ></FontAwesomeIcon>
                        <span className={"ml-2"}>Continue with Google</span>
                    </NavLink>
                    <NavLink to={'/auth/telegram'} className={"mt-5 bg-blue-400 " + styles.brandLink}>
                        <FontAwesomeIcon icon={faTelegram} ></FontAwesomeIcon>
                        <span className={"ml-2"}>Continue with Telegram</span>
                    </NavLink>
                </div>
            </AuthCard>
         </CenterWrapper>
        </Container>
        </BackGround>
    )
}

export default Login;