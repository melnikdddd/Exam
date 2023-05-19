import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) =>{

    //get token form header and split him
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(403).json({message: 'You are is not auth'});
    }

    try {
        //декодирование и отправка его дальше в работу
        const decoded = jwt.verify(token, 'BenyaTheDog');
        req.userId = decoded._id;
        next();

    }catch (err){
        console.log("jwt error");
        return res.status(403).json({
            message: err
        })
    }
}

export default checkAuth();