const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET property details

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get request for propertyDetails');
    const queryText = `SELECT * FROM properties WHERE id = $1`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(`Error getting property info: ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;