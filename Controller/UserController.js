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
        // console.log(req.body)
        const user = await User.create(req.body);
        res.status(200).json("Created a user");
    }catch(error){

        
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}

const getCurrentUser = async (req, res) => {
    try {
        // Assuming you're using JWT token for authentication
        const userId = req.user.id; // Assuming the user ID is stored in the req.user object
        
      
        const user = await User.findById(userId);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





module.exports = {
    getUser,
    postUser,
    getCurrentUser 
  
   
}