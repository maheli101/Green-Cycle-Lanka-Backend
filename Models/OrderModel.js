const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        town: { // Updated field from address to town
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
