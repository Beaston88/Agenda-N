import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    const [todo,setTodo] = useState("");
    const {addTodo} = useTodo() // We are taking the value from global variable as we have already use useContext from the function useTodo. Also whatever we needed from global variable simply write in the curly braces.

    const add = (e)=>{
        e.preventDefault();
        if(!todo) return
        // We are calling addTodo function but we are not simply passing todo directly because in addTodo function (which is defined in app.jsx) we using spread operator while looping so we have to pass parameters accordingly. One more thing we are not passing id because it is already in the spreading part.
        addTodo({todo,completed:false}) // In new syntax if key and pair both has same name then we can simply give one name no need to give both key and pair.
        setTodo("")
    }
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} // We are wiring function with the element
                onChange={(e)=> setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

