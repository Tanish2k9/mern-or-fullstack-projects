import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./todolist.css"
const TodoList = () => {
  const [itemText,setItemText] = useState("");
  const [listItem,setListItem]= useState([])
  const [whichListEdit,setWhichListEdit]= useState();
  const [updateText,setUpdateText]= useState("");

  useEffect(()=>{
    const fetching = async()=>{
      const allDatas = await axios.get('http://localhost:8000/api/v1/todo');
      console.log(allDatas.data)
      setListItem(allDatas.data)
    }
    fetching();
  },[])

  const addItem=async(e)=>{
    e.preventDefault();
    const res =  await axios.post('http://localhost:8000/api/v1/todo', {item: itemText})
    setListItem([...listItem,res.data])
    setItemText("")
  }



  const deleteItem= async (id)=>{
    const deldata = await axios.delete(`http://localhost:8000/api/v1/todo/${id}`)
    console.log(deldata.data)
    const {_id} = deldata.data
    const newList = listItem.filter((item)=>{
      return item._id!==_id
    })
    setListItem(newList)
  }



  const updateItem = async (taskid,idx)=>{
    if(updateText.length<1){
      setWhichListEdit();
      return;
    }
    const updateData = await axios.put(`http://localhost:8000/api/v1/todo/${taskid}`,{item:updateText});
    
    listItem[idx].item=updateData.data.item;
    setWhichListEdit();
    setUpdateText("");

  }



  const updateCancel=()=>{
    setWhichListEdit("");
    setUpdateText("");
  }

  return (
    <div className='todolist'>
      <h1>TO DO LIST</h1>
        <div className='form-container'>
          <form onSubmit={addItem}>
            <input 
            autoFocus="on"
              placeholder='enter the task'
              value={itemText}
              onChange={(e)=>setItemText(e.target.value)}
            />
            <button type='submit'>submit</button>
          </form>
        </div>
        <div className = "list-container">
          {
            
            listItem.map((todo,idx)=>{
             return (
              
             
              <div className='todo-item' key={todo._id}>
                {whichListEdit===todo._id?
                <>

                <div className='item-text'>
                  <input placeholder='update your task' autoFocus="on" value={itemText+updateText} onChange={(e)=>{setUpdateText(e.target.value)}} />
                </div>
                <div className='item-btn'>
                  <button onClick={()=>updateItem(todo._id,idx)}>save</button>
                  <button onClick={()=>updateCancel()}>cancel</button>
                </div>
                
                </>

                :

                <>
                <div className="item-text">
                  <p>{todo.item}</p>
                </div>
                <div className='item-btn'>
                  <button onClick={()=>setWhichListEdit(todo._id)}>edit</button>
                  <button onClick={()=>deleteItem(todo._id)}>delete</button>
                </div>
                
                
                </>
                }
                
              </div>
              
             )
            })
          }
        </div>
    </div>
  )
}

export default TodoList