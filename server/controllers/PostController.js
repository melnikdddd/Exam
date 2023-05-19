import {_findAndDelete, _findAndUpdate} from "../utils/myModelsWorker.js";
import PostModel from "../models/PostModel.js";

class PostController {
    createPost = async (req,res) =>{
        try {
            const body = req.body;
            const doc = new PostModel({...body});
            const post = await doc.save();
            res.json(post);

        } catch (err){
            console.log(err);
            res.status(500).json({
                message: 'Error, try again later please'
            })

        }
    }
    getPost = async (req,res) =>{
        try {
            const postId = req.params.id;
            const doc = await PostModel.findOneAndUpdate({ _id: postId,},
                {$inc: {viewsCount: 1}},
                {returnDocument: 'after'}).populate('Comments');

            res.json(doc);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Error, try again later please'
            })
        }
    }
    removePost = async (req,res) =>{
        const postId = req.params.id;
        if(await _findAndDelete(PostModel, postId)){
            return res.json({success: true})
        }
        return res.json({success: false})
    }
    editPost = async (req,res) =>{
        const postId = req.params.id;
        const body = req.body;
       if (await _findAndUpdate(postId, body)){
           return res.json({success: true})
       }
        return res.json({success: false})

    }
    getThirty = async (req, res) => {
        try{
            const startIndex = req.body.index;
            const posts = await PostModel.find().skip(startIndex).limit(30).exec();
            return res.json({...posts});
        }catch (error){
            return res.status(500).json({message: 'Something goes wrong with DB'})
        }
    }

}

export const getAllOfUserPosts = async (userId) =>{
    try{
        return await PostModel.find({userId}).populate('User').exec();
    }catch (e){
        return false;
    }
}

export default new PostController;