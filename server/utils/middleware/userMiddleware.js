export const filterUpdateUser = (req, res, next) =>{
    const {id} = req.body;
    const userId = req.userId;

    if (userId === id){
        next();
        return;
    }

    next();
}