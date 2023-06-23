import axios from "../Axios/axios";

export function checkIdentityValue(value){
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneNumberRegex = /^\+\d{12}$/;


   if (!value){
       return {i: 'Email or phone number', r : /^/, m: ""}
   }
   if (value.length > 2){
       if (phoneNumberRegex.test(value) || /^\+\d{2,12}$/.test(value)){
           return {i: "Phone number", r : phoneNumberRegex, m: "Invalid phone number"};
       }
       else if (emailRegex.test(value) || /^[a-zA-Z0-9]{5}@/){
           return {i: "Email", r : emailRegex, m: "Invalid email"};
       }
   }
     return {i: 'Email or phone number', r : /^/, m: ""}

}

export const initialIdentityValues = {
        regex: /^/,
        identityType: "Email or phone number",
        message: "",
}

export const checkDuplicate = async (valueType, value) =>{
    const response = await axios.post("/auth/checkDuplicate",{valueType: valueType,value: value});
    return response.data.flag;
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