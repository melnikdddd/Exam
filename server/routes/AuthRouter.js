import express from "express"
import {registrationValidation, loginValidation} from "../validations/authValidations.js";
import AuthController from "../controllers/AuthController.js";
const AuthRouter = express.Router();

AuthRouter.post('/registration',registrationValidation, AuthController.registration);
AuthRouter.post('/login',loginValidation, AuthController.login);

export default AuthRouter;