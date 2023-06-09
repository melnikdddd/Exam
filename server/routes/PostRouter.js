import express from "express";
import _checkAuth from "../utils/checkAuth.js";
import PostController from "../controllers/PostController.js";
import postValidator from "../validations/postValidator.js";
import multer from "multer";

const PostRouter = express.Router();
const upload = multer();

PostRouter.route('/')
    .post( _checkAuth, postValidator, upload.array('photos'), PostController.createPost)
    .get(PostController.getThirty)


PostRouter.route('/:id')
    .patch(_checkAuth,postValidator, upload.array('photos'), PostController.editPost)
    .delete(_checkAuth ,PostController.removePost);
PostRouter.get('/:id',PostController.getPost);



export default PostRouter;