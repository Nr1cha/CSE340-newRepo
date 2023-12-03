// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const validator = require("../utilities/classification-validation");
const invValidator = require("../utilities/inventory-validation");
const accountValidator = require("../utilities/account-validation");

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
router.get(
  "/",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.buildManagementView)
);

// add classification view
router.get(
  "/add-class",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.buildAddClassificationView)
);

// add new inventory
router.get(
  "/add-inv",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.buildAddInventory)
);

// Process the add classification data
router.post(
  "/register/classification",
  accountValidator.checkAccntAccess,
  validator.registationRules(),
  validator.checkRegData,
  utilities.handleErrors(invController.registerClassification)
);

// Process the add_inv data
router.post(
  "/register/vehicle",
  accountValidator.checkAccntAccess,
  invValidator.registationRules(),
  invValidator.checkRegData,
  utilities.handleErrors(invController.registerVehicle)
);

//new js event
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// route for an inventory item to edit
router.get(
  "/edit/:inventory_id",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.getVehicleById)
);

//update part 2 of the assignment
router.post(
  "/update",
  accountValidator.checkAccntAccess,
  invValidator.registationRules(),
  invValidator.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

//deliver the delete view
router.get(
  "/delete/:inv_id",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.deleteView)
);

// delete the item
router.post(
  "/delete/",
  accountValidator.checkAccntAccess,
  utilities.handleErrors(invController.deleteItem)
)

module.exports = router;
