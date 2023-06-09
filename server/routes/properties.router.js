const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Get property details
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('in GET request for /api/properties');
    const db = await pool.connect();
    let resultData = {};

    try {
        await db.query('BEGIN');
        let queryText = `SELECT * FROM properties WHERE id = $1`;
        let result = await db.query(queryText, [req.params.id]);
        resultData.info = result.rows;
        queryText = `
            SELECT pt.id, t.task, pt.complete FROM property_tasks pt
            JOIN tasks t ON pt.task_id = t.id
            WHERE property_id = $1
            ORDER BY pt.complete, pt.id;
        `;
        result = await db.query(queryText, [req.params.id]);
        resultData.tasks = result.rows;
        await db.query('COMMIT');
        res.send(resultData);
    } catch (error) {
        console.log('ROLLBACK', error);
        await db.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        db.release();
    }
});

// Update property details
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in PUT request for /api/properties');
    const property = req.body;
    const queryText = `
        UPDATE properties
        SET street = $1, city = $2, state = $3, zip = $4
        WHERE id = $5;
    `;
    pool.query(queryText, [property.street, property.city, property.state, property.zip, property.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`Error updating properties: ${error}`);
            res.sendStatus(500);
        });
});

// Create new property
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST request for /api/properties');
    const property = req.body;
    const queryText = `
        INSERT INTO properties (user_id, street, city, state, zip)
        VALUES ($1, $2, $3, $4, $5);    
    `;
    pool.query(
        queryText, [req.user.id, property.street, property.city, property.state, property.zip]
    ).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error posting new property: ${error}`);
        res.sendStatus(500);
    });
});

// Delete Property
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('in DELETE request for /api/properties');
    const db = await pool.connect();

    try {
        await db.query('BEGIN');
        // First, delete all tasks that been assigned to this
        // property in the property_tasks table
        let queryText = `
            DELETE FROM property_tasks
            WHERE property_id = $1;
        `;
        let result = await db.query(queryText, [req.params.id]);
        // Second, delete property from properties table
        queryText = `
            DELETE FROM properties
            WHERE id = $1;
        `;
        result = await db.query(queryText, [req.params.id]);
        await db.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        console.log('ROLLBACK', error);
        await db.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        db.release();
    }
});

module.exports = router;