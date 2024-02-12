import React, { useState } from 'react';
import actions from '../dispatch/actions';
import dispatch from '../dispatch/dispatch';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        const response = await dispatch(actions.register, {
            email:formData.email,
            password:formData.password
        });
        console.log(response);
      };
    

    return (
        <>
            <div className="flex h-screen">
                <div className=" hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <img src={'register.png'} className="w-full" />
                </div>

                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up </h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join the Hub for Seamless Project Management and Version Control </h1>
                        
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"
                                    value={formData.email}
                                    onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                    value={formData.password}
                                    onChange={handleInputChange} />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full  bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300">Sign Up</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Already have an account? <a href="/login" className="text-black hover:underline">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
