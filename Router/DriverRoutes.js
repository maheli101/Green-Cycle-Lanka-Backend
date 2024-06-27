const express = require("express");
const router = express.Router();
const {postVehicle,getVehicle,getCurrentVehicle,} = require("../Controller/DriverController.js");
const verify = require('./../Middlewawre/verify.js')
let DriverControl = require("../Models/DriverModel.js");
router.get("/getVehicle", getVehicle);
router.get("/getCurrentVehicle", getCurrentVehicle);
router.post("/postVehicle",verify, postVehicle);

module.exports = router;
