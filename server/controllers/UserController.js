import UserModel from "../models/UserModel.js";
import {getUserPosts} from "./PostController.js";

import ModelsWorker from "../utils/modelsWorker.js";
const modelWorker = new ModelsWorker(UserModel);

class UserController{
    removeUser = async (req, res) =>{
        const userId = req.params.id;
        if(await modelWorker.findAndDelete(userId,)) {
           return res.json({success: true})
        }
        return res.json({success: false})

    }
    editUser = async (req, res) =>{
        const userId = req.params.id;
        const body = req.body;

        if (await modelWorker.findAndUpdate(userId, ...body)) {
            return res.json({success: true});
        }
        return res.json({success: false});
    }
    getUser = async (req, res) =>{
        try {
            const userId = req.params.id;

            const user = await UserModel.findById(userId).populate('Comments');

            if(!user){
                return res.status(404).json({message: 'User can`t find'});
            }

            const posts = await getUserPosts(user._id);

            const userData = {email,passwordHash,...user};

            res.json({...userData, ...posts});

        } catch (error){
            res.status(500).send(error);
        }
    }
}

export default new UserController;
