import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {
    // console.log(todo);
    const [description, setDescription] = useState(todo.task)

    //update description function

    const updateDescription = async (e)=>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`/todos/${todo.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(body)
            });
            
            console.log(response); 
            window.location = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id}`}>
                Edit
            </button>

            <div className="modal fade" id={`id${todo.id}`} onClick={()=> setDescription(todo.task)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close border no-border" data-dismiss="modal" onClick={()=> setDescription(todo.task)}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={(e)=> setDescription(e.target.value )}/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e)=> updateDescription(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=> setDescription(todo.task)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;