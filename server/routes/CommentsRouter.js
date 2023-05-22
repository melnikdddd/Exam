import express from "express";
import checkAuth from "../utils/checkAuth.js";
import CommentController from "../controllers/CommentController.js";
import multer from "multer";

const CommentsRouter = express.Router();
const upload = multer();
CommentsRouter.use(checkAuth);

CommentsRouter.post('/new',upload.array('photos'), CommentController.createComment);

CommentsRouter.use('/:id')
    .update(upload.array('photos'),CommentController.editComment)
    .delete(CommentController.removeComment());

CommentsRouter.get('/:model/:id', CommentController.getAll);

export default CommentsRouter;