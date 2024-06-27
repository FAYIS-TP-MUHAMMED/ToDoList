
import React from 'react';
import './components/App.css';
import { useState } from 'react';

function App() {
  const [toDos,setToDos]=useState([])
  let [toDo,setToDo]=useState([])
  const date= new Date();
 /* const formattedDate= date.toLocaleDateString('en-us',{
    weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'
  }) */
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[date.getDay()];
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const dateWithDay = `${dayName}, ${formattedDate}`;
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading"> 
        <br />
        <h2>it's {dateWithDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{setToDos([...toDos,{id:Date.now(), text:toDo,status:false}]);setToDo("")}} className="fas fa-plus"></i>
      </div>
      
      <h2>My Tasks</h2>
      <div className="todos">
        {  toDos.map((obj)=>{ 
         
        return( 
        <div className={obj.className || 'todo'}>
          <div className="left">
            <input className='checkBox' onChange={(e)=>{
    
           setToDos(toDos.map(obj2=>{
                if(obj2.id===obj.id){
                  obj2.status=e.target.checked;
                  obj2.className= obj2.status ? "toDo-checked" : "todo";
                }
                return obj2    
              }))  

            /* // Alternative code

            setToDos((toDos) => 
                toDos.map((obj2) => 
                  obj2.id === obj.id ? { ...obj2, status: e.target.checked } : obj2
                )
              );  */

                        }} checked={obj.status} type="checkbox" name="" id="" />
            <p>{obj.text}</p>
          </div>

       <div>
          <div>
            <i class="fa-regular fa-pen-to-square" style={{fontSize:"17px",padding:"2px"}}
              onClick={(e)=>{
                
              }}></i>

            <i className="fas fa-times" onClick={(e)=>{
              setToDos(toDos.filter(obj2=>
                obj2.id !== obj.id));
            }}></i>
          </div>
       </div>

        </div>
        )
         })
         };
         
         {/* {toDos.map((obj)=>{
          if(obj.status){
            return(<h2>{obj.text}</h2>)
          }
          return null 
         })}    */}

      </div>
    </div>
  );
}

export default App;

