'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NextIcon from '../public/log.png'
import Profile from '../public/next.svg'
import { useState, useEffect } from 'react'

import { signIn, signOut, useSession, getProviders } from 'next-auth/react'



const NavBar = () => {

    const isUserAuthenticated = true;
    const [providers, setProviders] = useState(null)
    const { toggleDropDown, setToggleDropDown } = useState(false)


    useEffect(() => {

        const setProviderss = async () => {
            const response = await getProviders()

            setProviders(response)

        }

        setProviderss();
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src={NextIcon}
                    alt='TodoGarisea'
                    width={50}
                    height={50}
                    className='object-container' />
                <p className='orange_gradient text-center'>TodoGarisea</p>
            </Link>

            {/* cater for mobile ui */}

            <div className="sm:flex hidden">
                {isUserAuthenticated ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-todo' className='black_btn'>Add Todo</Link>
                        <button type='button' className='outline_btn' onClick={signOut}>SignOut</button>

                        <Link href="/" className='flex gap-2 flex-center'>
                            <Image
                                src={NextIcon}
                                alt='profile'
                                width={50}
                                height={50}
                                className='rounded-full' />
                        </Link>
                    </div>
                ) :
                    <>
                        {
                            providers && Object.values(providers).map(provider => (
                                <button
                                    type='button' className='black_btn'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}>
                                    Sign In with {provider.name}
                                </button>
                            ))
                        }
                    </>
                }
            </div>
            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">

                {
                    isUserAuthenticated ? (
                        <div className="flex">
                            <Image
                                src={Profile}
                                alt='profile'
                                width={37}
                                height={37}
                                className='rounded-full'
                                onClick={() => { setToggleDropDown((prev) => !prev) }} />

                            {
                                toggleDropDown && (
                                    <div className="dropdow">
                                        <Link href='/profile'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropDown(true)}>
                                                My Profile
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    ) :

                        <>
                            {
                                providers && Object.values(providers).map(provider => (
                                    <button
                                        type='button' className='black_btn'
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}>
                                        Sign In with {provider.name}
                                    </button>
                                ))
                            }
                        </>

                }
            </div>

        </nav>
    )
}

export default NavBar
