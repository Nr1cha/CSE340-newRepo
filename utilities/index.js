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
                <img class ="vehiclaDetailImage" src="${vehicle.inv_image
      }" alt=" picture of ${vehicle.inv_make}">
                <div class="detailsContent">
                    <p class="vdesc vInfo">Description: ${vehicle.inv_description
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
        <a href="/inv/add-class">Classification View</a>
        <a href="/inv/add-inv">Inventory View</a>
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
    <form action="/inv/register/classification" method="post">
        <p>Field is required</p>
        <p>Classification Name</p>
        <label for="addClassification">Name must be alphabetic characters only.
        <input id="addClassification" type="text" placeholder="Add Classification" name="classification_name">
        </label>
        <button type="submit">Add Classification</button>
    </form>
  </div>
        `;
  return addClassificationView;
};


/****************************************
 * Build the add-inventory page
 * ***************************************/
// add-inventory page
Util.buildAddInventory = async function () {
  return addInventory;
};


module.exports = Util;
