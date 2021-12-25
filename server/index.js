const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body (get all the data)

//ROUTES//
//creating connection to the database
pool.connect()

app.post('/todos', async (req, res) => {
    var query = `INSERT INTO todo (description) VALUES ($1) RETURNING *`;
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            query,
            [description]
        );
        res.json(newTodo.rows[0])
    }
    catch (err) {
        console.error(err)
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    var query = `SELECT * FROM todo`;
    try {
        var todos = await pool.query(
            query
        );
        res.send(todos.rows)
    }
    catch (err) {
        console.error(err)
    }
})

//get a specific todo item
app.get('/todos/:id', async (req, res) => {
    var query = `SELECT * FROM todo WHERE todo_id=${req.params.id}`; //req.params gets the url input (:id)
    //alternate method
    // const { id } = req.params;
    // var query = `SELECT * FROM todo WHERE todo_id = $1`, [id]

    try {
        var todo = await pool.query(
            query
        );
        res.send(todo.rows)
    } catch (error) {
        console.error(error)
    }
})

//Update a todo item
app.put('/todos/:id', async (req, res) => {
    var query = `UPDATE todo SET description = $1 WHERE todo_id = $2`
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(query, [description, id]);
        res.json(`to do with id: ${id} was updated`);
    }
    catch (error) {
        console.error(error)
    }
})

//delete a todo item

app.delete("/todos/:id", async (req, res) => {

    try {
        var query = `DELETE FROM todo WHERE todo_id = $1`;
        var { id } = req.params

        var deleteTodo = await pool.query(
            query, [id]
        )
        res.json(`Todo with id: ${id} was deleted successfully`)
    } catch (error) {
        // console.log(error.message)
    }

})

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})
