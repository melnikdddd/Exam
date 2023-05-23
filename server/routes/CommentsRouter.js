import express from "express";
import checkAuth from "../utils/checkAuth.js";
import CommentController from "../controllers/CommentController.js";
import {upload} from "../index.js";
import commentValidator from "../validations/commentsValidator.js";


const CommentsRouter = express.Router();

CommentsRouter.use(checkAuth);

CommentsRouter.post('/new',commentValidator, upload.array('photos'), CommentController.createComment);

CommentsRouter.use('/:id')
    .update(commentValidator, upload.array('photos'), CommentController.editComment)
    .delete(CommentController.removeComment());

CommentsRouter.get('/:model/:id', CommentController.getAll);

export default CommentsRouter;