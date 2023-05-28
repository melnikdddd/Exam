import CommentModel from "../models/CommentModel.js";
import {validationResult} from "express-validator";
import {_findAndDelete, _findAndUpdate} from "../utils/modelsWorker.js";
import {_decodeImageToString} from "../utils/myFSWorker.js";

class CommentController {
    getAll = async (req, res) =>{
        try{
            const {model, id} = req.params;
            const comments = await CommentModel.find({[model]: id}).exec();

            return res.json({...comments})

        }catch (error){
            res.status(500).json({message: 'Error, try again later please'})
        }
    }
    removeComment = async (req, res) =>{
          const commentId = req.params.id;
          if(await _findAndDelete(CommentModel, commentId)){
              return res.return({success: true})
          }
          res.status(500).json({success: false})
    }
    editComment = async (req, res) =>{
        const commentId = req.params.id;
        const body = req.body;

       if (await _findAndUpdate(commentId, body,
           (comment)=> {
           if(req.files){
               const photos = req.files;
               const path =  _getUserDirPATH(comment.owner._id) + '/comments/' + commentId;
               _updateFiles(photos, path);
           }
       }))
       {
           return res.json({message: true})
       }
        return res.json({message: false})
    }
    createComment = async (req, res) => {
        try {

            const errors = validationResult(req);

            if (errors){
                return res.status(400).json({message: 'Request body is missing',});
            }

            const body = req.body;

            const doc = new CommentModel(...body)

            const commentId = doc._id;
            const userId = doc.owner._id;

            if(req.files){
                const files = req.files;
            }

            await doc.save();
            res.json({...doc});
        }catch (error){
            res.status(400).json({
                message: 'Something goes wrong!'
            })
        }
    }
}
export default new CommentController;