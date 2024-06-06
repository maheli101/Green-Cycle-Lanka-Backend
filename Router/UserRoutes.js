const express = require('express');
const router = express.Router();
const {getUser, postUser, getCurrentUser,putUser} = require('../Controller/UserController.js');


router.get('/getUser', getUser);
router.post('/postUser', postUser);
router.get('/getCurrentUser/:id', getCurrentUser);
router.put('/updateCurrentUser/:id',putUser)


module.exports = router;


