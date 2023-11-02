const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

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
    res.render("./inventory/classification", {
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
    const grid = await utilities.buildVehicleDetailInfo(data)
    let nav = await utilities.getNav()
    const className = data[0].inv_make + " " + data[0].inv_model
    res.render("./inventory/vehicle", {
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
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        managementView,
    })
}

module.exports = invCont