const User = require("../Models/UserModel.js");

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
    console.log(req.body);
    // console.log(req.data)
     await User.create(req.body);
    // res.status(200).status({ message: "User Created Successful" });
    res.status(200).json({ message: "User Created Successful" });

    // console.log("user created succesefully")
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    console.log("can't create a user")
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

    console.log("Hi");
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
