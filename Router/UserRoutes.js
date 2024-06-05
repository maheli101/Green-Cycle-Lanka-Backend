const express = require('express');
const router = express.Router();
const {getUser, postUser, getCurrentUser} = require('../Controller/UserController.js');


router.get('/getUser', getUser);
router.post('/postUser', postUser);
router.get('/getCurrentUser', getCurrentUser);


module.exports = router;


