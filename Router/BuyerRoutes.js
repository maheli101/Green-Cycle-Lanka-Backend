const express = require('express');
const router = express.Router();
const {getBuyer, postBuyer} = require('../Controller/BuyerController.js');


router.get('/getBuyer', getBuyer);
router.post('/postBuyer', postBuyer);

module.exports = router;


