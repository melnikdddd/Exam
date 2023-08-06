import userModel from "../../models/UserModel.js";
import bcrypt from "./bcrypt.js";

export const checkPassword = async (password, userId) =>{
    const user = await userModel.findById(userId);
    if (!user) return  false;
    const hashPassword = user.hashPassword;
    console.log(hashPassword)

    return await bcrypt.readHashPassword(password, hashPassword);
}