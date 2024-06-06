const reqOrder = require('../Models/ReqOrder.js');

module.exports.reqOrder = async (req, res) => {
    try {
        const { user_id, user_name, order_id, status } = req.body;

        const newReqOrder = new reqOrder({
            user_id,
            user_name,
            order_id,
            status:'pending'
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
