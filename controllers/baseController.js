const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("index", { title: "Home", nav })
}

baseController.intentionalError = async function (req, res) {
    throw Error('Oh no! There was a crash. Maybe try a different route?')
}

// accountController.buildLogin = async function (req, res) {
//     const nav = await utilities.buildLogin()
//     res.render("index", { title: "Home", nav })
// }

module.exports = baseController