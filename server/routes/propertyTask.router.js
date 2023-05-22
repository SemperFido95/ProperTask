const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET properties

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM property_tasks WHERE user_id = $1`;
    pool.query(queryText, [req.user.id]).then(result => {
        console.log('Get request for property_tasks')
        res.send(result.rows);
    }).catch(error => {
        console.log(`Error getting property tasks: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;