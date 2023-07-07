import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import {_checkDuplicate} from "../utils/modelsWorker.js";
import EmailWorker from "../utils/contacts/emailWorker.js";
import {emailStrings, userString} from "../utils/strings.js";


import dotenv from "dotenv"
import {_genSixDigitCode} from "../utils/someFunctions.js";
import Jwt from "../utils/auth/jwt.js";
dotenv.config();




class AuthController {
    registration = async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({success: false, message: "Wrong data"});
            }


            const body = req.body;


            if (body.email){
                if (await _checkDuplicate(["email"],body.email)){
                    return res.status(409).json({success: "Duplicate error", message: "This email is already exists"})
                }
            }

            if (body.phoneNumber){
                if (await _checkDuplicate(["phoneNumber"], body.phoneNumber)){
                    return res.status(409).json({success: "Duplicate error" ,message: "This phone number is already exists"})
                }
            }

            const {password, ...userData} = body;
            const hashPassword =  await this.#bcrypt.genPassword(password);


            const doc = new UserModel(
                {...userData, hashPassword});


            const userId = doc._id;
            const token = Jwt.sign(userId);


            await doc.save();


            res.status(200).json({success: true, user: {...userData}, token: token});

        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: "Something going wrong."});
        }
    }
    login = async (req, res) => {
        try {
            const password = req.body.password;
            const identity = req.body?.email || req.body.phoneNumber;
            const identityType = req.body?.email ? "email" : "phoneNumber";

            const user = await UserModel.findOne({[identityType] : identity}).select(userString);

            if (!user) {
                return res.status(404).json({
                  success : "User cant find",
                })
            }

            const isValidPass = await this.#bcrypt.readHashPassword(password, user.hashPassword);

            if (!isValidPass) {
                return res.status(401).json({
                    success: 'Invalid login or password'
                })
            }

            const userId = user._id;
            const token = Jwt.sign(userId);


            res.json({
                success: true,
                user: user,
                token : token
            })

        } catch (error) {
            console.log(error);
            res.status(404).json({error});
        }
    }
    checkDuplicate = async (req, res) =>{
        const {valueType, value} = req.body;
        const flag = await _checkDuplicate(valueType, value);
        res.status(200).json({flag: flag});
    }
    verification = async (req, res) =>{
        const {verificationType} = req.body;
        if (verificationType === 'email'){

        }
        else if (verificationType === 'phoneNumber'){

        }
        return res.status(400).json({
            message: "Bad request"
        })
    }

    #verificationService = class {
        verificationCode = '';
        sendEmailCode = async (code, email) =>{
            this.verificationCode = _genSixDigitCode();
            const subject = '[' + this.verificationCode + ']';

           return await EmailWorker.sendMail(email, subject, this.#messagesText.email)
        }
        sendPhoneCode = async (code, ...params) =>{
            this.verificationCode = _genSixDigitCode();
        }

        #messagesText = {
            email: emailStrings.verificationCode(this.verificationCode),
        }


    }

    #bcrypt ={
        secretNumber: process.env.BCRYPT_NUMBER,

        genPassword: async (password) => {
            const salt = await bcrypt.genSalt(+this.#bcrypt.secretNumber);
            return await bcrypt.hash(password, salt);
        },
        readHashPassword: async (password, hashPassword)=>{
           return await bcrypt.compare(password, hashPassword);
        }
    }
}



export default new AuthController;

