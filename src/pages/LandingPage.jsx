import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header class="bg-violet-100 h-full pb-10">
                <nav className="container mx-auto p-3 lg:flex lg:items-center lg:justify-between sticky top-0 z-10 bg-violet-100/80 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <a className="text-2xl font-bold text-gray-800 hover:text-gray-700 lg:text-3xl" href="/">ProjectHub</a>
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

                    <div className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
                        <button className="mt-4 block h-10 transform border text-center text-sm capitalize  w-full  bg-purple-700 text-white px-5 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 lg:mt-0 lg:w-auto" onClick={()=>navigate('/login')} >Login</button>
                        </div>

                        <div>
                            <button className="mt-4 block h-10 transform border text-center text-sm capitalize  w-full  bg-purple-700 text-white px-5 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 lg:mt-0 lg:w-auto" onClick={()=>navigate('/register')} >Register</button>
                        </div>
                    </div>
                </nav>

                <div class="container mx-auto px-6 py-10 text-center bg-white rounded-md">
                    <div class="mx-auto max-w-lg">
                        <h1 class="text-3xl font-bold text-gray-800  md:text-4xl">DevSprint 2024</h1>
                        <img src={'landing_page.png'} />

                        <p class="mt-6 text-gray-500">Dive Back to the Hub of Effortless Project Collaboration and Version Control</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default LandingPage