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

// POST 
router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    const todo= req.body.toDoText; 

    const sqlText = `
    INSERT INTO todos
    (text)
    VALUES
    ($1);
    `
    pool.query(sqlText, [todo])
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log('Error in POST /todos', dbError);
            res.sendStatus(500); 
        })
}); 






















module.exports = router;
