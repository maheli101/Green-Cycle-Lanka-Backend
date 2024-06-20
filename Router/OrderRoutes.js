const express = require('express');
const router = express.Router();
const { postOrder, getOrders, getAllOrderLocations, getOrderId, Update, deleteOrder,getOrdersByUserId,updateOrder, saveComment } = require('../Controller/OrderController.js');

router.post('/postOrder', postOrder);
router.get('/getOrders', getOrders);
router.get('/locations', getAllOrderLocations);
router.get('/:id', getOrderId);
router.put('/:id', Update);
router.delete('/deleteOrder/:id', deleteOrder); // Add the delete order route
router.post('/getOrdersByUserId/:id', getOrdersByUserId); // Add the delete order route
router.post('/updateOrder/:id', updateOrder); // Add the delete order route
router.post('/driver_comments', saveComment); // Add the delete order route
module.exports = router;
