import React from 'react'
import FormMessage from '../../../components/FormMessage';
import OtpInput from 'react18-input-otp';
import { useOTP } from '../hooks/useOTP';
import OTPValidityTimer from '../../forgot-password/components/OTPValidityTimer';

const OTPVerification = ({ email }) => {
    
        const {
            otp,
            otpDisabled,
            setOTP,
            isLocked,
            remainingTime,
            error,
            onResend,
          }=useOTP(180,email);

    return (
        <><div className="flex h-screen">
        <div className=" hidden lg:flex items-center justify-center flex-1 bg-white text-black">
            <img src={'/otp_sent.png'} className="w-full" />
        </div>
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Verify Your Email</h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">An OTP has been sent to your email. Please check your inbox.</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                {error && (<FormMessage bg_class={"bg-red-400"} message={error} />)}

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

                <div className='w-100 justify-content-center'>
                    <button type="submit" className={` bg-purple-700 text-white py-2 px-6 md:px-12 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${otpDisabled ? "opacity-50" : ""}`} disabled={otpDisabled}>
                        Verify
                    </button>
                </div>
            </form>
            </div>
            </div>

            </div>
        </>
    )
}

export default OTPVerification