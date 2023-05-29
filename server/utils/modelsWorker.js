import {_decodeImageToString, _decodingImageFromPath, __dirname} from "./fsWorker.js";
import UserModel from "../models/UserModel.js";


class ModelsWorker {
    constructor(model) {
        this.model= model;
    }

    findAndDelete = async (id) =>{
        try{
            const model = await this.model.findOneAndDelete({id});
            return true;
        }catch (e){
            return false;
        }
    }

    findAndUpdate = async (id, body) =>{
        try{
            await this.model.findOneAndUpdate({id},{...body});
            return true;
        }catch (e){
            return false;
        }
    }

    ImagesWorker = class extends ModelsWorker{
        constructor(model) {
            super(model);
        }

        user = {
            replaceAvatar : (id, decodedImage) =>{
                this.model.findById(id, (err, document)=>{
                    document.userAvatar = decodedImage;
                }).save();
            },
            removeAvatar : async (id) =>{
                const defaultDecodedImage =
                    _decodeImageToString( await _decodingImageFromPath(__dirname + '/user-avatar.png'));

                this.replaceAvatar({_id: id}, defaultDecodedImage);
            }
        }

        addImages(id, decodedImages){
            const images = this.model.images;

            if (images.length === 10){
                return throw new Error('Max images 10');
            }

          this.model.findOne({_id: id}, (err, document) =>{

              decodedImages.forEach(decodedImage => {
                  if (images.length >= 10){
                      return throw new err('Max images 10');
                  }
                  images.push(decodedImage);
              })
          }).save();
        }
        removeImages(id, indexes){
            this.model.findOne({_id: id}, (err, document)=>{
                indexes.forEach(index =>{
                    document.images.splice(index, 1);
                })
            }).save();
        }
        replaceImages(id, {indexes, decodedImages}){
            this.model.findOne({_id: id}, (err, document)=>{
                indexes.forEach((indexes, i)=>{
                    document.images.splice(indexes, 1, decodedImages[i])
                })
            }).save();
        }
    }
}


export const  _checkDuplicate = async (value) =>{
    return !await UserModel.findOne({value});
}



export default ModelsWorker;




