const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET property details

router.get('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('in get request for propertyDetails');
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in put request for propertyDetails');
    console.log(req.body);
    console.log(req.params.id);
    const queryText = `UPDATE property_tasks SET complete = $1 WHERE id = $2`;
    pool.query(queryText, [req.body.complete, req.params.id]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error in put: ${error}`);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('in post request for properties');
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

module.exports = router;