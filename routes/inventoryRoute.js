// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// add inventory details to router.get or make a new one for the details
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildByVehicleId));

// management view
router.get("/", utilities.handleErrors(invController.buildManagementView));
// add classification view
router.get("/add-class", utilities.handleErrors(invController.buildAddClassificationView));
// add new inventory
// router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

module.exports = router;