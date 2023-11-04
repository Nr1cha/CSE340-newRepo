// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const validator = require("../utilities/classification-validation");
const invValidator = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// add inventory details to router.get or make a new one for the details
router.get(
  "/detail/:vehicleId",
  utilities.handleErrors(invController.buildByVehicleId)
);

// management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// add classification view
router.get(
  "/add-class",
  utilities.handleErrors(invController.buildAddClassificationView)
);

// add new inventory
router.get("/add-inv", utilities.handleErrors(invController.buildAddInventory));

// Process the add classification data
router.post(
  "/register/classification",
  validator.registationRules(),
  validator.checkRegData,
  utilities.handleErrors(invController.registerClassification)
);

// Process the add_inv data
router.post(
  "/register/vehicle",
  invValidator.registationRules(),
  invValidator.checkRegData,
  utilities.handleErrors(invController.registerVehicle)
);

module.exports = router;
