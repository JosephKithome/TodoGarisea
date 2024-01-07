'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NextIcon from '../public/log.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const isAuthenticated =true;

  // Fetch authentication providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();

        console.log("The providers", response)
        setProviders(response);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  // Toggle dropdown visibility
  const handleDropDownToggle = () => {
    setToggleDropDown((prev) => !prev);
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Logo and App Name */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={NextIcon}
          alt="TodoGarisea"
          width={50}
          height={50}
          className="object-container"
        />
        <p className="orange_gradient text-center">TodoGarisea</p>
      </Link>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
        // {isAuthenticated ? (
          // Authenticated user
          <div className="flex">
            <div onClick={handleDropDownToggle} className="cursor-pointer">
              <Image
                src={NextIcon}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </div>
            {toggleDropDown && (
              // Dropdown menu for authenticated user
              <div className="dropdown">
                <p onClick={() => setToggleDropDown(false)} className="dropdown_link">
                  <Link href="/profile">My Profile</Link>
                </p>
                <p onClick={() => setToggleDropDown(false)} className="dropdown_link">
                  <Link href="/create-todo">Create Todo</Link>
                </p>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Unauthenticated user
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">

        {/* {isAuthenticated ? ( */}
         {session?.user ? (
          // Authenticated user navigation links
          <div className="flex gap-3 md:gap-5">
            <button type="button" className="outline_btn" onClick={signOut}>
            Signed in as {session.user.email}
            </button>
            <Link href="/create-todo" className="black_btn">
              Add Todo
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src={NextIcon}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          // Unauthenticated user authentication buttons
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
