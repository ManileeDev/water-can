import { useContext, useState } from 'react';
import './App.css';
import dayjs from "dayjs"
import { Table } from "antd"
import { TodoContext } from './context/TodoContext';
import dog from "./images/doggy.png"

function App() {
  const { state, addName } = useContext(TodoContext)
  const [input, setInput] = useState("")

  const handleClick = (e) => {
      if (!input.trim()) return
      addName(input,dayjs().format("DD-MM-YYYY"))
      setInput("")      
  }

  const columns = [
    {
      title: 'ID',
      key: 'id',
      render: (text,record,index) => (<p>{index+1}</p>)
    },
    {
      title: 'Yaaru Pottadhu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
  ];

  const options = ["Ajith","Mani","Arun(Walter)","Eaga","Abiyash","Shanmugam"]
 

  return (
    <div className="App">
      <img style={{marginTop: "20px"}} src="https://preview.redd.it/anna-yaru-v0-h5vkaa7wre9c1.jpeg?width=259&format=pjpg&auto=webp&s=ada08cbe59e18f89621c3c8e19ca7891dabc9a32" alt='thanni can'/>
      <div className='input__container'>
        <select className='select' value={input} onChange={(e)=>setInput(e.target.value)}>
          <option value="" disabled>Select</option>
          {options.map((op,i)=>(<option key={i} value={op}>{op}</option>))}
        </select>
        <img src={dog} alt="cheems" width="50px" onClick={handleClick} />
      </div>

      <Table dataSource={state} columns={columns} pagination={{ pageSize: 9 }} />

    </div>
  );
}

export default App;
