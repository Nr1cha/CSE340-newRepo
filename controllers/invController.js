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
  const grid = await utilities.buildVehicleDetailInfo(data, classData);
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
  const managementView = await utilities.buildManagement();
  let nav = await utilities.getNav();
  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}management`, {
    title: "Vehicle Management",
    nav,
    managementView,
  });
};

/* ***************************
 *  Build add-classification view page
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  const addClassificationView = await utilities.buildAddClassification();
  let nav = await utilities.getNav();
  // req.flash("notice", "This is a flash message.");
  res.render(`${inventoryViewsPath}add-classification`, {
    //path to file dont forget this
    title: "Add New Classification",
    nav,
    addClassificationView,
    errors: null

  });
};

/* ***************************
 *  Build add-inventory view page
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  const classData = await invModel.getClassificationId();
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
  let nav = await utilities.getNav();
  const {
    classification_name,
  } = req.body;

  const regResult = await invModel.writeClassificationToDatabase(
    classification_name,
  );

  // const classData = await invModel.getClassificationId();
  const addClassificationView = await utilities.buildAddClassification();
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${classification_name}.`
    );
    res.status(201).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      addClassificationView,
      errors: null

    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      addClassificationView,
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

  const classData = await invModel.getClassificationId();
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${inv_make + " " + inv_model}.`
    );
    res.status(201).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classData,
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

module.exports = invCont;
