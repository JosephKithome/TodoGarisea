import React from 'react';
import TodoCard from '@/components/TodoCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className="nt-10 prompt_layout">
        {
          data.map((todo) => {
        
            return (
              <TodoCard
                key={todo._id}
                todo={todo}
                handleEdit={() => handleEdit && handleEdit(todo)}
                handleDelete={() => handleDelete && handleDelete(todo)}
              />
            );
          })
        }
      </div>
    </section>
  );
}

export default Profile;
