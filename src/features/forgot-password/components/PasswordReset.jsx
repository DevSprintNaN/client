import React from 'react'
import DOMPurify from "dompurify";
import { useResetPassword } from '../hooks/useResetPassword';
import FormMessage from '../../../components/FormMessage';

const PasswordReset = ({ email }) => {
    const { password, passwordChange, confirmPassword, confirmPasswordChange, passwordVisibility, confirmPasswordVisibility, setConfirmPasswordVisibility, setPasswordVisibility, handleSubmit, isDisabled, errorPassword, errorMessage, errorConfirmPassword, passwordVisible, setPasswordVisible } = useResetPassword(email);
    return (
        <>
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Reset Your Password </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Set a password that is strong to secure your account</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                {errorMessage && (<FormMessage bg_class={"bg-red-400"} message={errorMessage} />)}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    {/* {(passwordVisibility === "password" && (
                        <div
                            // icon={lockClosedOutline}
                            onClick={() => setPasswordVisibility("text")}
                        >sddf</div>
                    )) ||
                        (passwordVisibility === "text" && (
                            <div
                                // icon={lockOpenOutline}
                                onClick={() => setPasswordVisibility("password")}
                            >sdfsdf</div>
                        ))} */}
                    <input
                        className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        type={passwordVisible ? "text" : "password"}
                        onChange={(e) =>
                            passwordChange(DOMPurify.sanitize(e.target.value))
                        }
                        id="password"
                        name="password"
                        required
                        value={password}
                    />
                    {errorPassword && (<FormMessage bg_class={"bg-orange-400"} message={errorPassword} />)}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    {/* {(confirmPasswordVisibility === "password" && (
                        <div
                            // icon={lockClosedOutline}
                            onClick={() => setConfirmPasswordVisibility("text")}
                        >sfdsf</div>
                    )) ||
                        (confirmPasswordVisibility === "text" && (
                            <div
                                // icon={lockOpenOutline}
                                onClick={() => setConfirmPasswordVisibility("password")}
                            >sdfsdf</div>
                        ))} */}
                    <input
                        className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        type={passwordVisible ? "text" : "password"}
                        onChange={(e) =>
                            confirmPasswordChange(DOMPurify.sanitize(e.target.value))
                        }
                        required
                        value={confirmPassword}
                        id="confirmPassword"
                        name="confirmPassword"
                    />
                    {errorConfirmPassword && (<FormMessage bg_class={"bg-orange-400"} message={errorConfirmPassword} />)}
                </div>
                <div>
                    <input
                        className="mt-1 p-2 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        value={passwordVisible}
                        onChange={(e) => {
                            setPasswordVisible(e.target.checked);
                          }}
                        type="checkbox"
                    />
                    <span className='mx-2 text-sm font-medium text-gray-700'>Show Password</span>
                </div>

                <div className='w-100 justify-content-center'>
                    <button type="submit" className={` bg-purple-700 text-white py-2 px-6 md:px-12 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${isDisabled ? "opacity-50" : ""}`} disabled={isDisabled}>
                        Reset Password
                    </button>
                </div>
            </form>
        </>
    )
}

export default PasswordReset