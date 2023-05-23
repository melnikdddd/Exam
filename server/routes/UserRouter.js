import express from "express";
import checkAuth from "../utils/checkAuth.js";
import UserController from "../controllers/UserController.js";
import {upload} from "../index.js";

const UserRouter = express.Router();


UserRouter.use(checkAuth);

UserRouter.get('/', UserController.getMe());

UserRouter.use('/edit')
    .update(upload.single('avatar'), UserController.editUser)
    .delete(UserRouter.removeUser);

export default UserRouter;