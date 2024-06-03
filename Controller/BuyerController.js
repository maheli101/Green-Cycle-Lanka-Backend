const Buyer = require('../Models/BuyerModel.js')


const getBuyer = async (req, res) => {
    try {
        const buyer = await Buyer.find();
        res.status(200).json(buyer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postBuyer = async (req, res) => {
    try{
        const buyer = await Buyer.create(req.body);
        res.status(200).json("Created a buyer");
    }catch(error){

        
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}





module.exports = {
    getBuyer,
    postBuyer,
   
}