'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import Profile from './ui/profile';

const MyProfile = () => {

    const { data: session } = useSession();
    const [todos, setTodos] = useState([]);

    useEffect(() => {


        const fetchTodos = async () => {

            const response = await fetch(`/api/users/${session?.user?.email}/todos`);

            const data = await response.json();

            setTodos(data);
        }
        //call the fucntion here
        // if (session.user?.email) 
        fetchTodos();
    }, []);


    const handleEdit = async () => {

    }

    const handleDelete = async () => {

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
