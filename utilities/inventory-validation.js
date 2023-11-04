const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};
const invModel = require("../models/inventory-model");


/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("inv_make")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid make."), // on error this message is sent.

    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid model."),

    body("inv_year")
      .trim()
      .isNumeric()
      .isLength({ min: 4 })
      .withMessage("Please provide a valid year."),

    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid year."),

    body("inv_image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid image path."),

    body("inv_thumbnail")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid thumbnail path."),

    body("inv_price")
      .trim()
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("Please provide a valid price."),

    body("inv_miles")
      .trim()
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("Please provide valid miles."),

    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid color."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const classData = await invModel.getClassificationId();
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-inventory", {
      errors,
      title: "Register new vehicle",
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classData,
    });
    return;
  }
  next();
};

module.exports = validate;
