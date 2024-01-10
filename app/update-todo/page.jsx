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
            const response = await fetch(`/api/todos?id=${todoId}`);
            const data = await response.json();

            // Search through```
           //const newData= JSON.stringify(data.filter(todo => todo._id===todoId))
           alert(JSON.stringify(JSON.stringify(data)));
          
            console.log("The data.name is: " + data.name);
            setTodo({
                // id: data._id,
                name: data.name,
                description: data.description
            })
        };
        if(todoId) getTododDetails();

    }, [todoId])

    //const router = useRouter(); // for routing purposes
    //const { data: session } = useSession(); // for retrieving session data

    // const createTodo = async (e) => {

    //     e.preventDefault();
    //     setSubmitting(true);
    //     try {
    //         const response = await fetch('/api/todos/new', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 name: todo.name,
    //                 description: todo.description,
    //                 userId: session?.user.email,
    //                 status: false,
    //                 createdAt: new Date()

    //             })
    //         })

    //         if (response.ok) {
    //             router.push('/')
    //         }

    //     } catch (e) {
    //         console.log(e)
    //     }
    //     finally {
    //         setSubmitting(false)
    //     }

    // }

    return (
        <div>
            <Form
                type="Update"
                todo={todo}
                setTodo={setTodo}
                submitting={submitting}
                handleSubmit={() => { }}
            />
        </div>
    )
}

export default EditTodo
