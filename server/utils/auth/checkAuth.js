import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const _checkAuth = (req, res, next) =>{


    const authorizationToken = req.headers.authorization;

    if (!authorizationToken){
        return res.status(403).json({message: 'You are is not auth'});
    }

    //get token form header and split him
    const token = authorizationToken.split(' ')[1];

    if(!token){
        return res.status(403).json({message: 'You are is not auth'});
    }

    try {
        //декодирование и отправка его дальше в работу
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.userId = decoded._id;
        next();

    }catch (err){
        console.log("jwt error");
        return res.status(403).json({
            message: err
        })
    }
}

export default _checkAuth;