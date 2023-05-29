import express from "express";
import _checkAuth from "../utils/checkAuth.js";
import UserController from "../controllers/UserController.js";
import multer from "multer";


const upload = multer()
const UserRouter = express.Router();


UserRouter.use(_checkAuth);

UserRouter.get('/:id', UserController.getUser);

UserRouter.route('/:id')
    .patch(upload.single('avatar'), UserController.editUser)
    .delete(UserController.removeUser);

export default UserRouter;