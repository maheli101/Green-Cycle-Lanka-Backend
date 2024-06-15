const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const VehicleSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    vehicleModel: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
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

const VehicleModel = mongoose.model('Vehicle',VehicleSchema);

module.exports = VehicleModel;
