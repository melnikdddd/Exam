import express from "express"
import {registrationValidation, loginValidation} from "../validations/authValidatior.js";
import AuthController from "../controllers/AuthController.js";
import multer from "multer";
import {_checkDuplicate} from "../utils/modelsWorker.js";
const AuthRouter = express.Router();

const upload = multer()

AuthRouter.post('/registration',registrationValidation, upload.single('avatar'), AuthController.registration);
AuthRouter.post('/login',loginValidation, AuthController.login);
AuthRouter.post('/verification', AuthController.verification);
AuthRouter.post('/checkDuplicate',AuthController.checkDuplicate())

export default AuthRouter;