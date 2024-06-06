const express = require('express');
const router = express.Router();
const { postRequest, getRequests, deleteRequest } = require('../Controller/RequestController.js');

router.post('/postRequest', postRequest);
router.get('/getRequests', getRequests);
router.delete('/deleteRequest/:id', deleteRequest);

module.exports = router;