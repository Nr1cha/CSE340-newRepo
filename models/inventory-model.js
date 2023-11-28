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
async function getClassificationIds() {
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
*   add classification from /inv form to database
WRITE TO THE DATABASE
* *****************************/
async function writeClassificationToDatabase(classification_name) {
    try {
        const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
        return await pool.query(sql, [classification_name])
    } catch (error) {
        return error.message
    }
}

/*******************************
*   add inventory from add-inv form to database
WRITE TO THE DATABASE
* *****************************/
async function writeAdd_invToDatabase(classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) {
    try {
        const sql = "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color])
    } catch (error) {
        return error.message
    }
}

async function classificationExists(classification_id) {
    try {
        const sql = `
            SELECT classification_id FROM classification 
            WHERE classification_id = $1
        `
        const classID = await pool.query(sql, [classification_id])
        return classID.rowCount
    } catch (error) {
        return error.message
    }
}

/*******************************
*   update inventory to database
* *****************************/
async function updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id) {
    try {
        const sql = `
        UPDATE public.inventory SET inv_make = $1, 
        inv_model = $2, 
        inv_description = $3, 
        inv_image = $4, 
        inv_thumbnail = $5, 
        inv_price = $6, 
        inv_year = $7, 
        inv_miles = $8, 
        inv_color = $9, 
        classification_id = $10
        WHERE inv_id = $11 
        RETURNING *
         `
        const data = await pool.query(sql, [
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            classification_id,
            inv_id
        ])
        return data.rows[0]
    } catch (error) {
        console.error("model error: " + error)
    }
}



/*******************************
*   delete inventory from database
* *****************************/
async function deleteItem(
    inventory_id
) {
    try {
        const sql = `
        DELETE 
        FROM inventory 
        WHERE inv_id = $1
         `
        const data = await pool.query(sql, [
            inventory_id
        ])
        return data
    } catch (error) {
        console.error("Delete inventory: " + error)
    }
}


module.exports = {
    getClassifications,
    getInventoryByClassificationId,
    getInventoryByVehicleId,
    getClassificationIds,
    writeClassificationToDatabase,
    writeAdd_invToDatabase,
    classificationExists,
    updateInventory,
    deleteItem
}
