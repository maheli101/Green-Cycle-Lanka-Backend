const mongoose = require('mongoose');

const BuyerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },


        age: {
            type: Number,
            required: [true, "Please enter age"],
            default: 0
        },
        address: {
            type: String,
            required: false,
       
        },
        
    },
    {
        timestamps: true,
    }

);

const Buyer = mongoose.model('Buyer', BuyerSchema);
module.exports = Buyer;