import express from "express";
import checkAuth from "../utils/checkAuth.js";
import PostController from "../controllers/PostController.js";
import {upload} from "../index.js";
import postValidator from "../validations/postValidator.js";

const PostRouter = express.Router();


PostRouter.post('/new',checkAuth, postValidator, upload.array('photos'), PostController.createPost);
PostRouter.get('/:id',PostController.getPost);

PostRouter.use('/:id/edit', checkAuth)
    .update(postValidator, upload.array('photos'), PostController.editPost)
    .delete(PostController.removePost);

PostRouter.get('/',PostController.getThirty);

export default PostRouter;