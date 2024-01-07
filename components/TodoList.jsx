'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';


// Self component
const TodoCardList = ({data,handleTodoClick})=>{

  return(
    <div className="mt-16 prompt_layout">
      {
        data.map((todo)=> (
          <TodoCard
          key={todo._id}
          todo={todo}
          handleTodoClick={handleTodoClick}
          />
        ))
      }
    </div>
  )
}
const TodoList = () => {

  const {searchText, setSearchText} = useState("")
  const [todos, setTodos] = useState([])

  // call the api here
  useEffect(() => {


    const fetchTodos = async () => {

      const response = await fetch('/api/todos');

      const  data = await response.json();

      setTodos(data);
    }
    //call the fucntion here
    fetchTodos();
  },[]);

  const handleSearchChange = (e) => {

  }
  

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='Search for Todos...'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        ></input>

      </form>
      <TodoCardList
      data={todos}
      handleTodoClick= {()=>{}}
      />
    </section>
  )
}

export default TodoList
