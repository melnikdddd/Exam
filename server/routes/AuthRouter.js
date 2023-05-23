import express from "express"
import {registrationValidation, loginValidation} from "../validations/authValidatior.js";
import AuthController from "../controllers/AuthController.js";
import multer from "multer";
const AuthRouter = express.Router();

const upload = multer()

AuthRouter.post('/registration', registrationValidation, upload.single('avatar'), AuthController.registration);
AuthRouter.post('/login',loginValidation, AuthController.login);

export default AuthRouter;