import express from "express";
import checkAuth from "../utils/checkAuth.js";
import CommentController from "../controllers/CommentController.js";

const CommentsRouter = express.Router();

CommentsRouter.use(checkAuth);

CommentsRouter.post('/new', CommentController.createComment);

CommentsRouter.use('/:id')
    .update(CommentController.editComment)
    .delete(CommentController.removeComment());

CommentsRouter.get('/:model/:id', CommentController.getAll);

export default CommentsRouter;