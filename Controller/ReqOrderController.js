const reqOrder = require('../Models/ReqOrder.js');

module.exports.reqOrder = async (req, res) => {
    try {
        const { user_id, user_name, order_id, status,town } = req.body;

        const newReqOrder = new reqOrder({
            user_id,
            user_name,
            order_id,
            status:'pending',
            town
        });

        await newReqOrder.save();

        res.status(201).json({ message: 'ReqOrder created successfully', reqOrder: newReqOrder });
    } catch (error) {
        console.error('Error creating ReqOrder:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.all = async (req, res) => {
    try {
        const data = await reqOrder.find();
        res.status(200).json( data );
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 

module.exports.Delete = async (req, res) => {
    const reqId = req.params.id;

    try {
        const data = await reqOrder.findByIdAndDelete(reqId);
        res.status(200).json( data );
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};             



module.exports.UpdateStatus = async (req, res) => {
    const reqId = req.params.id;
    const newStatus = req.body.status; 

    try {
        const updatedData = await reqOrder.findByIdAndUpdate(reqId, { status: newStatus }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json(updatedData);
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.getOrderId = async (req, res) => {
    const userId = req.params.id;
    try {
        const orders = await reqOrder.find({ status: 'confirmed',user_id:userId });
        //  console.log(orders);
        const locations = await Promise.all(orders.map(async (order) => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${order.town}&format=json&limit=1`);
            const data = await response.json();
             console.log(data);
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return {
                    orderId: order._id,
                    town: order.town,
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    userName: order.user_name,
                    status: order.status,
                    
                };
            } else {
                return null;
            }
        }));

        res.json(locations.filter(location => location !== null));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
