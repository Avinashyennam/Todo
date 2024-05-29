const express = require("express");
const app = express();
const pool = require("./databasepg");
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());
// app.use(express.json());

//create a todo

app.post("/todo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (task) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log("error is ", error.message);
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error("error is",err.message);
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // const todo = await pool.query("SELECT * FROM todo WHERE id = $1",[id]);
        const todo = await pool.query(`SELECT * FROM todo where id = ${id}`);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        // const updatedTodo = await pool.query(`UPDATE todo SET task = ${description} WHERE id = ${id}`);
        const updatedTodo = await pool.query("UPDATE todo SET task = $1 WHERE id = $2", [description, id]);
        res.json("Todo is updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(`DELETE FROM todo WHERE id = ${id}`);
        res.json(`Todo with id ${id} is deleted`);
    } catch (err) {
        console.error(err.message);
    }
})
app.listen(5000, () => console.log("Server has running on the port 5000"));