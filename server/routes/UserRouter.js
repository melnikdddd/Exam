import express from "express";
import _checkAuth from "../utils/auth/checkAuth.js";
import UserController from "../controllers/UserController.js";
import multer from "multer";
import {userValidation} from "../validations/UserValidator.js";
import checkAuth from "../utils/auth/checkAuth.js";


const upload = multer()
const UserRouter = express.Router();


UserRouter.get("/getUserByToken", checkAuth ,UserController.getUserByToken)

UserRouter.get('/:id', UserController.getUser);

UserRouter.route('/:id')
    .patch(_checkAuth, userValidation, upload.single('avatar'), UserController.editUser)
    .delete(_checkAuth ,UserController.removeUser);

UserRouter.get('/:id/products', UserController.getUserProducts);

export default UserRouter;