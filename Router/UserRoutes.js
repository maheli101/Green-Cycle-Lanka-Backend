const express = require('express');
const router = express.Router();
const {getUser, postUser, getCurrentUser,putUser} = require('../Controller/UserController.js');
const verify = require('./../Middlewawre/verify.js')


router.get('/getUser', getUser);
router.post('/postUser', postUser);
router.get('/getCurrentUser/:id',verify, getCurrentUser);
router.put('/updateCurrentUser/:id',verify,putUser)


module.exports = router;


