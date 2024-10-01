import { useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid"
import {DeleteFilled , EditFilled} from "@ant-design/icons"
import './App.css';
import dayjs from "dayjs"
import { Input, Table } from "antd"
import { TodoContext } from './context/TodoContext';

function App() {
  const { state, dispatch } = useContext(TodoContext)
  const [input, setInput] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const handleEdit = (task) => {
    setInput(task.name)
    inputRef.current.focus();
    setIsEditing(true)
    setEditId(task.id)
  }
  const inputRef = useRef(null)
  const isDuplicateTask = (name) => {
    return state.some((task) => task.name.toLowerCase() === name.toLowerCase())
  }
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      if (!input.trim()) return
      if (isEditing) {
        dispatch({
          type: "EDIT",
          payload: {
            id: editId,
            name: input
          }
        })
        setIsEditing(false)
        setEditId(null)
        setInput("")
        inputRef.current.blur()
      }
      else {
        if(isDuplicateTask(input)){
          alert("Task already exist")
          setInput("")
          return
        }
        dispatch({
          type: "ADD", payload: {
            id: uuidv4(),
            name: input,
            isCompleted: false,
            date: dayjs().format("DD-MM-YYYY")
          }
        })
        setInput("")
      }
    }
  }
  const handleDelete = (task) => {
    dispatch({ type: "DELETE", payload: task })
  }
  const columns = [
    {
      title: 'ID',
      key: 'id',
      render: (task)=> (<div>{task.id.substring(0,5) + "..."}</div>)
    },
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (_, record) => (<p>{record.isCompleted ? "Completed" : "In Progress"}</p>)
    },
    {
      title: "Date",
      dataIndex: "date"
    },
    {
      title: "Action",
      render: (task) => (<div><span onClick={() => handleDelete(task)}><DeleteFilled/></span> <span onClick={() => handleEdit(task)}><EditFilled /></span></div>)
    }
  ];


  return (
    <div className="App">
      <h2 style={{textAlign: "center"}}>Todo App</h2>
      <div className='input__container'>
        <Input placeholder="Add To do" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeydown} />
      </div>

      <Table dataSource={state} columns={columns} pagination={{ pageSize: 5 }} />

    </div>
  );
}

export default App;
