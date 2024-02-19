import React from 'react'
import OtpInput from "react18-input-otp";
import { useForgotOTP } from "../hooks/useForgotOTP";
import OTPValidityTimer from './OTPValidityTimer';
import PasswordReset from './PasswordReset';
import FormMessage from '../../../components/FormMessage';


const ForgotPasswordEmailVerify = ({ email }) => {
    const {
        otp,
        setOTP,
        isDisabled,
        isLocked,
        remainingTime,
        error,
        handleSubmit,
        onResend,
        enterotp
    } = useForgotOTP(180, email);
    if (enterotp) {
        return (
            <>
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                    Verify OTP
                </h1>
                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">An OTP has been sent to your entered email address. Please enter the
                    OTP below to verify your email address.</h1>
                {error && (<FormMessage bg_class={'bg-red-500'} message={error} />)}
                <div className="otpElements">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                    <div className="otp">
                        <OtpInput
                            onChange={setOTP}
                            value={otp}
                            numInputs={6}
                            className="mt-1 bg-white p-2 mr-1 rounded-md focus:outline-none transition-colors duration-300"
                        />
                    </div>
                    <span className={`block text-sm font-medium mt-3`}> OTP is valid for: <OTPValidityTimer remainingTime={remainingTime} /></span>
                </div>

                <div className="flex justify-center space-x-2 pb-8 pt-4">
                    <button
                        className={`text-purple-500 text-center transition-colors duration-300 bg-gray-200 hover:bg-purple-500 hover:text-white py-2 px-6 md:px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 md:mb-0 md:mr-2  font-medium ${isDisabled ? "opacity-50 cursor-not-allowed " : "hover:cursor-pointer"}`}
                        disabled={isDisabled}
                        onClick={onResend}
                    >
                        Resend
                    </button>
                    <button
                        className={` bg-purple-700 text-white py-2 px-6 md:px-12 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${isLocked ? "opacity-50" : ""}`}
                        disabled={isLocked}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </>
        );
    } else {
        return <PasswordReset email={email}></PasswordReset>;
    }
};

export default ForgotPasswordEmailVerify