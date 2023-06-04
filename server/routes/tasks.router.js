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

router.put('/:id', (req, res) => {
    console.log('in put request for /api/tasks');
    const queryText = `UPDATE tasks SET task = $1 WHERE id = $2;`;
    pool.query(queryText, [req.body.task, req.body.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`error updating properties: ${error}`);
        res.sendStatus(500);
        });
});

router.delete('/:id', (req,res) => {
    console.log('in delete request for /api/tasks');
    const queryText = `DELETE FROM tasks WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(`Error deleting task: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;