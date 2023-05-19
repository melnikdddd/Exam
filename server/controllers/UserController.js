import UserModel from "../models/UserModel.js";
import {_findAndDelete, _findAndUpdate} from "../utils/myModelsWorker.js";
import {getAllOfUserPosts} from "./PostController.js";

class UserController{
    getMe = async(req,res) => {
        try {
            const user = await UserModel.findById(req.userId).populate('Comments');

            if(!user){
                return res.status(404).json({message: 'User can`t find'});
            }
            const posts = await getAllOfUserPosts(user._id);

            res.json({...user,... posts});

        } catch (error){
            res.status(500).send(error);
        }
    }
    removeUser = async (req,res) =>{
        const userId = req.params.id;
        if(await _findAndDelete(UserModel, userId)){
           return res.json({success: true})
        }
        return res.json({success: false})
    }
    editUser = async (req, res) =>{
        const userId = req.params.id;
        const body = req.body;

        if (await _findAndUpdate({userId},{body})){
            return res.json({success: true});
        }
        return res.json({success: false});
    }
    getUser = async (req,res) =>{
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId).populate('Comments');

            if(!user){
                return res.status(404).json({message: 'User can`t find'});
            }

            const posts = await getAllOfUserPosts(user._id);

            const userData = {email,passwordHash,...user};

            res.json({...userData, ...posts});

        } catch (error){
            res.status(500).send(error);
        }
    }

}

export default new UserController;
