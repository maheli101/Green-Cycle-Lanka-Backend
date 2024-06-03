const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        contactNumber: {
            type: String,
            required: [true, "Please enter contact number"],
            match: [/^\d{10}$/, 'Please enter a valid contact number']
        },
        NIC: {
            type: String,
            required: [true, "Please enter NIC"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        },
        repeatPassword: {
            type: String,
            required: [true, "Please repeat your password"],
            validate: {
                validator: function(value) {
                    return value === this.password;
                },
                message: 'Passwords do not match'
            }
        },
        type: {
            type: String,
            required: [true, "Please select a type"],
            enum: ["user", "driver"],
            default: "user"
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
