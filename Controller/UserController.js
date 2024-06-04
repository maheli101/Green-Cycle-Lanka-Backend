const User = require('../Models/UserModel.js')


const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json("Created a user");
    }catch(error){

        
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}





module.exports = {
    getUser,
    postUser,
   
}