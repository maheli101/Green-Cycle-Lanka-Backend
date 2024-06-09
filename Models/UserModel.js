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
            unique:true
             
        },
        contactNumber: {
            type: String,
            required: false,
           
        },
        NIC: {
            type: String,
            required: false,
            unique:true
           
        },
        password: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true,
            
            
        }
        
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
