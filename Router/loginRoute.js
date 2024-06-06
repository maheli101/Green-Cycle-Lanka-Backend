const express = require('express');
const router = express.Router();
const loginController = require('../Controller/loginController');


router.post('/',loginController)

module.exports = router;
