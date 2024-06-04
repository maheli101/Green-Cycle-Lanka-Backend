const express = require('express');
const router = express.Router();
const { postOrder, getOrders } = require('../Controller/OrderController.js');

router.post('/postOrder', postOrder);
router.get('/getOrders', getOrders);

module.exports = router;
