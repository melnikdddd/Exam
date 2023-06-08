import {_decodingImageFromPath, __dirname, _decodingImagesFromArray} from "./fsWorker.js";
import UserModel from "../models/UserModel.js";

class ModelsWorker {
    constructor(model) {
        this.model = model;
    }

    findAndDelete = async (id) =>{
        try{
            await this.model.findOneAndDelete({id});
            return true;
        }catch (e){
            return false;
        }
    }

    //id модели которую требуется обновить
    //body - данные, которые которые заменять предыдущее

    //последний параметр - объект параметров для imageWorker,
    //в нем следующие три параметра
    //imageOperation - тип операции с изображениями (add, remove, replace)
    //operationType - тип работы операции (массив или одно изображение)
    //params - параметры которые позже перейдут в операцию

    findAndUpdate = async (id, body, {imageOperation, operationType, ...params} = null) =>{
        try{
            //сохраняю исходный документ, в случае ошибки сделать роллбэк
            const prevDocument = await this.model.findById(id);

            await this.model.findOneAndUpdate({id},{...body}, (err, document)=>{
                if (imageOperation !== null && operationType !== null){
                    if (this.#goImagesWorker(imageOperation, operationType, {...params, document})){
                        return true;
                    }
                    this.#rollback(id, prevDocument);
                    return false;
                }
            });
        }catch (e){
            return false;
        }
    }

    //метод запуска операции
    #goImagesWorker(imageOperation, operationType, params){
        return this.#imagesWorker?.[operationType]?.[imageOperation](params);
    }

    #imagesWorker = {
        //user & array - operationType
        user: {
            //imageOperation сама операция
            replace : (document ,decodedImage) =>{
                if (!decodedImage){
                    return false;
                }
                document.userAvatar = decodedImage;
                return true;
            },
            remove : async (document) =>{
                const defaultDecodedImage =  await _decodingImageFromPath(__dirname + '/user-avatar.png');
                this.#imagesWorker.user.replace(document, defaultDecodedImage);

                return true;
            },
            add : async (document, image) =>{
                if (!document || image){
                    return false;
                }
                const decodedImage = _decodeImageToString(image);
                this.#imagesWorker.user.replace(document, decodedImage);
                return true;
            },
        },
        array: {
            replace: (document, {indexes, images}) =>{
                if (!indexes || !images){
                    return false;
                }
                const decodedImages = _decodingImagesFromArray(images);
                this.#imagesWorker.array["service"].replaceDecodedImages(document, decodedImages);
            },
            remove: (document, indexes) =>{
                if (!indexes){
                    return false;
                }
                indexes.forEach(index =>{
                    document.images.splice(index, 1);
                })
                return true;
            },
            add: (document, images) =>{
                if (!images){
                    return false;
                }
                const decodedImages = _decodingImagesFromArray(images);
                decodedImages.forEach(decodedImage =>{
                    if (document.images.length >= 10) {
                        return false;
                    }
                    document.images.push(decodedImages);
                });
                return true;
            },
            service: {
                replaceDecodedImages : (document, {indexes, decodedImages}) => {
                     indexes.forEach((indexes, i)=>{
                        document.images.splice(indexes, 1, decodedImages[i])
                    })
                    return true;
                }
            }
        }
    }
    #rollback = (id, prevDocument) => {
        this.model.findOneAndUpdate({id}, prevDocument);
    }
}


export const  _checkDuplicate = async (value) =>{
    return !await UserModel.findOne({value});
}



export default ModelsWorker;




