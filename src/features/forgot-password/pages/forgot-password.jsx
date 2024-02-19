import React from 'react'
import ForgotPasswordSendMail from '../components/forgotPasswordSendMail'

const ForgotPasswordPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className=" hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <img src={'forgot_password.png'} className="w-full" />
                </div>
                <div className="w-full bg-violet-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">

                        <ForgotPasswordSendMail />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordPage