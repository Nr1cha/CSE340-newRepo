// Needed Resources 
// building new file for project
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities") // this is my connection to the index.
const accountController = require("../controllers/accountController")

// Route to build account login page
router.get("/login", utilities.handleErrors(accountController.buildLogin)); // build the accountController out more then come back and finish this
router.get("/registration", utilities.handleErrors(accountController.buildRegister));

module.exports = router;