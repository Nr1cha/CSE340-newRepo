const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  classification Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // valid email is required and cannot already exist in the database
    body("classification_name")
      .trim()
      .isAlpha()
      .withMessage("must be alpha characters only")
      .isLength({ min: 1 })
      .withMessage("A valid name is required."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { classification_name } = req.body;
  const addClassificationView = await utilities.buildAddClassification();
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Register Classification",
      nav,
      classification_name,
      addClassificationView,
    });
    return;
  }
  next();
};

module.exports = validate;
