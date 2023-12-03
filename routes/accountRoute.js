const express = require("express")
const router = new express.Router()
const utilities = require("../utilities") // this is my connection to the index.
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const Util = require("../utilities")


// Route to build account login page
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Route to build the register
router.get("/registration", utilities.handleErrors(accountController.buildRegister));

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)


// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// logout and clear the jwt
router.get(
  "/logout",
  (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/account/login");
  }
)

// show the account view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.accountView)
)


// update account view
router.get(
  "/updateAccount/:account_id",
  utilities.handleErrors(accountController.accountUpdateView)
)


// process update changes to database
router.post(
  "/updateAccount",
  regValidate.updateRegistationRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccountDataToDatabase)
)

// save password change to database
router.post(
  "/updatePassword",
  regValidate.updateLoginRules(), // password validation rules
  regValidate.checkPasswordData, // check password things from the database
  utilities.handleErrors(accountController.updatePasswordDataToDatabase)
)



module.exports = router;