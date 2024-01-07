import React from 'react'
import Link from 'next/link'

const Form = ({
    type,
    todo,
    setTodo,
    submitting,
    handleSubmit }) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Todo</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} & and track your todo list here
            </p>

            <form onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
                <label><span className='font-santoshi
                 text-base text-gray-700'>Jot down your tomorrow activities here</span>
                 <input
                 value={todo.name} 
                 onChange={(e)=>setTodo({...todo,
                 name: e.target.value})}
                 placeholder='Write your todo here'
                 required
                 className='form_input'/>
                 </label>

                 <label><span className='font-santoshi
                 text-base text-gray-700'>Description</span>
                 <textarea
                 value={todo.description} 
                 onChange={(e)=>setTodo({...todo,
                 description: e.target.value})}
                 placeholder='Description'
                 required
                 className='form_textarea'/>
                 </label>

                 <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
                    <button type='submit'
                    disabled={submitting}
                    className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                        { submitting ? `${type}...`: type}
                    </button>
                 </div>
            </form>
        </section>
    )
}

export default Form
