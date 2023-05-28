import {_findAndDelete, _findAndUpdate} from "../utils/modelsWorker.js";
import PostModel from "../models/PostModel.js";
import {
    _saveArrayFilesFromFront,
    _createSubFolder,
    _deepRemoveDir,
    _getUserDirPATH,
    _updateFiles, _getFiles
} from "../utils/myFileSytstemUtil.js";

class PostController {
    createPost = async (req, res) => {
        try {
            const body = req.body;
            const doc = new PostModel({...body});

            const postId = doc._id;
            const ownerId = doc.owner._id;

            const path = _getUserDirPATH(ownerId) + '/posts/' + postId;
            _createSubFolder(path);

            if (req.files) {
                const files = req.files;
                _saveArrayFilesFromFront(files, path);
            }

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
        if (await _findAndDelete(PostModel, postId, (post) => {
            _deepRemoveDir(_getUserDirPATH(post.owner._id) + '/posts/' + postId)
        })) {
            return res.json({success: true})
        }
        return res.json({success: false})
    }
    editPost = async (req, res) => {
        const postId = req.params.id;
        const body = req.body;
        if (await _findAndUpdate(PostModel, postId, body,
            (post) => {
                if (req.files) {
                    const photos = req.files;
                    const path = _getUserDirPATH(post.owner._id) + '/posts/' + postId;
                    _updateFiles(photos, path);
                }
            })) {
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