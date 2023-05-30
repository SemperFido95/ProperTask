const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET properties

// router.get('/', rejectUnauthenticated, (req, res) => {
//     const queryText = `
//         SELECT p.id, p.street, p.city, p.state, p.zip, count(t.id) AS "Tasks" FROM properties p
//         JOIN property_tasks pt on p.id = pt.property_id
//         JOIN tasks t on pt.task_id = t.id
//         WHERE p.user_id = $1
//             AND pt.complete = false
//         GROUP BY p.id
//         ORDER BY "Tasks" DESC;
//     `;
//     pool.query(queryText, [req.user.id]).then(result => {
//         console.log('Get request for property_tasks')
//         res.send(result.rows);
//     }).catch(error => {
//         console.log(`Error getting property tasks: ${error}`);
//         res.sendStatus(500);
//     });
// });

router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('in get request for propertyTasks');
    const db = await pool.connect();
    let resultData = {};

    try {
        await db.query('BEGIN');
        let queryText = `
            SELECT p.id, p.street, p.city, p.state, p.zip, count(t.id) AS "Tasks" FROM properties p
            JOIN property_tasks pt on p.id = pt.property_id
            JOIN tasks t on pt.task_id = t.id
            WHERE p.user_id = $1
                AND pt.complete = false
            GROUP BY p.id
            ORDER BY "Tasks" DESC;
        `;
        let result = await db.query(queryText, [req.user.id]);
        resultData.propertyTasks = result.rows;
        queryText = `
            SELECT * FROM tasks
            WHERE user_id = $1;
        `;
        result = await db.query(queryText, [req.user.id]);
        resultData.taskList = result.rows;
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

module.exports = router;