const express = require("express")
const router = new express.Router()
const utilities = require("../utilities") // this is my connection to the index.
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

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

// new route
router.get(
  "/",
  utilities.handleErrors(accountController.accountView)
)

module.exports = router;