const utilities = require("../utilities"); // this is my connection to the index. ask brooke
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const invModel = require("../models/inventory-model");
require("dotenv").config()

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  const loginView = await utilities.buildLogin();
  req.flash("notice", "This is a flash message.");
  res.render("account/login", {
    title: "Login",
    nav,
    loginView,
  });
}

/* ****************************************
 *  Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}

/*****************************************
 *  Process Registration
 * ****************************************/
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration."
    );
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    );
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      erorrs: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account/")
    }
    req.flash("notice", "Please check your credentials and try again.")
    res.status(401).render("account/login", {
      title: "Login",
      nav,
      erorrs: null,
      account_email,
    })
  } catch (error) {
    return new Error('Access Forbidden')
  }
}


// account view controller
async function accountView(req, res) {
  let nav = await utilities.getNav();
  res.render("account/account", {
    title: "My Account",
    nav,
    errors: null
  });
}

// account view controller
async function accountUpdateView(req, res) {
  let nav = await utilities.getNav();
  res.render("account/updateView", {
    title: "Update Account",
    nav,
    errors: null
  });
}

/*****************************************
 *  add new updated account to database
 * ****************************************/
async function updateAccountDataToDatabase(req, res) {
  let nav = await utilities.getNav();
  const {
    account_id,
    account_firstname,
    account_lastname,
    account_email,
  } = req.body;

  const regResult = await accountModel.updateAccnt(
    account_id,
    account_firstname,
    account_lastname,
    account_email,
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you updated ${account_firstname}.`
    );
    res.status(201).render("account/account", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the update failed.");
    res.status(501).render("account/account", {
      title: "account update",
      nav,
    });
  }
}


module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, accountView, accountUpdateView, updateAccountDataToDatabase };