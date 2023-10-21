// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// add inventory details to router.get or make a new one for the details
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildByVehicleId));

module.exports = router;