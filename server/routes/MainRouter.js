import express from "express";
import AuthRouter from "./AuthRouter.js";

const MainRouter = express.Router();

MainRouter.use(AuthRouter);


export default MainRouter;