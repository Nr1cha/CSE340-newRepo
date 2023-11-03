const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  // console.log(data)
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
// vehicle inventory list page
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data?.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += '<li class="vehicleCard" >';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img class="vehImage1" src="' +
        vehicle.inv_thumbnail +
        '" alt=" ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += '<h2 class="vehicleInvName">';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>"; // how to format price
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 ******************************************/
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* **************************************
 * Build the vehicle details view HTML
 * ************************************ */
// single vehicle details page
Util.buildVehicleDetailInfo = async function (data) {
  if (data?.[0]) {
    let vehicle = data[0];
    let grid = `
            <div class="vehicleContainer">
                <img class ="vehiclaDetailImage" src="${
                  vehicle.inv_image
                }" alt=" picture of ${vehicle.inv_make}">
                <div class="detailsContent">
                    <p class="vdesc vInfo">Description: ${
                      vehicle.inv_description
                    }</p>
                    <p class="vmake vInfo">Make: ${vehicle.inv_make}</p>
                    <p class="vmodel vInfo">Model: ${vehicle.inv_model}</p>
                    <p class="vyear vInfo">Year: ${vehicle.inv_year}</p>
                    <p class="vprice vInfo">Price: ${Intl.NumberFormat(
                      "en-US",
                      { style: "currency", currency: "USD" }
                    ).format(vehicle.inv_price)}</p>
                    <p class="vmileage vInfo">Mileage: ${Intl.NumberFormat(
                      "en-US"
                    ).format(vehicle.inv_miles)}</p>
                    <p class="vcolor vInfo">Color: ${vehicle.inv_color}</p>
                </div>
            </div>
        `;
    return grid;
  } else {
    return '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
};

/****************************************
 * Build the login view page
 * ***************************************/
// login form page
Util.buildLogin = async function () {
  let loginView = `
                <form class="loginForm Form" action="login" method="post">
                <div class="loginForm form">
                    <label for="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="account_email" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="account_password" required>

                    <button type="submit">Login</button>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <span class="accnt">No account? <a href="#">Sign-up</a></span>
                </div>
            </form>
        `;
  return loginView;
};

/****************************************
 * Build the Management view page
 * ***************************************/
// management page
Util.buildManagement = async function () {
  let managementView = `
        <a href="#">Classification View</a>
        <a href="#">Inventory View</a>
        `;
  return managementView;
};

/****************************************
 * Build the add-classification view page
 * ***************************************/
// management page
Util.buildAddClassification = async function () {
  let addClassificationView = `
        <div class="Form">
            <form action="add-classification">
                <p>Field is required</p>
                <p>Classification Name</p>
                <p>Name must be alphabetic characters only.</p>
                <label for="addClassificationView"></label>
                <input type="text" placeholder="Add Classification">
                <button type="submit">Add Classification</button>
            </form>
        </div>
        `;
  return addClassificationView;
};


/****************************************
 * Build the add-inventory page
 * ***************************************/
// login form page
Util.buildAddInventory = async function () {
  let addInventory = `
    <form class="inventoryForm Form" action="inventory" method="post">
    <div class="inventoryForm form">
        <label for="id"><b>ID</b></label>
        <input type="text" placeholder="Enter inventory ID" name="inv_id" required>

        <label for="make"><b>Make</b></label>
        <input type="text" placeholder="Min of 3 characters" name="inv_make" required>

        <label for="model"><b>Model</b></label>
        <input type="text" placeholder="Min of 3 characters" name="inv_model" required>
        
        <label for="year"><b>Year</b></label>
        <input type="text" placeholder="4-digit year" name="inv_year" required>

        <!-- come back to the description -->
        <label for="description"><b>Description</b></label>
        <input type="text" placeholder="Add description" name="inv_description" required>

        <!-- come back to image -->
        <label for="image"><b>Image Path</b></label>
        <input type="text" placeholder="/images/vehicles/imageExample.png" name="inv_image" required>

        <label for="thumbnail"><b>Thumbnail Path</b></label>
        <input type="text" placeholder="/images/vehicles/thumbnail.png" name="inv_thumbnail" required>

        <label for="price"><b>Price</b></label>
        <input type="number" placeholder="decimal or integer" name="inv_price" required>

        <label for="miles"><b>Miles</b></label>
        <input type="number" placeholder="decimal or integer" name="inv_miles" required>

        <label for="color"><b>Color</b></label>
        <input type="text" placeholder="enter color" name="inv_color" required>

        <label for="classificationID"><b>Classification</b></label>
        <input type="text" placeholder="enter classification id" name="classification_id" required>

        <button type="submit">Submit</button>
    </div>

    <div class="container" style="background-color:#f1f1f1">
        <span class="accnt">No account? <a href="#">Sign-up</a></span>
    </div>
  </form>
        `;
  return addInventory;
};


module.exports = Util;
