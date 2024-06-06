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
        const userId = req.params.id; // Assuming the user ID is stored in the req.user object
        
      
        const user = await User.findById(userId);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putUser = async (req, res) => {

    try {
        // Extract the user ID from the request parameters
        const userId = req.params.id;
    
        // Extract the user data from the request body
        const userData = req.body;
    
        // Find the user by ID and update their information
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: userData }, // Set the updated fields
          { new: true, runValidators: true } // Return the updated document and run validators
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ message: "User data updated successfully", user: updatedUser });
      } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports = {
    getUser,
    postUser,
    getCurrentUser ,
    putUser
}