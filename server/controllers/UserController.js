import UserModel from "../models/UserModel.js";
import {getUserProducts} from "./ProductController.js";
import {userString} from "../utils/strings.js";
import ModelsWorker, {_checkDuplicate} from "../utils/modelsWorker.js";
import bcrypt from "../utils/auth/bcrypt.js";
import jwt from "jsonwebtoken";
import Jwt from "../utils/auth/jwt.js";
import userModel from "../models/UserModel.js";
import {checkPassword} from "../utils/auth/utils.js";

const modelWorker = new ModelsWorker(UserModel);


class UserController {
    removeUser = async (req, res) => {
        const userId = req.userId;
        const {password} = req.body;

        if (!await checkPassword(password, userId)){
            return  res.status(401).json({success: false, message: "Invalid password"});
        }

        if (await modelWorker.findAndRemove(userId)) {
            return res.json({success: true,})
        }
        return res.json({success: false})

    }
    updateUser = async (req, res) => {
        try {
            const userId = req.userId;
            const errorsFields = [];

            const {imageOperation, ...body} = req.body;

            if (body.nickname){
                if (await _checkDuplicate(["nickname"], body.nickname)){
                    errorsFields.push("nickname");
                }
            }
            if (body.email){
                if (await _checkDuplicate(["email"], body.email)){
                    errorsFields.push("email");
                }
            }
            if (body.phoneNumber){
                if (await _checkDuplicate(["phoneNumber"], body.phoneNumber)){
                    errorsFields.push("phoneNumber");
                }
            }
            if (errorsFields.length > 0){
                return res.status(409).json({success: false, errorsFields: errorsFields});
            }

            //создаю объект настроек для дальнейшей работы с файлом
            const imageData = this.#service.getImagesOptions(req.file, imageOperation);

            //задаю эти настройки в ImageWorker
            modelWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.imageFieldName);

            //вызвыаю общий для всех моделей метод апдейта, уже с настройками для записи файла
            const result = await modelWorker.findAndUpdate(userId, body, imageData.image);
            return res.status(200).json({success: true});
        } catch (error) {
            res.status(500).send("Try later");
        }
    }

    getUser = async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({success: 400, message: "Bad request."})
            }

            const user = await UserModel.findById(userId).select(userString);



            if (!user) {
                return res.status(404).json({success: false, message: 'UserProfile can`t find.'});
            }

            const products = await getUserProducts(userId);


            res.status(200).json({user: user, products: products});

        } catch (error) {
            res.status(500).send("Try later");
        }
    }

    getUserByToken = async (req, res) => {
        const userId = req.userId;

        if (!userId) return res.status(400).json({success: false, message: "Bad request."});

        const user = await UserModel.findById(userId).select(userString);

        if (!user) {
            return res.status(404).json({success: false, message: 'UserProfile can`t find.'});
        }

        user.products = await getUserProducts(userId)

        return res.status(200).json({success: true, userData: user});
    }

    getUserProducts = async (req, res) => {
        const ownerId = req.body.userId;
        const products = await getUserProducts(ownerId);

        res.status(200).json(products);
    }

    #service = {
        getImagesOptions(file, imageOperation) {
            return {
                image: file || null,
                options: {
                    operation: imageOperation || null,
                    imageFieldName: "userAvatar",
                },
            }
        }
    }
}

export default new UserController;
