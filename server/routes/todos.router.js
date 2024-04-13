const router = require('express').Router();
const pool = require('../modules/pool');

// GET 
router.get('/', (req, res) =>{
    console.log('GET /todos is working');
    //SQL query to send to the DB
    const sqlText = `
    SELECT * FROM todos
    ORDER BY text
    `
    // use pool object to query the DB
    pool.query(sqlText)
        .then((dbResult) => {
            let toDoInput = dbResult.rows; 
            res.send(toDoInput); 
        })
        .catch((dbError) => {
            console.log('DB query failed inside GET /todos. Error is:', dbError);
            res.sendStatus(500);
        })
}); 























module.exports = router;
