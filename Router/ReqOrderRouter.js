const express = require('express');
const router = express.Router();
const controller = require('../Controller/ReqOrderController')


router.post('/',controller.reqOrder)
router.get('/',controller.all)
router.delete('/:id',controller.Delete)
router.put('/:id',controller.UpdateStatus)

module.exports = router;
