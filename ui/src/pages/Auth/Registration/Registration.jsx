import AuthCard from "../../../components/Card/AuthCard";
import BackGround from "../../../components/Wrapper/BackGround/BackGround";
import Container from "../../../components/Wrapper/Container/Container";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import textStyles from "../../../styles/textStyles.module.scss"
import AuthInput from "../../../components/Inputs/AuthInput";
import {NavLink} from "react-router-dom";
import AuthButton from "../../../components/Buttons/AuthButton";
import React from "react";

function Registration(props){

    return(
        <BackGround background={"linear-gradient(90deg, #C33764, #1D2671)"}>
            <Container>
                <CenterWrapper>
                    <AuthCard height={"670px"}>
                        <h1 className={textStyles.title}>Sign up and join to our Marketplace.</h1>
                        <form method={"post"} className={"w-full flex flex-col mb-3"}>
                            <div className={"flex flex-col mt-3"}>
                                <label htmlFor={"identity"}>Email or phone number</label>
                                <AuthInput name={"identity"} placeholder={"Email or phone number"} />
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-col"}>
                                <label form={"firstname"}>Firstname</label>
                                <AuthInput name={"firstname"} placeholder={"Firstname"}></AuthInput>
                            </div>
                            <div className={"mt-3 flex-1 flex flex-col"}>
                                <label form={"lastName"}>Lastname</label>
                                <AuthInput name={"lastName"} placeholder={"Lastname"}></AuthInput>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-col"}>
                                <div className={"flex flex-col"}>
                                    <label htmlFor={"password"}>Password</label>
                                    <AuthInput name={"password"} placeholder={"Password"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label className={"mt-3"}>Repeat password</label>
                                    <AuthInput name={"repeatPassword"} placeholder={"Repeat password"} />
                                </div>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-row justify-around"}>
                                <input type="checkbox"/> <p>I accept the <NavLink to={"/terms"} className={"text-blue-500 underline hover:text-black transition"}>terms of the user agreement</NavLink></p>
                            </div>
                            <div className={"w-full mt-5"}>
                                <AuthButton text={"Sign up"}/>
                            </div>
                        </form>
                    </AuthCard>
                </CenterWrapper>
            </Container>
        </BackGround>
    )
}
export default Registration;