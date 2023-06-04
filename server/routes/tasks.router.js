const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Create new task
router.post('/', rejectUnauthenticated, (req, res) => {
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

// Update task
router.put('/:id', rejectUnauthenticated, (req, res) => {
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

// Delete Task
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('in delete request for /api/tasks');
    const db = await pool.connect();

    try {
        await db.query('BEGIN');
        // First, delete all tasks that been assigned in property_tasks table
        let queryText = `
            DELETE FROM property_tasks
            WHERE task_id = $1;
        `;
        let result = await db.query(queryText, [req.params.id]);
        // Second, delete task from tasks table
        queryText = `
            DELETE FROM tasks
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