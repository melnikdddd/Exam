import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import {_checkDuplicate} from "../utils/modelsWorker.js";
import {_decodeImageToString} from "../utils/fsWorker.js"


import dotenv from "dotenv"
dotenv.config();




class AuthController {
    registration = async (req, res) => {
        try {
            const body = req.body;

            if (!body){
                return res.status(400).json({
                    message: 'Request body is missing',
                });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const salt = await bcrypt.genSalt(10);
            const {password, ...userData} = body;
            const hashPassword = await bcrypt.hash(password, salt);


            const avatar = req.file ? req.file : __dirname + '/user-avatar.png'
            const imageString = _decodeImageToString(avatar)


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

            const isValidPass = await bcrypt.compare(password, user.hashPassword);
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
           return await this.#emailVerification(req, res)
        }
        else if (verificationType === 'phoneNumber'){
           return await this.#phoneNumberVerification(req, res)
        }

        return res.status(400).json({
            message: "Bad request"
        })
    }
    #emailVerification = async (req, res) =>{

    }
    #phoneNumberVerification = async (req, res) =>{}
    #createToken(_id) {
        return jwt.sign(
            {
                _id: _id,
            }, process.env.JWT_PRIVITE_KEY,{expiresIn: '30d'});
    }
}



export default new AuthController;

