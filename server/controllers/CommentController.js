import CommentModel from "../models/CommentModel.js";
import {_findAndDelete, _findAndUpdate} from "../utils/myModelsWorker.js";

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
        const id = req.params.id;
        const body = req.body;
       if (await _findAndUpdate(id,body)){
           return res.json({message: true})
       }
        return res.json({message: false})
    }
    createComment = async (req, res) => {
        try {
            const body = req.body;
            const doc = new CommentModel({
                ...body,
            }).save();

            res.json({...doc});
        }catch (error){
            res.status(400).json({
                message: 'Something goes wrong!'
            })
        }
    }
}
export default new CommentController;