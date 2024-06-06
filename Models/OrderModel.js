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
        town: { 
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

// Static method to delete an order by ID
OrderSchema.statics.deleteOrderById = async function(orderId) {
    try {
        const deletedOrder = await this.findByIdAndDelete(orderId);
        return deletedOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
