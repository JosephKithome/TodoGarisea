'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import Profile from './ui/profile';

const MyProfile = () => {

    const { data: session } = useSession();
    const [todos, setTodos] = useState([]);
    const router = useRouter();

    useEffect(() => {


        const fetchTodos = async () => {

            try {
                console.log('Fetching');
                const response = await fetch(`/api/users/${session?.user?.email}/todos`);

                console.log("The resource", session.user.email)
                const data = await response.json();
                console.log(data);
                setTodos(data);
            } catch (e) {
                console.log(e);
            }
        }
        //call the fucntion here
        if (session?.user?.email)
            fetchTodos();
    }, []);


    const handleEdit = async (todo) => {

        router.push(`/update-todo?id=${todo._id}`);

    }

    const handleDelete = async (todo) => {
        const hasConfirmed = confirm('Are you sure you want to delete this todo?');
        if (hasConfirmed) {
            try {
                await fetch(`/api/todos/${todo._id.toString()}`,{
                    method: 'DELETE'
                });
                
                const filteredTodos = todos.filter((p)=>p._id !==todo._id);
                setTodos(filteredTodos);
            } catch (err) {

                console.log(err);
            }

        }

        // router.push(`/delete-todo?=${todo._id}`);
    }
    return (
        <div>
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={todos}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default MyProfile
