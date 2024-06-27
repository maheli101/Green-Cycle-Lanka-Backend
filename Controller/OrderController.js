const Order = require('../Models/OrderModel.js');
const User = require('../Models/UserModel.js');
const mongoose = require('mongoose');

const postOrder = async (req, res) => {
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

        // Create the order
        const order = await Order.create({
            user_id: user._id,
            material,
            amount,
            town,
            status, // Ensure this is provided in the request body
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

// Helper function to format date to dd/mm/yy without time
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(d.getFullYear()).substr(-2);
    return `${day}/${month}/${year}`;
};


const getOrdersByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        console.log(userId);
        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const orders = await Order.find({ user_id: userId }).populate('user_id', 'name email contactNumber');
        

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Format the createdAt and updatedAt fields
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            user_id: order.user_id,
            material: order.material,
            amount: order.amount,
            town: order.town,
            status: order.status,
            createdAt: formatDate(order.createdAt),
            updatedAt: formatDate(order.updatedAt)
        }));
        console.log(formattedOrders);
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { material, amount, town } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { material, amount, town }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

const saveComment = async (req,res) =>{
    const { comment, mood } = req.body; 
    const commentSchema = new mongoose.Schema({
        comment: String,
        mood: String,
      });
      
      const Comment = mongoose.model('Comment', commentSchema);
    try {
      const newComment = new Comment({ comment, mood });
      await newComment.save();
      res.status(201).json({ message: 'Comment saved successfully' });
    } catch (err) {
      console.error('Error saving comment:', err);
      res.status(500).json({ error: 'Failed to save comment' });
    }
  };




module.exports = {
    postOrder,
    getOrders,
    updateOrder,
    getAllOrderLocations,
    getOrderId,
    Update, 
    getOrdersByUserId,
    deleteOrder, // Add deleteOrder to the exports
    saveComment
};
