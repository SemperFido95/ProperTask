const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET property details

router.get('/:id', async (req, res) => {
    console.log('in get request for propertyDetails');
    const db = await pool.connect();
    let resultData = {};

    try {
        await db.query('BEGIN');
        let queryText = `SELECT * FROM properties WHERE id = $1`;
        let result = await db.query(queryText, [req.params.id]);
        resultData.info = result.rows;
        queryText = `
            SELECT pt.id, t.task FROM property_tasks pt
            JOIN tasks t ON pt.task_id = t.id
            WHERE property_id = $1;
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

    // pool.query(queryText, [req.params.id]).then(result => {
    //     res.send(result.rows);
    // }).catch(error => {
    //     console.log(`Error getting property info: ${error}`);
    //     res.sendStatus(500);
    // });
});

module.exports = router;