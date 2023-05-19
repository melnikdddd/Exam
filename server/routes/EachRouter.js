import express from "express";
import userController from "../controllers/UserController.js";

const EachRouter = express.Router();

EachRouter.get('/users/:id', userController.getUser)

export default EachRouter;