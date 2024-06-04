const express = require('express');
const router = express.Router();
const { postRequest, getRequests } = require('../Controller/RequestController.js');

router.post('/postRequest', postRequest);
router.get('/getRequests', getRequests);

module.exports = router;