const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET property details

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM properties WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then(result => {
        console.log(result);
        res.sendStatus(200);
    }).catch(error => {
        console.log(`Error getting property info: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;