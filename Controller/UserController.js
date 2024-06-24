const User = require("../Models/UserModel.js");
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, contactNumber, NIC, password, type, profilePicture } = req.body;
    
    // Log the request body (for debugging)
    console.log(req.body);

    // Hash the password
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = {
      name,
      email,
      contactNumber,
      NIC,
      password: hashedPassword,
      type,
      profilePicture
    };

    await User.create(newUser);
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is stored in the req.user object
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "No user" });
  }
};

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
      return res.status(404).json({ message: "Can't update the User" });
    }

    res
      .status(200)
      .send({ message: "User data updated successfully", user: updatedUser });

  
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  postUser,
  getCurrentUser,
  putUser,
};
