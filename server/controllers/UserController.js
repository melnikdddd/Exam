import UserModel from "../models/UserModel.js";
import {getUserProducts} from "./ProductController.js";
import {userString} from "../utils/strings.js";
import ModelsWorker from "../utils/modelsWorker.js";
import jwt from "jsonwebtoken";
import Jwt from "../utils/auth/jwt.js";
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
    updateUser = async (req, res) =>{
        const userId = req.params.id;

        const {imageOperation, ...body} = req.body;

        //создаю объект настроек для дальнейшей работы с файлом
        const imageData = this.#service.getImagesOptions(req.file, imageOperation);

        //задаю эти настройки в ImageWorker
        modelWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.imageFieldName);

        //вызвыаю общий для всех моделей метод апдейта, уже с настройками для записи файла
        const result = await modelWorker.findAndUpdate(userId, body, imageData.image);
        return res.json({result});
    }

    getUser = async (req, res) =>{
        try {
            const  userId = req.params.id;
            if (!userId){
                return res.status(400).json({success: 400, message: "Bad request."})
            }

            const user = await UserModel.findById(userId).select(userString);

            if(!user){
                return res.status(404).json({success: false, message: 'User can`t find.'});
            }

            const products = await getUserProducts(userId);


            res.status(200).json({user: user,products: products});

        } catch (error){
            console.log(error);
            res.status(500).send("Try later");
        }
    }

    getUserByToken = async (req, res) =>{
        const userId = req.userId;

        if (!userId) return res.status(400).json({success: false, message: "Bad request."});

        const user = await UserModel.findById(userId).select(userString);

        if(!user){
            return res.status(404).json({success: false, message: 'User can`t find.'});
        }

        user.products  = await getUserProducts(userId)

        return res.status(200).json({success: true, userData : user});
    }

    getUserProducts = async (req, res) =>{
        const ownerId = req.body.userId;
        const products = await getUserProducts(ownerId);

        res.status(200).json(products);
    }

    #service = {
        getImagesOptions(file, imageOperation){
            return {
                image: file || null,
                options: {
                    operation: imageOperation || null,
                    imageFieldName: "userAvatar",
                },
            }
        },
    }
}

export default new UserController;
