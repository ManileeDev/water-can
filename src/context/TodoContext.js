import { createContext, useEffect, useReducer } from "react";
import {v4 as uuidv4} from "uuid"

const getInitialTask = () => {
    const localData = localStorage.getItem("tasks")
    return localData ? JSON.parse(localData) : 
    [{
        id: uuidv4(),
        name: "React Brush up",
        isCompleted: false,
        date: "27-09-2024"
    }, {
        id: uuidv4(),
        name: "Explore AntD",
        isCompleted: false,
        date: "27-09-2024"
    },
    {
        id: uuidv4(),
        name: "Explore Jest and React Testing Library",
        isCompleted: false,
        date: "27-09-2024"
    }]
} 

export const TodoContext = createContext()

const todoReducer = (state,action)=>{
    switch(action.type){
        case "ADD":
            return [...state,action.payload]
        case "EDIT":
            return state.map(todo=> todo.id === action.payload.id ? {...todo, name: action.payload.name} : todo)
        case "DELETE":
            return state.filter(todo=>todo.id!==action.payload.id)
        default:
            return state
    }
}

export const TodoContextProvider = ({children}) => {
   const [state,dispatch] = useReducer(todoReducer,[],getInitialTask)

   useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(state))
  },[state])

return (
    <TodoContext.Provider value={{state,dispatch}}>
        {children}
    </TodoContext.Provider>
)
}