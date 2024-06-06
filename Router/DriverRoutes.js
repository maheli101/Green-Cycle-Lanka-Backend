const express = require("express");
const router = express.Router();

const User = require("../Models/UserModel");
let DriverControl = require("../Models/DriverModel.js");

// Adding driver to the database
router.route("/add").post(async (req, res) => {
  try {
    const userId = req.headers["id"];
    const isDriver = req.headers["isdriver"];
    const {
      vehicleModel,
      capacity,
      lisonNumber,
      vehicleNumber,
      inusaranceCard,
      fuel,
    } = req.body;

    // Check if the user exists and is a driver
    const user = await User.findById(userId); // Assuming you have a User model
    // if (!user) {
    //
    //     return res.status(404).json({ status: "Error", message: "User not found" });
    // }

    if (isDriver !== "Driver") {
      return res
        .status(403)
        .json({ status: "Error", message: "User is not a driver" });
    }

    // If the user is a driver, proceed to save the driver details

    const newDriver = new DriverControl({
      user: userId, // Assign the user ID to the driver's user field
      vehicleModel,
      capacity,
      lisonNumber,
      vehicleNumber,
      inusaranceCard,
      fuel,
    });

    console.log(newDriver);

    await newDriver.save();

    res
      .status(200)
      .json({ status: "Success", message: "Driver added successfully" });
  } catch (err) {
    console.log(`Can't add driver: ${err}`);
    res
      .status(500)
      .json({ status: "Error", message: `Can't add driver: ${err}` });
  }
});

// Get all drivers
router.route("/get").get((req, res) => {
  DriverControl.find()
    .then((drivers) => {
      res.status(200).json({ status: "Drivers found", data: drivers });
    })
    .catch((err) => {
      console.log(`Can't get drivers: ${err}`);
      res
        .status(500)
        .json({ status: "Error", message: `Can't get drivers: ${err}` });
    });
});

// Update a driver
router.route("/update/:id").put((req, res) => {
  const driverId = req.params.id;
  const {
    vehicleModel,
    capacity,
    lisonNumber,
    vehicleNumber,
    inusaranceCard,
    fuel,
  } = req.body;

  const updateDriver = {
    vehicleModel,
    capacity,
    lisonNumber,
    vehicleNumber,
    inusaranceCard,
    fuel,
  };

  DriverControl.findByIdAndUpdate(driverId, updateDriver)
    .then(() => {
      res.status(200).send({ status: "Driver updated" });
    })
    .catch((err) => {
      console.log(`Error updating driver: ${err}`);
      res
        .status(500)
        .json({ status: "Error updating data", error: err.message });
    });
});

module.exports = router;
