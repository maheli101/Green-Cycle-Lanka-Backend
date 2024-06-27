const express = require('express');
const router = express.Router();
const { postRequest, getRequests, deleteRequest, getRequestsByUserId, updateRequest } = require('../Controller/RequestController.js');

router.post('/postRequest', postRequest);
router.get('/getRequests', getRequests);
router.delete('/deleteRequest/:id', deleteRequest);npm start
router.get('/getRequestsByUserId/:id', getRequestsByUserId); // This should be GET
router.post('/updateRequest/:id', updateRequest);

module.exports = router;
