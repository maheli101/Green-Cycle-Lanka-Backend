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

const deleteRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const deletedRequest = await Request.deleteRequestById(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting request', error: error.message });
    }
};

module.exports = {
    postRequest,
    getRequests,
    deleteRequest,
};
