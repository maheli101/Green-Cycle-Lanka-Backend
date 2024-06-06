const mongoose = require('mongoose');

const ReqOrder = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        }, 
        order_id: {
            type: String,
            required: true,
        },
        town: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        }
    },
    {
        timestamps: true,
    }
);

const reqOrder = mongoose.model('ReqOder', ReqOrder);
module.exports = reqOrder;