import React from 'react'
import { useState,useEffect } from 'react';

function Counter() {
    const [count,setCount]=useState(0)

     useEffect(()=>{
        console.log('mounting')
        console.log('unmouting'+count)
     },[count])

    
  return (
    <div>
        <button onClick={()=>setCount(count+1)}>Add count</button>
       <h1>I AM COMPONENT:{count}</h1>
    </div>
  )
}

export default Counter;
