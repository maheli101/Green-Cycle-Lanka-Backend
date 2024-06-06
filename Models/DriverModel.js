const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DriverSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    vehicleModel: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    lisonNumber: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    inusaranceCard: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        required: true
    }
    ,
     
});

const DriverModel = mongoose.model('Driver', DriverSchema);

module.exports = DriverModel;
