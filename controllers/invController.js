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
    const className = data[0].classification_name
    res.render("./inventory/vehicle", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

module.exports = invCont