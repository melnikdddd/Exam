import {__dirname, _decodingImageFromPath, _decodingImagesFromArray, _decodingImageToString} from "../fsWorker.js";
import UserModel from "../../models/UserModel.js";

// class ModelsWorker {
//     constructor(model) {
//         this.model = model;
//     }
//
//     findAndDelete = async (id) =>{
//         try{
//             await this.model.findOneAndDelete({id});
//             return true;
//         }catch (e){
//             return false;
//         }
//     }
//
//     findAndUpdate = async (id, body) => {
//         try {
//             const prevDocument = this.model.findById(id);
//             await this.model.findOneAndUpdate({id}, {...body}, {new: true});
//             return  true;
//
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     }
//
//     //метод запуска операции
//     #goImagesWorker(imageOperation, operationType, params){
//         const types = ["array", "user"];
//         const operations = ["replace", "remove", "add"];
//
//         if (!types.includes(operationType) || !operations.includes(imageOperation)){
//             return false;
//         }
//
//         return this.#imagesWorker?.[operationType]?.[imageOperation](params);
//     }
//
//
//     rollback = (id, prevDocument) => {
//         this.model.findOneAndUpdate({id}, prevDocument);
//     }
// }
//
// class ModelsImagesWorker extends  ModelsWorker {
//     constructor(id, document, imagesType, model) {
//         super(model);
//
//         this.imagesType = imagesType;
//         this.id = id;
//         this.document = document;
//     }
//
//     goWork = (operation, ...params) => {
//         const operations = ["add", "remove", "replace"];
//
//         if (!operations.includes(operation)){
//             return {success : false, message: "Error Operation"};
//         }
//
//         if (this.imageType === "array"){
//
//         }
//         else if (this.imagesType === "avatar"){
//
//         }
//         return {success : false, message: "errorImageType"};
//
//     }
//
//     #array = {
//         add : {
//
//         },
//         replace: {
//
//         },
//         remove: {
//
//         }
//     }
//     #user = {
//
//     }
//
//
// }

class ModelsWorker {
    constructor(modelId, model) {
        this.model = model;
        this.modelId = modelId;
    }
    setImageWorkerOptions = (operation, imagesType) => {
        this.#ImagesWorker.options = {operation, imagesType};
    }

    findAndUpdate = async (data, imagesParams) => {

        if (this.#ImagesWorker.options.isCanWork) {

        }

        await this.model.findOneAndUpdate(this.modelId,{} )

    }
    findAndRemove = async () =>{

    }


    #ImagesWorker = class extends ModelsWorker {
        constructor(modelId, model) {
            super(modelId, model);
        }
        options = {
            isCanWork: false,
            operation: null,
            imagesType: null,
        }

        go = (...params) =>{
            const {operation,imagesType} =  this.options;
            const goOperation = imagesType === "array" ? this.arrayImageOperations[operation] :
                this.avatarImageOperations[operation];

            return goOperation(params)
        }

        avatarImageOperations = {
            add : () => {

            },
            remove : () => {
                // document.avatar
            },
            replace : () =>{

            }
        }
        arrayImageOperations = {
            add: () =>{

            },
            remove : () => {

            },
            replace : () =>{

            }
        }
    }

}

export const  _checkDuplicate = async (value) =>{
    return !await UserModel.findOne({value});
}



export default ModelsWorker;




