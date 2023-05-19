import express from "express";
import AuthRouter from "./AuthRouter.js";
import PostRouter from "./PostRouter.js";
import UserRouter from "./UserRouter.js";
import EachRouter from "./EachRouter.js";
import CommentsRouter from "./CommentsRouter.js";

const MainRouter = express.Router();

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/posts', PostRouter);
MainRouter.use('/me', UserRouter);
MainRouter.use('/comments', CommentsRouter);
MainRouter.use(EachRouter);


export default MainRouter;