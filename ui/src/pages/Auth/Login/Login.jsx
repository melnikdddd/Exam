import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./Login.module.scss";
import {faGoogle, faTelegram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthInput from "../../../components/Inputs/AuthInput";
import AuthCard from "../../../components/Card/AuthCard";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import Container from "../../../components/Wrapper/Container/Container";
import BackGround from "../../../components/Wrapper/BackGround/BackGround";
import textStyles from "../../../styles/textStyles.module.scss"
import AuthButton from "../../../components/Buttons/AuthButton";
function Login() {
    return (
        <BackGround background={"linear-gradient(129deg, #008000, #6c93e8)"}>
        <Container>
        <CenterWrapper>
            <AuthCard height={"520px"}>
                <h1 className={textStyles.title}>
                    Sign in to your account.
                </h1>
                <form className={"w-full flex flex-col mb-3"} method={"post"}>
                    <div className={"mt-3 flex-1 flex flex-col"}>
                        <label form={"identity"}>Email or phone number</label>
                        <AuthInput name={"identity"} placeholder={"Email or phone number"}></AuthInput>
                    </div>

                    <div className={"mt-3 flex-1 flex flex-col"}>
                        <label form={"password"}>Password</label>
                        <AuthInput name={"password"} placeholder={"Password"}></AuthInput>
                    </div>
                    <div className={"w-full mt-5"}>
                    <AuthButton text={"Sign in"}/>
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