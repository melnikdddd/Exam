import express from "express";
import checkAuth from "../utils/checkAuth.js";
import PostController from "../controllers/PostController.js";
import multer from "multer";

const PostRouter = express.Router();

const upload = multer();

PostRouter.post('/new',checkAuth, upload.array('photos'), PostController.createPost);
PostRouter.get('/:id',PostController.getPost);

PostRouter.use('/:id/edit', checkAuth)
    .update(upload.array('photos'), PostController.editPost)
    .delete(PostController.removePost);

PostRouter.get('/',PostController.getThirty);

export default PostRouter;