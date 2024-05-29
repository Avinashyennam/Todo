import React, { useState, useEffect } from "react";
import EditTodo from './EditTodo';
const ListTodo = () => {

    const [tasks, setTasks] = useState([]);

    const getTodos = async ()=>{
        try {
            // const response = await fetch("/todos")
            // const responseData = await response.json();

            fetch("/todos")
            .then((response)=> response.json())
            .then((data)=> { 
                // console.log(data);
                setTasks(data);
            })
            .catch((err)=>{console.log("error is ",err)});

            // console.log(responseData);
        } catch (error) {
            console.log("error is ",error);
        }
    }

    //delete todo
    const deleteTodo = async (id)=>{
        try {
            const deleted = await fetch(`/todos/${id}`,{
                method: "DELETE"
            });
            // console.log(deleted);
            setTasks(tasks.filter(item => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTodos();
    },[]);
    // console.log(tasks);
    return (
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.task}</td>
                            <td><EditTodo todo={item} /></td>
                            <td>
                                <button className="btn btn-danger" onClick={()=> deleteTodo(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListTodo;