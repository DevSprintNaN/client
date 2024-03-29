import Loading from "../../../components/Loading";
import { formStates } from "../../../context/dispatch/formStatus";
import FormMessage from "../../../components/FormMessage";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const { handleInputChange, handleSubmit, formData, disabled, formState, message, payload } = useLogin();
    return (
        <div className="flex h-screen">
            <div className="w-full bg-violet-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    {formState === formStates.loading ? (<Loading message={'Please wait while we process your request...'} />) : (<>
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In </h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Dive Back to the Hub of Effortless Project Collaboration and Version Control</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={formData.email}
                                    onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={formData.password}
                                    onChange={handleInputChange} />
                            </div>
                            <div className=" text-sm text-purple-800 text-left">
                                <p><a href="/forgot-password" className="hover:underline">Forgot Password?</a>
                                </p>
                            </div>

                            {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                            <div>
                                <button type="submit" className={`w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disabled}>Login</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Don't Have An Account? <a href="/register" className="text-black hover:underline">Register here</a>
                            </p>
                        </div>
                    </>)}
                </div>
            </div>

            <div className=" hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <img src={'login.png'} className="w-full" />
            </div>
        </div>
    )
}

export default LoginPage