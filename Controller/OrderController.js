const Order = require('../Models/OrderModel.js');
const User = require('../Models/UserModel.js');

const postOrder = async (req, res) => {
    try {
        const { email, material, amount, town } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the order
        const order = await Order.create({
            user_id: user._id,
            material,
            amount,
            town, // Updated field from address to town
        });

        res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user_id', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postOrder,
    getOrders,
};
