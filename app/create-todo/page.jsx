'use client'
import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import  Form from '../../components/Form'

const CreateTodo = () => {

  const [submitting, setSubmitting] = useState(false);
  const  [todo,setTodo] = useState({
    id: '',
    name: '',
    description: '',
  });

  const router = useRouter(); // for routing purposes
  const {data: session} = useSession(); // for retrieving session data

  const createTodo = async (e) => {

    e.preventDefault();
    setSubmitting(true);
    try{
      const  response = await  fetch('/api/todos/new',{
        method: 'POST',
        body: JSON.stringify({
          name: todo.name,
          description: todo.description,
          userId: session?.user.email,
          status: false,
          createdAt: new Date()

        })
      })

      if(response.ok){
        router.push('/')
      }

    }catch(e){
      console.log(e)
    }
    finally{
      setSubmitting(false)
    }

  }

  return (
    <div>
      <Form
      type ="Create"
      todo={todo}
      setTodo={setTodo}
      submitting={submitting}
      handleSubmit={createTodo}
      />
    </div>
  )
}

export default CreateTodo
