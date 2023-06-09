import {__dirname, _decodingImageFromPath, _decodingImagesFromArray, _decodingImageToString} from "../fsWorker.js";

class ImagesModelsWorker {
    constructor(model) {
        this.model = model;
    }
    setOptions(id, imagesType, document, operation){
        this.#options = {id,imagesType, document: operation}
    }

    #options = {
        id : null,
        imagesType : null,
        document : null,
        operation : null
    }



    // #imagesWorker = {
    //     //user & array - operationType
    //     user: {
    //         //imageOperation сама операция
    //         replace : (document ,decodedImage) =>{
    //             if (!decodedImage){
    //                 return false;
    //             }
    //             document.userAvatar = decodedImage;
    //             return true;
    //         },
    //         remove : async (document) =>{
    //             const {data,ext} =  await _decodingImageFromPath(__dirname + '/user-avatar.png');
    //             this.#imagesWorker.user.replace(document, {data, ext});
    //
    //             return true;
    //         },
    //         add : async (document, image) =>{
    //             if (!document || image){
    //                 return false;
    //             }
    //             const {data, ext} = _decodingImageToString(image);
    //             this.#imagesWorker.user.replace(document, {data, ext});
    //             return true;
    //         },
    //     },
    //     array: {
    //         replace: (document, {indexes, images}) =>{
    //             if (!indexes || !images){
    //                 return false;
    //             }
    //             const {data,ext} = _decodingImagesFromArray(images);
    //             this.#imagesWorker.array["service"].replaceDecodedImages(document, {data,ext});
    //         },
    //         remove: (document, indexes) =>{
    //             if (!indexes){
    //                 return false;
    //             }
    //             indexes.forEach(index =>{
    //                 document.images.splice(index, 1);
    //             })
    //             return true;
    //         },
    //         add: (document, images) =>{
    //             if (!images){
    //                 return false;
    //             }
    //             const decodedImages = _decodingImagesFromArray(images);
    //             decodedImages.forEach(decodedImage =>{
    //                 if (document.images.length >= 10) {
    //                     return false;
    //                 }
    //                 document.images.push(decodedImages);
    //             });
    //             return true;
    //         },
    //
    //         service: {
    //             replaceDecodedImages : (document, {indexes, decodedImages}) => {
    //                 indexes.forEach((indexes, i)=>{
    //                     document.images.splice(indexes, 1, decodedImages[i])
    //                 })
    //                 return true;
    //             }
    //         }
    //     }
    // }
    //

}

export default ImagesModelsWorker;