// Needed Resources 
// building new file for project
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities") // this is my connection to the index.
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build account login page
router.get("/login", utilities.handleErrors(accountController.buildLogin)); // build the accountController out more then come back and finish this
router.get("/registration", utilities.handleErrors(accountController.buildRegister));
// Route to build the register

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
    (req, res) => {
      res.status(200).send('login process')
    }
  )
  

module.exports = router;