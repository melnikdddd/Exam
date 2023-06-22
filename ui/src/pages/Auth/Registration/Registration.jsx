import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import zxcvbn from "zxcvbn"

import textStyles from "../../../styles/textStyles.module.scss"


import AuthCard, {HelperCard} from "../../../components/Card/AuthCard";
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

    const [isIdentityFocus, setIsIdentityFocus] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);

    const setFocus = (set) =>{
        set(true);
    }
    const setBlur = (set) =>{
        set(false);
    }

    const passwordRegex = {
        mainRegex: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).+$/,
        length: /^.{8,15}$/,
        latin: /^[A-Za-z0-9]+$/,

        checkOnRegex(regex) {
            if (password.length !== 0){
              return regex.test(password) ? "text-green-700" : "text-red-700";
            }
            return "text-black";
        },
}


    const {
        register,
        formState: { errors, isValid},
        handleSubmit,
        watch,
        reset,
    } = useForm({mode: "onChange"});

    const colors = {
        0: "bg-orange-700",
        1: "bg-orange-500",
        2: "bg-green-300",
        3: "bg-green-500",
        4: "bg-green-700",
        white: "bg-white",
    }


    const identityValue = watch('identity');
    const password = watch('password');

    const [passwordReliability, setPasswordReliability] = useState("");

    const [firstEffect, setFirstEffect] = useState(true);

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
        setIdentityValue(identityValue, {setRegex, setIdentity, setMessage});
    },[identityValue]);



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
                    <AuthCard height={"1050px"}>
                        <h1 className={textStyles.title}>Sign up and join to our Marketplace.</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col mb-3"}>
                            <div className={"flex flex-col mt-3"}>
                                <label htmlFor={"identity"}>{identityType}</label>
                                <AuthInput register={{
                                    ...register("identity", {
                                        required: "Field is required.",
                                        pattern: {value: regex , message: message},
                                    })
                                }}
                                           onBlur={()=> setBlur(setIsIdentityFocus)}
                                           onFocus={() => setFocus(setIsIdentityFocus)}
                                           placeholder={"Email or phone number"} />
                                <AuthErrorMessage condition={errors?.identity} message={errors?.identity?.message}/>

                                {isIdentityFocus &&
                                <HelperCard  height={"200px"}>
                                    <div>
                                        <div className={"mb-3 flex flex-col"}>
                                            <lebel>Email</lebel>
                                            <AuthInput disabled={true} value={"Example@mail.com"}/>
                                        </div>
                                        <div className={"mt-4 flex flex-col"}>
                                            <lebel>Phone number</lebel>
                                            <AuthInput disabled={true} value={"+380001112233"}/>
                                        </div>
                                    </div>
                                </HelperCard>}
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
                                    }}
                                               onFocus={()=> setFocus(setIsPasswordFocus)}
                                               onBlur={()=> setBlur(setIsPasswordFocus)}
                                               placeholder={"Password"} type={"password"}/>

                                    <AuthErrorMessage condition={errors?.password} message={errors?.password?.message}/>

                                    {isPasswordFocus &&
                                        <HelperCard height={"250px"}>
                                           <div className={"flex justify-between items-center text-lg"}>
                                               <span>Reliability:</span>
                                               <span className={"border border-black rounded-3xl h-7 w-7 " + passwordReliability}></span>
                                           </div>
                                            <hr className={"mt-3 h-2"}/>
                                            <ul>
                                                <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.mainRegex)}>
                                                    Contain one capital letter, one small letter, one number.
                                                </li>
                                                <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.latin)}>
                                                    Contain only latin letters.
                                                </li>
                                                <li className={"my-3 " + passwordRegex.checkOnRegex(passwordRegex.length)}>
                                                    Contain at least 8 and no more than 15 characters.
                                                </li>
                                            </ul>
                                        </HelperCard>}
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
                            <div className={"text-center flex items-center flex-col"}>
                                <p className={"text-lg"}>Avatar</p>
                                <div className={"rounded-full border border-black h-52 w-52 mt-3"}></div>
                            </div>
                            <hr className={"my-3"}/>
                            <div className={"flex-1 flex flex-col"}>
                                <div className={"flex flex-row justify-around"}>
                                    <input type="checkbox" {...register('terms', {required: "This is required."})}/>
                                    <p>I accept the <NavLink to={"/terms"} className={"text-blue-500 underline hover:text-black transition"}>terms of the user agreement</NavLink>.</p>
                                </div>
                                <AuthErrorMessage condition={errors?.terms} message={errors?.terms?.message}/>
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