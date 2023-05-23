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

export const  _checkDuplicates = async (...values) =>{
    const valuesArray = [];
    for (let value of values){
        if ((await UserModel.findOne({value}))){
            valuesArray.push(value);
        }
    }
    return (valuesArray.length > 0) ? valuesArray : false;
}
