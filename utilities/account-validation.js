const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};
const accountModel = require("../models/account-model");

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the database
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required.")
      .custom(async (account_email) => {
        const accountId = await accountModel.checkExistingEmail(
          account_email
        );
        if (accountId) {
          throw new Error("Email exists. Please log in or use different email");
        }
      }),

    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};



/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/updateView", {
      errors,
      title: "Update Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};



/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.updateRegistationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the database
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required.")
      .custom(async (account_email, { req }) => {
        const accountId = await accountModel.checkExistingEmail(
          account_email
        );
        if (accountId && accountId != req.body.account_id) {
          throw new Error("Email exists. Please log in or use different email");
        }
      }),
  ];
};



/* ******************************
 * validate login
 * ***************************** */

validate.loginRules = () => {
  return [
    // firstname is required and must be string
    body("account_email")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid Email."), // on error this message is sent.

    // lastname is required and must be string
    body("account_password")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Please provide a password."), // on error this message is sent.

  ];
};




/* ******************************
 * validate login
 * ***************************** */

validate.updateLoginRules = () => {
  return [
    // password is required and must be strong password
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),

  ];
};



/* ******************************
 * Check the login data
 * ***************************** */

validate.checkLoginData = async (req, res, next) => {
  const { account_email, account_password } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
      account_password
    });
    return;
  }

  next();
};


/* ******************************
 * Check account access
 * ***************************** */

validate.checkAccntAccess = async (req, res, next) => {
  // check the account type
  if (
    res.locals.accountData.account_type === "Employee" ||
    res.locals.accountData.account_type === "Admin"
  ) {
    //user has the correct type and can have access
    return next();
  } else {
    // user has no access
    req.flash("error", "Access denied. Insufficient privileges.");
    return res.redirect("/account/login");
  }
};

module.exports = validate;
