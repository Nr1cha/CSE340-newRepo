-- add record to account table
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- update account type on account table
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark'
    AND account_email = 'tony@starkent.com'
    AND account_password = 'Iam1ronM@n';
-- delete a record from the account table
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark'
    AND account_email = 'tony@starkent.com'
    AND account_password = 'Iam1ronM@n';
-- update text in a description
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- using inner join 
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM inventory AS i
    INNER JOIN classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- update table to add a new field
UPDATE inventory
SET inv_image = CONCAT(
        '/images/vehicles/',
        inv_make,
        '-',
        inv_model,
        '.jpg'
    ),
    inv_thumbnail = CONCAT(
        '/images/vehicles/',
        inv_make,
        '-',
        inv_model,
        '.jpg'
    );