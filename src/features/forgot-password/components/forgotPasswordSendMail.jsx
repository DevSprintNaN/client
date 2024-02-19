import React, { useState } from 'react'
import ForgotPasswordEmailVerify from './ForgotPasswordEmailVerify';

const ForgotPasswordSendMail = () => {
    const [emailSent, isEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        isEmailSent(true)
    };
    if (!emailSent) {
        return (
            <>
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">Forgot Password</h1>
                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Enter your email associated with your account and receive an OTP.</h1>
                <form  className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="justify-content-center w-100">
                        <button
                            type="submit"
                            className={`w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Send Recovery Email
                        </button>
                    </div>
                </form>
            </>
        );
    } else {
        return <ForgotPasswordEmailVerify email={email} />;
    }
};


export default ForgotPasswordSendMail