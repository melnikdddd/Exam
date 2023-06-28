import axios from "../Axios/axios";

export function checkIdentityValue(value){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneNumberRegex = /^\+\d{12}$/;


   if (!value){
       return {identityType: 'Email or phone number', regex : /^/, m: ""}
   }
   if (value.length > 2){
       if (phoneNumberRegex.test(value) || /^\+\d{2,12}$/.test(value)){
           return {identityType: "Phone number", regex : phoneNumberRegex, message: "Invalid phone number"};
       }
       else if (emailRegex.test(value) || /^[a-zA-Z0-9]{5}@/){
           return {identityType: "Email", regex : emailRegex, message: "Invalid email"};
       }
   }
     return {identityType: 'Email or phone number', regex : /^/, message: ""}

}

export const initialIdentityValues = {
        regex: /^/,
        identityType: "Email or phone number",
        message: "",
}


export const setIdentityValue = (identityValue, {setRegex, setIdentityType, setMessage}) =>{
    if (identityValue){
        const {identityType, regex, message} = checkIdentityValue(identityValue);
        setIdentityType(identityType);
        setRegex(regex);
        setMessage(message)
        return;
    }
    setRegex(initialIdentityValues.regex);
    setIdentityType(initialIdentityValues.identityType);
    setMessage(initialIdentityValues.message);
}

export const colors = {
    0: "bg-orange-700",
    1: "bg-orange-500",
    2: "bg-green-300",
    3: "bg-green-500",
    4: "bg-green-700",
    white: "bg-white",
}

export const passwordRegex =  {
    mainRegex: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z]).+$/,
    length: /^.{8,15}$/,
    latin: /^[^\u0400-\u04FF]+$/,

    checkOnRegex(regex, password) {
        if (password.length !== 0){
            return regex.test(password) ? "text-green-700" : "text-red-700";
        }
        return "text-black";
    },
}