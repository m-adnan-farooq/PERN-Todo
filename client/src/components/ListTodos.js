import React, { useState, useEffect } from 'react'
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,
                {
                    method: "DELETE"
                }
            );
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTodos = async () => {
        try {

            const response = await fetch('http://localhost:5000/todos')
            const data = await response.json();
            setTodos(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])
    return (
        <div className='listTodos'>
            <table className="table table-hover">
                <thead className='text-center'>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td><button className='btn btn-danger' onClick={() => { deleteTodo(todo.todo_id) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListTodos
