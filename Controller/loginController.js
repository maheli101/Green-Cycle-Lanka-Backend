const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel.js');
require('dotenv').config(); 

// Controller function for user login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare the password (assuming password is stored in plaintext)
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // If email and password are correct, generate JWT token
    const userId=user._id
    const isDriver=user.type

    const token = jwt.sign(
      { userId: user._id, email: user.email,isDriver:user.type },
      process.env.JWT_SECRET ,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send success response with token
    res.json({ success: true, message: 'Login successful', token ,userId,isDriver});
    console.log(token)

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

module.exports = loginController;
