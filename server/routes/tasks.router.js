const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('in get request for /api/tasks')
    const queryText = `
        INSERT INTO tasks (user_id, task)
        VALUES ($1, $2);
    `;
    pool.query(queryText, [req.user.id, req.body.task]).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error getting tasks: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;