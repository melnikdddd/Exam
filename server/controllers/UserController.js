import UserModel from "../models/UserModel.js";
import {getUserProducts} from "./ProductController.js";
import {userString} from "../utils/strings.js";
import ModelsWorker from "../utils/modelsWorker.js";
const modelWorker = new ModelsWorker(UserModel);



class UserController{
    removeUser = async (req, res) =>{
        const userId = req.params.id;
        if (userId !== req.userId){
            return res.status(450).json({message:"You cant do it"})
        }
        if(await modelWorker.findAndRemove(userId)) {
           return res.json({success: true,})
        }
        return res.json({success: false})

    }
    editUser = async (req, res) =>{
        const userId = req.params.id;

        if (userId !== req.userId){
            return res.status(450).json({message:"You cant do it"})
        }

        const {imageOptions, rating,...body} = req.body;
        const imageData = this.#service.getImagesOptions(req.file, imageOptions);

        modelWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.operationType);

        const result = await modelWorker.findAndUpdate(userId, body, imageData.imagesParams);

        return res.json({result});
    }
    getUser = async (req, res) =>{
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId).select(userString);
            if(!user){
                return res.status(404).json({message: 'User can`t find'});
            }

            const products = await getUserProducts(userId);


            res.status(200).json({user: user,products: products});

        } catch (error){
            console.log(error);
            res.status(500).send("Try later");
        }
    }
    #service = {
        getImagesOptions(file, bodyImageOptions){
            return {
                imagesParams: {
                    image: file || null,
                },
                options: {
                    operation: bodyImageOptions?.operation,
                    operationType:  "user"
                },
            }
        },
    }
}

export default new UserController;
