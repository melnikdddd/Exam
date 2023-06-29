import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";


import styles from "./Login.module.scss";
import textStyles from "../../../styles/textStyles.module.scss";


import {faGoogle, faTelegram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import AuthButton from "../../../components/Buttons/AuthButton";
import AuthInput from "../../../components/Inputs/AuthInput";
import AuthCard from "../../../components/Card/AuthCard";
import AuthErrorMessage from "../../../components/Message/AuthErrorMessage";


import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import Container from "../../../components/Wrapper/Container/Container";
import BackGround from "../../../components/Wrapper/BackGround/BackGround";

import {setToken} from "../../../store/slices/AuthSlice";
import {useDispatch} from "react-redux";

import {fetchLogin, fetchPost} from "../../../utils/Axios/functions";
import {
    errorHandler,
    initialIdentityValues,
    loginErrors,
    setAuth,
    setIdentityValue
} from "../../../utils/Auth/authFunctions";




function Login() {

    const [regex, setRegex] = useState(initialIdentityValues.regex);
    const [identityType, setIdentityType] = useState(initialIdentityValues.identityType);
    const [message, setMessage] = useState(initialIdentityValues.message);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/home';

    const {
        register,
        formState: {
            errors,
            isValid,
    },
        handleSubmit,
        reset,
        watch,
        setError,
    } = useForm({
        mode: "onChange"
    });

    const identityValue = watch('identity');
    const passwordValue = watch('password');

    useEffect(()=>{
        setIdentityValue(identityValue, {setRegex, setIdentityType, setMessage});
    },[identityValue])



    const onSubmit = async (data) =>{
        const identityT = identityType === "Email" ? 'email' : 'phoneNumber';
        const dataForSend = {
            [identityT] : identityValue,
            password: passwordValue,
        }

        const responseData = await fetchPost("/auth/login", dataForSend);

        if (responseData.success === false){
            errorHandler(loginErrors, responseData.status, setError, identityType);
               return;
        }
        setAuth(responseData.data.token, dispatch, setToken);
        navigate(fromPage);
    }

    return (
        <BackGround background={"linear-gradient(129deg, #008000, #6c93e8)"}>
        <Container>
        <CenterWrapper>
            <AuthCard height={"590px"}>
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
                        <AuthInput register={{
                            ...register('password',
                                {
                                    required: "Field is required.",
                                    minLength: {
                                        value: 8,
                                        message: "Password too short."
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Password too long."
                                    }
                                })
                        }}
                                   placeholder={"Password"}
                                    type={"password"}/>
                        <AuthErrorMessage condition={errors?.password} message={errors?.password?.message}/>
                    </div>
                    <div className={"w-full mt-5"}>
                    <AuthButton text={"Sign in"} disabled={!isValid}/>
                    </div>
                </form>
                <p className={"w-full text-center"}>Don’t have an account yet?
                    <NavLink to={'/auth/registration'} className={"text-blue-500 font-bold underline " + styles.registrationLink}>
                        <span> Sign Up.</span>
                    </NavLink>
                </p>
                <p className={"text-center mt-3"}>
                    <NavLink to={'/forgot'} className={"underline text-blue-500 font-bold " + styles.registrationLink}>
                    Сan't sign in?
                </NavLink>
                </p>

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