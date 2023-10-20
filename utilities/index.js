const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    // console.log(data)
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    console.log({ data, location: 'index.js:32' })
    let grid
    if (data?.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>' // how to format price
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


/* **************************************
* Build the vehicle details view HTML
* ************************************ */
Util.buildVehicleDetailInfo = async function (data) {
    if (data?.[0]) {
        let vehicle = data[0]
        let grid = `
            <div class="vehicleContainer">
                <img src="${vehicle.inv_image}" alt=" picture of ${vehicle.inv_make} ${vehicle.inv_model}">
                <p class="vdesc vInfo">Description: ${vehicle.inv_description}</p>
                <p class="vmake vInfo">Make: ${vehicle.inv_make}</p>
                <p class="vmodel vInfo">Model: ${vehicle.inv_model}</p>
                <p class="vmileage vInfo">Mileage: ${vehicle.inv_miles}</p>
                <p class="vcolor vInfo">Color: ${vehicle.inv_color}</p>
                <p class="vyear vInfo">Year: ${vehicle.inv_year}</p>
                <p class="vprice vInfo">Price: ${vehicle.inv_price}</p>
            </div>
        `
        return grid;
    }
    else {
        return '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
}



module.exports = Util