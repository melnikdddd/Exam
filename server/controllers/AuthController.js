import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import {_createFile, _createUserFolder, _getUserDirPATH, __dirname, _copyFile} from "../utils/myFileSytstemUtil.js";



class AuthController {
     registration = async (req, res)=>{
        try {
            const body = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors.array());
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(body.password, salt);
            const {password, ...userData} = body;

            const doc = new UserModel(...userData, hashPassword);
            const userId = doc._id;
            const user = await doc.save();

            const token = this.createToken(user._id);

            _createUserFolder(userId);

            const userDirPath =_getUserDirPATH(userId);

            if(req.file){
                const avatar = req.file;
                    _createFile(avatar, userDirPath + "user-avatar" + avatar.extname)
            } else {
                const defaultAvatarPath = __dirname + '/user-avatar.png';
                _copyFile(defaultAvatarPath, userDirPath + '/user-avatar.png');
            }


            res.json({...userData, token});


        }catch(error){
            res.status(500).json(error);
        }
    }
     login = async (req, res) =>{
        try{
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});

            if(!user){
                return req.status(404).json({
                    message: 'Wrong data'
                })
            }

            const isValidPass = await bcrypt.compare(password,  user.passwordHash);
            if(!isValidPass){
                return res.status(404).json({
                    message: 'Invalid login or password'
                })
            }
            const id = user._id;
            const token = this.createToken(id);

            const userData = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                avatarUrl: user.avatarUrl,
                id: id,
            }

            res.json({...userData, token})

        }catch (error){
            res.status(404).json('Wrong data');
        }
    }

    createToken(_id){
        return jwt.sign(
            {
                _id: _id,
            })
    }
}

export default new AuthController;

