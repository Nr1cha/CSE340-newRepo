const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const inventoryViewsPath = "./inventory/";

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render(`${inventoryViewsPath}classification`, {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build by vehicleID details view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId;
  const data = await invModel.getInventoryByVehicleId(vehicle_id);
  const grid = await utilities.buildVehicleDetailInfo(data);
  let nav = await utilities.getNav();
  const className = data[0].inv_make + " " + data[0].inv_model;
  res.render(`${inventoryViewsPath}vehicle`, {
    title: className,
    nav,
    grid,
  });
};

/* ***************************
 *  Build by management page
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {

  // const vehicle_id = req.params.vehicleId
  let nav = await utilities.getNav();
  const classData = await invModel.getClassificationIds();

  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}management`, {
    title: "Vehicle Management",
    nav,
    classData
  });
};

/* ***************************
 *  Build add-classification view page
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}add-classification`, {
    //path to file dont forget this
    title: "Add New Classification",
    nav,
    errors: null
  });
};

/* ***************************
 *  Build add-inventory view page
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  const classData = await invModel.getClassificationIds();
  let nav = await utilities.getNav();
  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}add-inventory`, {
    //path to file dont forget this
    title: "Add New Inventory",
    nav,
    classData,
    errors: null
  });
};

/*****************************************
 *  Process add classification
 * ****************************************/
invCont.registerClassification = async function (req, res) {
  const {
    classification_name,
  } = req.body;

  const regResult = await invModel.writeClassificationToDatabase(
    classification_name,
  );
  let nav = await utilities.getNav();


  // const classData = await invModel.getClassificationIds();
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you registered: ${classification_name}.`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null
    });
  }
}


/*****************************************
 *  Process add_inv
 * ****************************************/
invCont.registerVehicle = async function (req, res) {
  let nav = await utilities.getNav();
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;

  const regResult = await invModel.writeAdd_invToDatabase(
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  );

  const classData = await invModel.getClassificationIds();

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${inv_make + " " + inv_model}.`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null

    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classData,
      errors: null

    });
  }
}



/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.getVehicleById = async function (req, res, next) {
  let vehicleId = parseInt(req.params.inventory_id)
  const classData = await invModel.getClassificationIds();
  let nav = await utilities.getNav();
  let inventory = getInventoryByVehicleId(vehicleId);
  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}edit-inventory`, {
    //path to file dont forget this
    title: `Edit ${inventory.inv_make} ${inventory.inv_model}`,
    nav,
    classData,
    errors: null,
    ...inventory
  });
};


module.exports = invCont;
