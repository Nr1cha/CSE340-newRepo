const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
            [classification_id]
        )
        console.log({ data });
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}

/* ***************************
 *  Get all vehicle details by vehicle_id
 * ************************** */
async function getInventoryByVehicleId(vehicle_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id
        WHERE i.inv_id = $1`,
            [vehicle_id]
        )
        console.log({ rows: JSON.stringify(data.rows, null, 2) });
        return data.rows
    } catch (error) {
        console.error("getvehiclebyid error " + error)
    }
}

/* ***************************
 *  Get list of classification_id's
QUERY THE DATABASE FOR A LIST OF ID'S
 * ************************** */
async function getClassificationId() {
    try {
        const data = await pool.query(
            `SELECT DISTINCT classification_id AS id, classification_name AS name
            FROM public.classification
            ORDER BY id ASC;`
        )
        console.log({ rows: JSON.stringify(data.rows, null, 2) });
        return data.rows
    } catch (error) {
        console.error("getClassification_id error: " + error)
    }
}

/*******************************
*   add inventory from add-inv form to database
WRITE TO THE DATABASE
* *****************************/
// async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
//     try {
//         const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
//         return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
//     } catch (error) {
//         return error.message
//     }
// }

module.exports = { getClassifications, getInventoryByClassificationId, getInventoryByVehicleId, getClassificationId }