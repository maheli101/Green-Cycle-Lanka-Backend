const Request = require('../Models/RequestModel.js');
const User = require('../Models/UserModel.js');

const postRequest = async (req, res) => {
    try {
        const { email, material, amount, town } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the request
        const request = await Request.create({
            user_id: user._id,
            material,
            amount,
            town,
        });

        res.status(200).json({ message: 'Request submitted successfully', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('user_id', 'name email');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postRequest,
    getRequests,
};
