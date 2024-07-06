import React from "react";
import "./components/App.css";
import { useState, useEffect } from "react";

function App() {
  const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem("toDos")) || []);
  let [toDo, setToDo] = useState("");
  let [id, setId] = useState(null);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || ["theme1"])
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 760)
  const [showAllTheme,setShowAll] = useState(isMobile ? false :true) 

  // for displying date
  /* const formattedDate= date.toLocaleDateString('en-us',{
    weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'
  }) */
  const date = new Date();
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
  const dayName = daysOfWeek[date.getDay()];
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const dateWithDay = `${dayName}, ${formattedDate}`;

  useEffect(() => {
    // Save to-dos to localStorage whenever toDos state changes
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  useEffect(()=>{
     // save theme to localStorage
     document.body.className = theme;
     localStorage.setItem("theme",JSON.stringify(theme));
  })

  const handleThemeClick = (theme)=>{ 
      if(isMobile){
      setShowAll(showAllTheme ? false : true)
      setTheme(theme)
      }else
      setShowAll(true) 
      setTheme(theme)
  }

  return (
   <main>
    <div className="themeSelector">
      {showAllTheme ? ( 
      <>
         <div className="theme1 theme" onClick={()=>handleThemeClick("theme1")}><span>T1</span></div>
         <div className="theme2 theme" onClick={()=>handleThemeClick("theme2")}><span>T2</span></div>
         <div className="theme3 theme" onClick={()=>handleThemeClick("theme3")}><span>T3</span></div>
      </> 
      ) : (
        <>
          {theme=== 'theme1' && (
            <div className="theme1 theme" onClick={()=>handleThemeClick("theme1")}><p>themes</p></div>
          )}
          {theme=== 'theme2' && (
            <div className="theme2 theme" onClick={()=>handleThemeClick("theme2")}><p>theme</p></div>
          )}
          {theme=== 'theme3' && (
            <div className="theme3 theme" onClick={()=>handleThemeClick("theme3")}><p>theme</p></div>
          )}
        </>
      )}  
    </div>

    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>it's {dateWithDay} 🌝 ☕ </h2>
      </div>

      <div className="input">
        <input value={toDo} 
            onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..."/>
        
        <i onClick={() => {
            if (toDo.length > 0) {
              if (id) {
                setToDos(
                  toDos.map((obj) =>
                    obj.id === id ? { ...obj, text: toDo } : obj
                  )
                );
              } else {
                setToDos([...toDos, { id: Date.now(), text: toDo, status: false },]);
              }
              setToDo("");
              setId(null);
            }
          }}
          className="fas fa-plus"></i>

      </div>

      <h2>My Tasks</h2>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className={obj.className || "todo"}>
              <div className="left">
                <input  className="checkBox"
                   onChange={(e) => {
                    setToDos(toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked;
                          obj2.className = obj2.status ? "toDo-checked" : "todo";  //selecting style for todo
                        }
                        return obj2;
                      })
                    );
                   
             /* // Alternative code

            setToDos((toDos) => 
                toDos.map((obj2) => 
                  obj2.id === obj.id ? { ...obj2, status: e.target.checked } : obj2
                )
              );  */
                  }}
                  checked={obj.status} type="checkbox" name="" id="" />
                <p>{obj.text}</p>
              </div>

              <div>
                <div>
                  <i class="fa-regular fa-pen-to-square"
                    style={{ fontSize: "17px", padding: "2px" }}
                    onClick={(e) => {
                      setToDo(obj.text);
                      setId(obj.id);
                    }} ></i>

                  <i className="fas fa-times"
                    onClick={(e) => {
                      setToDos(toDos.filter((obj2) => obj2.id !== obj.id));
                    }} ></i>
                </div>
              </div>
            </div>
          );
        })};

      </div>
     </div>
    </main>
);
}

export default App;
