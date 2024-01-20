import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [todosperpage, setTodosperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect( () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then( (res)=>setTodos(res.data) )
  }, [] )

  const totalPages = Math.ceil(todos.length/todosperpage);
  const pages = [...Array(totalPages+1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todosperpage;
  const indexOfFirstTodo = indexOfLastTodo - todosperpage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  function handlePrev(){
    if(currentPage !== 0){
      setCurrentPage(currentPage-1)
    }
  }

  function handleNext(){
    if(currentPage !== totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  return (
    <div className="App">
      <div> { visibleTodos.map( (todo) => <p key={todo.id}> {todo.title} </p> ) } </div>
      <div onClick={handlePrev}>Previous</div>
      <div> { pages.map( (page)=> (<span className= {`${currentPage === page ? "active" : ""}`} onClick={ () => setCurrentPage(page) } key={page}> {`${page} | `} </span>) ) } </div>
      <div onClick={handleNext}>Next</div>
    </div>
  );
}

export default App;
