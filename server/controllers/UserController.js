import UserModel from "../models/UserModel.js";
import {getUserProducts} from "./ProductController.js";
import {userString} from "../utils/SomeUtils/strings.js";
import ModelsWorker from "../utils/Model/modelsWorker.js";
import {_checkFieldsOnDuplicate, checkPassword} from "../utils/auth/utils.js";
import userModel from "../models/UserModel.js";

const modelWorker = new ModelsWorker(UserModel);


class UserController {
    removeUser = async (req, res) => {
        const userId = req.userId;
        const {password} = req.body;

        if (!await checkPassword(password, userId)) {
            return res.status(401).json({success: false, message: "Invalid password"});
        }

        if (await modelWorker.findAndRemove(userId)) {
            return res.json({success: true,})
        }
        return res.json({success: false})

    }
    updateUser = async (req, res) => {
        try {

            const userId = req.params.id;


            const {imageOperation, ...body} = req.body;


            const errorsFields =
                await _checkFieldsOnDuplicate(["nickname", "email", "phoneNumber"], body);


            if (errorsFields.length > 0) {
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

    getUsersInChat = async (req, res) => {
        try {
            const {usersIds} = req.body;
            console.log(usersIds);

            const users = await UserModel.find({_id: {$in: usersIds}}).select("firstname lastname userAvatar nickname")
            return users ? res.status(200).json({success: true, users: users}) :
                res.status(404).json({success: false, message: "Users cannot find"});

        } catch (error) {
            return res.status(500).json({success: false, message: "Server error"})
        }
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


export const updateChatsInfo = async (ownId, data) => {
    const {chatId, userId, message, isRead} = data;

    const user = await UserModel.findOne({_id: ownId});
    if (!user) {
        return false;
    }

    const chatInfo = {
        chatId: chatId,
        userId: userId,
        read: isRead,
        lastMessage: message
    }

    const chatIndex = user.chatsInfo.findIndex(elem => elem.chatId.toString() === chatId.toString());
    console.log("chat index " + chatIndex, "chatId " + chatId);

    if (chatIndex !== -1) {
        user.chatsInfo[chatIndex] = chatInfo;
    } else {
        user.chatsInfo.push(chatInfo)
    }

    await user.save();
    return true;
}

export const setOnline = async (userId) => {
    await UserModel.findOneAndUpdate({_id: userId}, {isOnline: true})

}
export const setOffline = async (userId) => {
    await UserModel.findOneAndUpdate({_id: userId}, {isOnline: false, lastOnline: new Date()});
}

export const readChat = async (userId, chatId) => {
    const user = await userModel.find({_id: userId});

    const updatedChatsInfo = user.chatsInfo.map(elem => {
        if (elem.chatId === chatId) {
            elem.read = true;
        }
    })
    user.chatsInfo = updatedChatsInfo;
    user.save();
    return true;
}
export default new UserController;
