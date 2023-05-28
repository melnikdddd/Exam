import UserModel from "../models/UserModel.js";

export const _findAndDelete = async (modelType, id, cb) =>{
    try{
        const model = await modelType.findOneAndDelete({id});
        cb(model)
        return true;
    }catch (e){
        return false;
    }
}

export const _findAndUpdate = async (modelType, id, body, cb) =>{
    try{
        const model = await modelType.findOneAndUpdate({id},{...body});
        cb(model);
        return true;
    }catch (e){
        return false;
    }
}


export const  _checkDuplicate = async (value) =>{
    return !await UserModel.findOne({value});
}