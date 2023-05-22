const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET properties

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT p.id, p.street, p.city, p.state, p.zip, count(t.id) AS "Tasks" FROM properties p
        JOIN property_tasks pt on p.id = pt.property_id
        JOIN tasks t on pt.task_id = t.id
        WHERE p.user_id = $1
        GROUP BY p.id;
    `;
    pool.query(queryText, [req.user.id]).then(result => {
        console.log('Get request for property_tasks')
        res.send(result.rows);
    }).catch(error => {
        console.log(`Error getting property tasks: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;