import UserModel from "../models/UserModel.js";


class UserController{
    getUser = async(req,res) => {
        try {
            const user = await UserModel.findById(req.userId);

            if(!user){
                return res.status(404).json({message: 'User can`t find'});
            }

            res.json({...user});

        } catch (error){
            res.status(500).send(error);
        }
    }
    removeUser = async (req,res) =>{
        try {
            const userId = req.params.id;
            UserModel.findOneAndDelete({userId});
            res.json({success: true});

        } catch (error){
            res.json({success: false})
        }
    }
    editUser = async (req, res) =>{
        try {
            const userId = req.params.id;
            const body = req.body;

            await UserModel.findOneAndUpdate({
                    _id: userId,
                },
                {...body});
            res.json({success: true});

        } catch (error){
            res.json({success: false})
        }
    }
    createUser = async (req, res) => {

    }

}

export default new UserController;
