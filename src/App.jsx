import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([]) // Initially todo listbox is empty

  // We are adding functionality to the functions present in the global context
  // Now we will create our first function addTodo
  const addTodo = (todo)=>{
    // Now the thing is there must be previous existing todo and if we want to add it like this setTodo(todo) then it will simply delete all the todos and put this one
    // So we will do like this 
    setTodos((prev)=> [{id: Date.now(), ...todo}, ...prev]) // Since todo is also an object so we can spread it. Also we are using previous todo by call back
  }

  const updateTodo = (id,todo)=>{
    // Since we have to check from each value so we are using map
    setTodos ((prev)=> prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo )))
    // We are finding id by looping the array prev (as todo is an array). After finding update it by todo or prevTodo. 
  }

  const deleteTodo = (id)=>{
    // We need all value except one value out of all value. So we will use filter
    setTodos ((prev)=> prev.filter((prevTodo)=>prevTodo.id !== id ))
  }

  const toggleComplete = (id)=>{
    setTodos ((prev)=>prev.map((prevTodo)=>prevTodo.id===id? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }

  // Local storage se todos laa rhi hai refresh karne ke baad
  useEffect(()=>{
    const todos  = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  // Local storage me add karne ke baad daalna hai 
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}> {/* We are wrapping this component with ContextApiProvider */}
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
              className='w-full'
              >
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>                         
    </TodoProvider>
  )
}

export default App
