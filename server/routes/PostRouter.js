import express from "express";
import checkAuth from "../utils/checkAuth.js";
import PostController from "../controllers/PostController.js";

const PostRouter = express.Router();

PostRouter.post('/new', checkAuth, PostController.createPost);
PostRouter.get('/:id',PostController.getPost);

PostRouter.use('/:id/edit', checkAuth)
    .update(PostController.editPost)
    .delete(PostController.removePost);

PostRouter.get('/',PostController.getThirty);

export default PostRouter;