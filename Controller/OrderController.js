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
        const orders = await Order.find().populate('user_id', 'name email contactNumber ');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrderLocations = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'pending' });

        const locations = await Promise.all(orders.map(async (order) => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${order.town}&format=json&limit=1`);
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                return {
                    orderId: order._id,
                    town: order.town,
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    user_id: order.user_id,
                    material: order.material,
                    amount: order.amount,
                    status: order.status,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                };
            } else {
                return null;
            }
        }));

        res.json(locations.filter(location => location !== null));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderId = async (req, res) => {
    const order_Id = req.params.id;
    try {
        const data = await Order.findById(order_Id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Update = async (req, res) => {
    const reqId = req.params.id;
    const newStatus = req.body.status;
    try {
        const data = await Order.findByIdAndUpdate(reqId, { status: newStatus }, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};

module.exports = {
    postOrder,
    getOrders,
    getAllOrderLocations,
    getOrderId,
    Update, 
    deleteOrder // Add deleteOrder to the exports
};
