import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
const URL = process.env.REACT_APP_API_URL;

export const TodoContext = createContext()

const todoReducer = (state,action)=>{
    switch(action.type){
        case"SETNAMES" : return action.payload
        case "ADD":
            return [...state,action.payload]
        default:
            return state
    }
}

export const TodoContextProvider = ({children}) => {
   const [state,dispatch] = useReducer(todoReducer,[])
   
   useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get(URL)
        dispatch({
            type:"SETNAMES",
            payload: response.data.data,
        })
      }
      catch(err){
        console.error(err.message)
      }
    };
    fetchData();
      
  },[])

   const addName = async (name,date) => {
    try{
        await axios.post(`${URL}add`,{name,date})
        dispatch({type: "ADD", payload: {name,date}})
    }
    catch(err){
        console.log(err.message)
    }
   }

   useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(state))
  },[state,dispatch])

return (
    <TodoContext.Provider value={{state,addName}}>
        {children}
    </TodoContext.Provider>
)
}