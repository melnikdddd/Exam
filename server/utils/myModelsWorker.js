
export const _findAndDelete = async (modelType, id) =>{
    try{
        await modelType.findOneAndDelete({id});
        return true;
    }catch (e){
        return false;
    }
}

export const _findAndUpdate = async (modelType, id, body) =>{
    try{
        await modelType.findOneAndUpdate({id},{...body});
        return true;
    }catch (e){
        return false;
    }
}


