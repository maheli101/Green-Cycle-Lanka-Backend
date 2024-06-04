const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
            // unique: true,
            // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        contactNumber: {
            type: String,
            required: false,
            // match: [/^\d{10}$/, 'Please enter a valid contact number']
        },
        NIC: {
            type: String,
            required: false,
            // unique: true
        },
        password: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false,
            // enum: ["user", "driver"],
            // default: "user"
        },
        address: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
