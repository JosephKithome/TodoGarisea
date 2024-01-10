'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '../../components/Form'

const EditTodo = () => {

    const [submitting, setSubmitting] = useState(false);
    const [todo, setTodo] = useState({
        id: '',
        name: '',
        description: '',
    });
    const searchParams = useSearchParams();
    const todoId = searchParams.get('id');

    useEffect(() => {
        const getTododDetails = async () => {
            const response = await fetch(`/api/todos/${todoId}`);
            const data = await response.json();

            // Search through```
           //const newData= JSON.stringify(data.filter(todo => todo._id===todoId))
          
            //console.log("The data.name is: " + JSON.parse(newData));

            //const d = JSON.parse(newData);
            console.log("The name is: " + data.name);
            setTodo({
                // id: data._id,
                name: data.name,
                description: data.description
            })
        };
        if(todoId) getTododDetails();

    }, [todoId])

    const router = useRouter(); // for routing purposes
    //const { data: session } = useSession(); // for retrieving session data

    const editTodo = async (e) => {

        e.preventDefault();
        setSubmitting(true);

        if(!todoId) return alert("Todo id not found");
        try {
            const response = await fetch(`/api/todos/${todoId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: todo.name,
                    description: todo.description,
                    status: true,
                    createdAt: new Date()

                })
            })

            if (response.ok) {
                router.push('/')
            }

        } catch (e) {
            console.log(e)
        }
        finally {
            setSubmitting(false)
        }

    }

    return (
        <div>
            <Form
                type="Update"
                todo={todo}
                setTodo={setTodo}
                submitting={submitting}
                handleSubmit={editTodo}
            />
        </div>
    )
}

export default EditTodo
