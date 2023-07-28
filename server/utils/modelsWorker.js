import { getFileExtensionFromFilename} from "./fsWorker.js";
import UserModel from "../models/UserModel.js";
import CommentModel from "../models/CommentModel.js";
import ProductModel from "../models/ProductModel.js";


class ModelsWorker {
    constructor(model) {
        this.model = model;
        this.imageWorker = null;
    }


    setImageWorkerOptions = (operation, imageFieldName) => {
        if(!operation){
            return false;
        }

        this.imageWorker = new this.#ImagesWorker;
        this.imageWorker.options = {operation: operation, imageFieldName: imageFieldName};
        this.imageWorker.options.isCanWork = true;
    }

    findAndUpdate = async (id ,data, image_s) => {
        const document = await this.model.findById({_id: id});

        if (!document){
            return {success: false, message: "document cant find"}
        }

        if (data.listType === "like" || data.listType === "dislike"){
           const doc =  this.#updateRating(document, data.userId, data.listType, data.operation);
            if (doc){
                doc.save();
                return doc.rating;
            }
            return false;
        }

        if (data.listType === "favoritesUsers" || data.listType === "blockedUsers" || data.listType === "reports"){
            const doc = this.#updateArray(document, {userId: data.userId, listType: data.listType, operation: data.operation});

            if (doc) {
                doc.save();
                return doc.listType;
            }
            return  false;
        }


        if (this.imageWorker && this.imageWorker.options.isCanWork){
            const result = this.imageWorker.goWork(image_s);

            if (result){
                document[this.imageWorker.options.imageFieldName] = result;
            }

         }

        for (const key in data){
            document[key] = data[key];
        }

        document.save();
        return {success: true, document}

    }

    findAndRemove = async (id) =>{
        const modelName = this.model.modelName + "Model";
        if (modelName !== "CommentModel"){
            if (!await this.#clearDependency[modelName](id)){
                throw new Error("DEPENDENCY ERROR")
            }
        }
        return !!(await this.model.findOneAndDelete({_id: id}));

    }
    #updateRating =  (document, userId, ratingType, ratingOperation) =>{

            const likesFilter = document.rating.likes.filter(rate => rate === userId);
            if (ratingType === "like" && ratingOperation === "add"){
                likesFilter.push(userId);
            }

            const dislikesFilter = document.rating.dislikes.filter(rate => rate === userId);

            if (ratingType === "dislike" && ratingOperation === "add"){
                dislikesFilter.push(userId);
            }
            document.rating = {likes: likesFilter, dislikes: dislikesFilter}


            return document;
    }
    #updateArray = (document, {userId, listType, operation}) =>{
        const filteredDocument = document[listType].filter(element => element === userId);

        if (operation === "add"){
            filteredDocument.push(userId);
        }

        document[listType] = filteredDocument;
        return document;
    }

    #ImagesWorker = class extends ModelsWorker {
        constructor(modelId, model) {
            super(modelId, model);
        }
        options = {
            isCanWork: false,
            operation: null,
            imageFieldName: null,
        }
        goWork = (image_s) =>{
            const {operation,imageFieldName} =  this.options;

            const goOperation = imageFieldName === "images" ? this.arrayImageOperations[operation] :
                this.singleImageOperations[operation];

            const operationResult = goOperation(image_s);

            if (!operationResult){
                return false;
            }
            return operationResult;
        }

        singleImageOperations = {
            replace : (image) => {
               return {data: image.buffer, ext: getFileExtensionFromFilename(image.originalname)}
            },

            remove : () => {
                return {data: '', ext: ''}
            },
        }

        arrayImageOperations = {
            add: (array, images) =>{
                const decodedImages = _decodingImagesFromArray(images);
               return decodedImages.length + array.length > 10 ? false : array.push(decodedImages);
            },
            remove : (array, indexes) => {
                return array.filter(index=> !indexes.includes(index));
            },
            replace : (array, images, indexes) =>{
                const newArray = [...array];
                return indexes.forEach((index, imagesIndex) =>{
                    newArray[index] = images[imagesIndex]
                })
            }
        }
    }

    #clearDependency = {
        UserModel : async (userId) =>{
            return !(!await ProductModel.deleteMany({owner: userId})
                && !await CommentModel.deleteMany({owner: userId})
                && !await CommentModel.deleteMany({user: userId}))
        },
        ProductModel : async (productId) => {
            return !await CommentModel.deleteMany({product: productId})
        }
    }
}

export const  _checkDuplicate = async (valueType, value) =>{
    // true -  exists
    //false - dont exists
    const user = await UserModel.findOne({[valueType]: value});
    return !!user;
}



export default ModelsWorker;




