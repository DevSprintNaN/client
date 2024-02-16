import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dispatch from '../context/dispatch/dispatch';
import actions from '../context/dispatch/actions';

const UserNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut=async()=>{
        const response=await dispatch(actions.logout);
        console.log(response);
        if(response.status==="success"){
            localStorage.clear();
            window.location.reload();
        }
    }

    return (
        <>
            <nav className="container mx-auto p-3 lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-between">
                    <div>
                        <a className="text-2xl font-bold text-gray-800 hover:text-gray-700 lg:text-3xl" href="/home">ProjectHub</a>
                    </div>

                    <div className="flex lg:hidden">
                        <button onClick={toggleMenu} type="button" className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none" aria-label="toggle menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none  ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                    <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
                        <a className="text-gray-700 hover:text-blue-500  lg:mx-6" href="/projects">My Projects</a>
                        <a className="text-gray-700 hover:text-blue-500  lg:mx-6" href="/add-forum">Forum</a>
                        <a className="text-gray-700 hover:text-blue-500 lg:mx-6" href="/account">Profile</a>
                    </div>

                    <button className="mt-4 block h-10 transform rounded-md border px-4 py-2 text-center capitalize text-gray-700 hover:text-blue-500  transition-colors duration-300 hover:bg-gray-100  lg:mt-0 lg:w-auto" onClick={handleLogOut}> Log Out </button>
                </div>
            </nav>
        </>
    )
}

export default UserNavbar