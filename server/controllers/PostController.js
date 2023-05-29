import PostModel from "../models/PostModel.js";
import {_decodeImageToString, _decodingImageFromPath, _decodingImagesToString, __dirname} from "../utils/fsWorker.js";
import ModelsWorker from "../utils/modelsWorker.js";


const modelsWorker = new ModelsWorker(PostModel);


class PostController {
    createPost = async (req, res) => {
        try {
            const body = req.body;

            const decodedImages = [];
            if (req.body.files){
                const files = req.body.files;
               decodedImages.push(..._decodingImagesToString(files))
            } else{
                decodedImages.push(await _decodingImageFromPath(__dirname +'/none-file.png'));
            }

            const doc = new PostModel({...body, images: decodedImages});

            const post = await doc.save();
            res.json(post);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error, try again later please'
            })

        }
    }
    getPost = async (req, res) => {
        try {
            const postId = req.params.id;

            const doc = await PostModel.findOneAndUpdate({_id: postId},
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
    removePost = async (req, res) => {
        const postId = req.params.id;
        if (await modelsWorker.findAndDelete(postId)){
            return res.json({success: true})
        }
        return res.json({success: false})
    }

    editPost = async (req, res) => {
        const postId = req.params.id;
        const body = req.body;

        if (await modelsWorker.findAndUpdate(postId, body)) {
            return res.json({success: true})
        }
        return res.json({success: false})
    }

    getThirty = async (req, res) => {
        try {
            const startIndex = req.body.index;
            const posts = await PostModel.find().skip(startIndex).limit(30).exec();
            return res.json({...posts});

        } catch (error) {
            return res.status(500).json({message: 'Something goes wrong with DB'})
        }
    }

}

export const getUserPosts = async (ownerId) => {
    try {
        return await PostModel.find({ownerId}).populate('User').exec();
    } catch (e) {
        return false;
    }
}

export default new PostController;