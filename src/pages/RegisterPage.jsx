import React, { useState } from 'react';
import actions from '../dispatch/actions';
import dispatch from '../dispatch/dispatch';
import Loading from '../components/Loading';
import FormMessage from '../components/FormMessage';
import formDispatch, { formStates } from '../dispatch/formStatus';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [disabled, setDisabled] = useState(false)
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password' || name === 'confirmPassword') {
            const password = document.getElementById('password').value
            const confirmPassword = document.getElementById('confirmPassword').value

            if (password.length < 8 || password.length > 20) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage('Password must be between 8 and 20 characters long.');
                return
            }

            if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage('Password must contain at least one uppercase letter and one numeric character.');
                console.log(password)
                return
            }

            if (password === confirmPassword) {
                setDisabled(false)
                setMessage('')
                formDispatch(formStates.default, setFormState, setPayload);
            } else {
                setDisabled(true)
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage("Password and confirm password values don't match!")
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        console.log(formData);

        const response = await dispatch(actions.register, {
            email: formData.email,
            password: formData.password
        });
        console.log(response);

        if (response?.message==="User created successfully") {
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Login successful!")
            navigate("/account");
        } else {
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Login failed!")
        }
    };


    return (
        <>
            <div className="flex h-screen">
                <div className=" hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <img src={'register.png'} className="w-full" />
                </div>

                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        {formState===formStates.loading ? (<Loading message={'Please wait while we process your request...'} />) : (<><h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up </h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join the Hub for Seamless Project Management and Version Control </h1>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"
                                        value={formData.email}
                                        onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                        value={formData.password}
                                        onChange={handleInputChange} required />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange} required
                                    />
                                </div>

                                {payload && (<FormMessage bg_class={payload.bg_color} message={message}/>)}

                                <div>
                                    <button type="submit" className={`w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disabled}>Sign Up</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Already have an account? <a href="/login" className="text-black hover:underline">Login here</a>
                                </p>
                            </div></>)}
                    </div>
                </div>
            </div>
        </>
    )
}
