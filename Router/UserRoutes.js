const express = require('express');
const router = express.Router();
const {getUser, postUser} = require('../Controller/UserController.js');


router.get('/getUser', getUser);
router.post('/postUser', postUser);

module.exports = router;


