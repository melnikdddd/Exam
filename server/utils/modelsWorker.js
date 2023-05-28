import UserModel from "../models/UserModel.js";

export const _findAndDelete = async (modelType, id) =>{
    try{
        const model = await modelType.findOneAndDelete({id});
        return true;
    }catch (e){
        return false;
    }
}

export const _findAndUpdate = async (modelType, id, body) =>{
    try{
        const model = await modelType.findOneAndUpdate({id},{...body});
        return true;
    }catch (e){
        return false;
    }
}


export const  _checkDuplicate = async (value) =>{
    return !await UserModel.findOne({value});
}