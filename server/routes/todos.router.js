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

// DELETE

router.delete('/:todo_id', (req, res) => {
    console.log('req.params is:', req.params);
    const toDoToDelete = req.params.todo_id; 

    const sqlText = `
     DELETE FROM todos
     WHERE id =$1;
    `

    pool.query(sqlText, [toDoToDelete])
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log('DELETE /todos/:todo_id failed:', dbError);
            res.sendStatus(500); 
        })
})

// PUT 

router.put('/:todo_id', (req, res) => {
    //get the id from the params, store in a variable called idOfToDo
    let id = req.params.todo_id; 
    sqlText = `
    UPDATE todos
    SET "isComplete"=TRUE
    WHERE id=$1
    `
    pool.query(sqlText, [id])
    .then(() => {
        res.sendStatus(200)
    })
    .catch((error)=> {
        console.log('Error on PUT route /todos/:id', error);
        res.sendStatus(500);
    })
})


module.exports = router;
