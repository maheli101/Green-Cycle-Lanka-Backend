const express = require('express');
const router = express.Router();
const { postOrder, getOrders, getAllOrderLocations, getOrderId, Update, deleteOrder } = require('../Controller/OrderController.js');

router.post('/postOrder', postOrder);
router.get('/getOrders', getOrders);
router.get('/locations', getAllOrderLocations);
router.get('/:id', getOrderId);
router.put('/:id', Update);
router.delete('/deleteOrder/:id', deleteOrder); // Add the delete order route

module.exports = router;
