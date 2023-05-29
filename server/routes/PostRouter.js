import express from "express";
import _checkAuth from "../utils/checkAuth.js";
import PostController from "../controllers/PostController.js";
import postValidator from "../validations/postValidator.js";
import multer from "multer";

const PostRouter = express.Router();
const upload = multer();

PostRouter.post('/new', _checkAuth, postValidator, upload.array('photos'), PostController.createPost);
PostRouter.get('/:id',PostController.getPost);

PostRouter.route('/:id', _checkAuth)
    .patch(postValidator, upload.array('photos'), PostController.editPost)
    .delete(PostController.removePost);

PostRouter.get('/',PostController.getThirty);

export default PostRouter;