import React, {useState} from "react";

const InputTodo = () =>{

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("/todo",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response.json());
            window.location = "/";
            // response.then((res)=> res.json())
            // .then((data)=> console.log(data))
            // .catch((err)=> console.log(err));

            // https://api.imgflip.com/get_memes

            // fetch("https://localhost:5000/todo",{
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(body)
            // })

            // let p = await fetch("/todos");
            // p.then((res)=>{
            //     return res.json();
            // } )
            // .then((data)=>{
            //     console.log(data);
            // } )
            // .catch((err)=> console.log("error is ",err));

            // fetch("/todos")
            // .then((response)=> response.json())
            // .then((data)=> { console.log(data)})
            // .catch((err)=>{console.log(err)});
        } catch (err) {
            console.log(err.message);
        }
    }
    return(
        <div className="mx-auto">
            <h1 className="text-center mt-5">Todo App</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" className="form-control"
                 value={description}
                 onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    )
}

export default InputTodo;