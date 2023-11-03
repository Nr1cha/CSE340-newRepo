const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const inventoryViewsPath = "./inventory/"

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render(`${inventoryViewsPath}classification`, {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build by vehicleID details view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
    const vehicle_id = req.params.vehicleId
    const data = await invModel.getInventoryByVehicleId(vehicle_id)
    const grid = await utilities.buildVehicleDetailInfo(data, classData)
    let nav = await utilities.getNav()
    const className = data[0].inv_make + " " + data[0].inv_model
    res.render(`${inventoryViewsPath}vehicle`, {
        title: className,
        nav,
        grid,
    })
}


/* ***************************
 *  Build by management page
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
    // const vehicle_id = req.params.vehicleId
    const managementView = await utilities.buildManagement()
    let nav = await utilities.getNav()
    // req.flash("notice", "This is a flash message.");
    res.render(`${inventoryViewsPath}management`, {
        title: "Vehicle Management",
        nav,
        managementView,
    })
}


/* ***************************
 *  Build add-classification view page
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
    const addClassificationView = await utilities.buildAddClassification()
    let nav = await utilities.getNav()
    // req.flash("notice", "This is a flash message.");
    res.render(`${inventoryViewsPath}add-classification`, { //path to file dont forget this
        title: "Add New Classification",
        nav,
        addClassificationView,
    })
}

/* ***************************
 *  Build add-inventory view page
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
    const classData = await invModel.getClassificationId()
    let nav = await utilities.getNav()
    // req.flash("notice", "This is a flash message.");
    res.render(`${inventoryViewsPath}add-inventory`, { //path to file dont forget this
        title: "Add New Inventory",
        nav,
        classData,
    })
}

module.exports = invCont