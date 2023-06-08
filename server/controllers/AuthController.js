import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import {_checkDuplicate} from "../utils/modelsWorker.js";
import {_decodingImageFromPath, _decodingImageToString} from "../utils/fsWorker.js"
import EmailWorker from "../utils/emailWorker.js";
import {emailStrings} from "../utils/strings.js";


import dotenv from "dotenv"
import {_genSixDigitCode} from "../utils/someFunctions.js";
dotenv.config();




class AuthController {
    registration = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const body = req.body;

            const avatar = req.file ? req.file : await _decodingImageFromPath(__dirname + '/user-avatar.png')
            const imageString = _decodingImageToString(avatar)


            const {password, ...userData} = body;
            const hashPassword =  await this.#bcrypt.genPassword(password);


            const doc = new UserModel(
                {...userData, hashPassword, userAvatar: imageString});


            const userId = doc._id;
            const token = this.#createToken(userId);

            await doc.save();

            res.json({...userData, token});

        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});

            if (!user) {
                return req.status(404).json({
                    message: 'Wrong data'
                })
            }

            const isValidPass = this.#bcrypt.readHashPassword(password, user.hashPassword);

            if (!isValidPass) {
                return res.status(404).json({
                    message: 'Invalid login or password'
                })
            }
            const userId = user._id;
            const token = this.#createToken(userId);

            const userData = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                userAvatar: user.userAvatar,
                id: userId,
            }

            res.json({...userData, token})

        } catch (error) {
            res.status(404).json('Wrong data');
        }
    }
    checkDuplicate = async (req, res) =>{
        const value = req.body.value;
       if (await _checkDuplicate({value})){
           return res.json({exists: true})
       }
        return res.json({exists: false})
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

    #createToken(_id) {
        return jwt.sign(
            {
                _id: _id,
            }, process.env.JWT_PRIVITE_KEY,{expiresIn: '30d'});
    }

    #bcrypt ={
        secretNumber: process.env.BCRYPT_NUMBER,

        genPassword: async (password) => {
            const salt = await bcrypt.genSalt(this.#bcrypt.secretNumber);
            return await bcrypt.hash(password, salt);
        },
        readHashPassword: async (password, hashPassword)=>{
           return await bcrypt.compare(password, hashPassword);
        }
    }
}



export default new AuthController;

