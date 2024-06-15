const Request = require('../Models/RequestModel.js');
const User = require('../Models/UserModel.js');
const mongoose = require('mongoose');

const postRequest = async (req, res) => {
    try {
        const { userId, material, amount, town, status } = req.body;
        console.log(userId);

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the request
        const request = await Request.create({
            user_id: user._id,
            material,
            amount,
            town,
            status, // Ensure this is provided in the request body
        });

        res.status(200).json({ message: 'Request successful', request });
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
// Helper function to format date to dd/mm/yy without time
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(d.getFullYear()).substr(-2);
    return `${day}/${month}/${year}`;
};

const getRequestsByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        console.log(userId);
        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const requests = await Request.find({ user_id: userId }).populate('user_id', 'name email contactNumber');
        
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No requests found for this user' });
        }
        console.log(requests);
        // Format the createdAt and updatedAt fields
        const formattedRequests = requests.map(request => ({
            _id: request._id,
             user_id: request.user_id,
             material: request.material,
             amount: request.amount,
             town: request.town,
             status: request.status,
             createdAt: formatDate(request.createdAt),
             updatedAt: formatDate(request.updatedAt)
        }));
        console.log(formattedRequests);
        res.status(200).json(formattedRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { material, amount, town } = req.body;

        // Validate requestId
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: 'Invalid requestId format' });
        }

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { material, amount, town },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request updated successfully', updatedRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating request', error: error.message });
    }
};

module.exports = {
    postRequest,
    getRequests,
    deleteRequest,
    getRequestsByUserId,
    updateRequest,
};
