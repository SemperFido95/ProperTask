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
        queryText = `SELECT * FROM properties WHERE user_id = $1;`;
        result = await db.query(queryText, [req.user.id]);
        resultData.propertyList = result.rows;
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

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post request for propertyTasks');
    const property = req.body;
    console.log(req.user.id)
    console.log('property:', property);
    const queryText = `
        INSERT INTO property_tasks (user_id, property_id, task_id)
        VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.user.id, property.id, property.task]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error assigning new task: ${error}`);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('In delete request for /property-tasks');
    const queryText = `DELETE FROM property_tasks WHERE id = $1`;
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`Error deleting property task:`, error);
        res.sendStatus(500);
    });
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

module.exports = router;