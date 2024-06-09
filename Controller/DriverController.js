const { response } = require("express");
let VehicleModel = require("../Models/DriverModel.js");
const User = require("../Models/UserModel");


const postVehicle = async (req, res) => {
  try {
      console.log(req.body)
     const userId = req.headers["id"];
     const isDriver = req.headers["driver"];
     const {vehicleModel,capacity,lisonNumber,vehicleNumber,inusaranceCard,fuel} = req.body;
      console.log(isDriver)
     if (isDriver !=="Driver") {
          // console.log("jfbfbwefwefwfwf")
        return res.status(403).json({ message: "Only drivers can register vehicles" });
     }const newVehicle = new VehicleModel({
      owner: userId, // Assign the user ID to the driver's user field
      vehicleModel,
      capacity,
      lisonNumber,
      vehicleNumber,
      inusaranceCard,
      fuel,
    });

    console.log(newVehicle)

    await newVehicle.save();
    res.status(200).json({ status: "Success", message: "Driver added successfully" });
  } catch (err) {
    console.log(`Can't add driver: ${err}`);
    res.status(500).json({ status: "Error", message: `Can't add driver: ${err}` });
  }

  }


const getVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleModel.find();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentVehicle = async (req, res) => {
  try {
    constdriverid = req.params.id;
    const vehicle = await VehicleModel.findById(constdriverid);
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(404).json({ message: "No Vehicle" });
  }
};

module.exports = {
  postVehicle,
  getVehicle,
  getCurrentVehicle,
};
