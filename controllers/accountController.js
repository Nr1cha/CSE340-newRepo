const utilities = require("../utilities") // this is my connection to the index. ask brooke

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav();
    // const loginView = await utilities.buildLogin()
    req.flash("notice", "This is a flash message.")
    res.render("account/login", {
        title: "Login",
        nav,
        // loginView,
    });
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
    })
}

module.exports = { buildLogin, buildRegister };