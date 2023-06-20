import axios from "../Axios/axios";

export function checkIdentityValue(value){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


    if (!value){
        return {i: 'Email or phone number', r : /^/, m: ""}
    }

   if (value.startsWith('+')){
        return {i: "Phone number", r : phoneNumberRegex, m: "Invalid phone number"};
    }
    else {
        return {i: "Email", r : emailRegex, m: "Invalid email"};
    }


}

export const initialIdentityValues = {
        regex: /^/,
        identityType: "Email or phone number",
        message: "",
}

export const checkDuplicate = async (value) =>{
    const { flag } = await axios.post("/auth/checkDuplicate",{value});
    return flag;
}


export const setIdentityValue = (identityValue, {setRegex, setIdentity, setMessage}) =>{
    if (identityValue){
        const {i, r, m} = checkIdentityValue(identityValue);
        setRegex(r);
        setIdentity(i);
        setMessage(m)
    } else {
        setRegex(initialIdentityValues.regex);
        setIdentity(initialIdentityValues.identityType);
        setMessage(initialIdentityValues.message);
    }
}