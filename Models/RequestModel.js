const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
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

RequestSchema.statics.deleteRequestById = async function(requestId) {
    try {
        const deletedRequest = await this.findByIdAndDelete(requestId);
        return deletedRequest;
    } catch (error) {
        throw new Error(error.message);
    }
};

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;
