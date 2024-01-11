'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import { useSession } from 'next-auth/react';


// Self component
const TodoCardList = ({ data, handleTodoClick }) => {

  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((todo) => (
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

  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState([])

  const { data: session } = useSession();

  // call the api here
  useEffect(() => {


    const fetchTodos = async () => {

      const response = await fetch('/api/todos');

      const data = await response.json();

      setTodos(data);
    }
    //call the fucntion here
    fetchTodos();
  }, []);

  const handleSearchChange = (e) => {66
    const query = e.target.value;
    setSearchText(query);

    // Filter the data based on the search query
    const filteredResults = todos.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Update the state with the filter
    setTodos(filteredResults);
  }


  return (

    <section className='feed'>
      {
        session?.user?.email &&
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
      }
      {
        session?.user?.email &&
        <TodoCardList
          data={todos}
          handleTodoClick={() => { }}
        />
      }
    </section>
  )
}

export default TodoList
