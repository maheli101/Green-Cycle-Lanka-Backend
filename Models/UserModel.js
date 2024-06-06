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
             
        },
        contactNumber: {
            type: String,
            required: false,
           
        },
        NIC: {
            type: String,
            required: false,
           
        },
        password: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false,
            
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
