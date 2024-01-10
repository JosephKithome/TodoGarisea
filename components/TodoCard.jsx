'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import NextIcon from '../public/log.png';
import { TickIcon } from '../public/assets/icons/tick.svg';
import CopyIcon from '../public/assets/icons/copy.svg';


const TodoCard = ({ todo, handleTodoClick, handleEdit, handleDelete }) => {

    const [cleared, setCleared] = useState("");
    const [copied, setCopied] = useState(false);
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();


    const handleCopy = () => {

        setCopied(true);
        navigator.clipboard.writeText(todo.name);

        // reset the copy
        setTimeout(() => setCopied("", 3000));
    }
    return (
        <div className="">
            <div class="chat-notification">
                <div class="chat-notification-content">
                    <p class="chat-notification-message">{todo.name}</p>
                </div>
            </div>

            <div className='prompt_card'>

                <div className="flex justify-between items-start gap-5">
                    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                        <Image
                            src={NextIcon}
                            alt='Next Todo'
                            width={40}
                            height={40}
                            className='rounded-full object-contain'
                        />
                       
                    </div>
                    <div className="copy_btn"
                        onClick={handleCopy}>
                        <Image
                            src={copied === todo.name ? TickIcon : CopyIcon}
                            width={12}
                            height={12}
                            alt='error'
                        />
                    </div>
                </div>
                <p className='my-4 font-santoshi text-sm text-gray-700'>{todo.name}</p>
                <p className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTodoClick && handleTodoClick(todo._id)}>{todo.description}</p>
                <p className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTodoClick && handleTodoClick(todo._id)}><span
                        className='my-4 font-santoshi text-sm text-gray-700'>Date Created:</span>  {todo.creationDate}</p>
                         <div className="flex flex-col">
                            <h3 className='font-santoshi font-semibold text-gray-900'>CreatedBy: {todo.creator}</h3>
                        </div>
                {session?.user.email === todo.creator && pathName === '/profile' && (
                    <div className="mt-5 flex-center gap-4 border-gray-100 pt-3">
                        <p className='font-inter text-sm green_gradient cursor-pointer'
                            onClick={handleEdit}>Edit</p>
                        <p className='font-inter text-sm orange_gradient cursor-pointer'
                            onClick={handleDelete}>Delete</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoCard
