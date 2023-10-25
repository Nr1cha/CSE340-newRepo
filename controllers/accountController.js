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

module.exports = { buildLogin };