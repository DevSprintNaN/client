import React, { useState } from 'react'
import formDispatch, { formStates } from '../../../dispatch/formStatus'
import dispatch from '../../../dispatch/dispatch';
import actions from '../../../dispatch/actions';
import FormMessage from '../../../components/FormMessage';
import SyntaxHighlighter from "react-syntax-highlighter";

import * as themes from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as languages from "react-syntax-highlighter/dist/esm/languages/hljs";

const FileAddModal = ({ show, setShow }) => {
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [content, setContent] = useState("")
    

    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("atomOneDark");

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const handleCancel = () => {
        if (!disabled) {
            formDispatch(formStates.default, setFormState, setPayload)
            setContent("")
            setShow(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        console.log(content)
        setDisabled(true)

        if (content === "") {
            formDispatch(formStates.invalid, setFormState, setPayload);
            setMessage("Content cannot be empty!")
            setDisabled(false);
            return;
        }

        // const response = await dispatch(actions.addProject, {
        //   name: content
        // });

        // if (response.status === 400) {
        //   formDispatch(formStates.invalid, setFormState, setPayload);
        //   setMessage("Content already exists!")
        //   setDisabled(false);
        //   return;
        // }
        // console.log(response?.data?.project);
        // setProjects([...projects, response.data.project])
        setDisabled(false);
        setShow(false);
        formDispatch(formStates.default, setFormState, setPayload);
    };
    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-violet-100/75 transition-opacity">
                    <div className="relative overflow-hidden rounded-md bg-white text-left shadow-xl transition-all md:w-[80vw] sm:w-[95vw] w-full">
                        <div className='bg-purple-900 py-2 text-white'>
                            <h1 className="text-3xl font-semibold text-center">Add A New File</h1>
                        </div>
                        <form className='p-4'>
                            <div className="flex flex-col md:w-1/2">
                                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Select A Theme</label>
                                <select
                                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                    onChange={handleThemeChange}
                                >
                                    {Object.keys(themes).map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Select A Language</label>
                                <select
                                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                    onChange={handleLanguageChange}
                                >
                                    {Object.keys(languages).map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:w-3/4">
                                <textarea
                                    className="border border-gray-300 rounded-md p-2 resize-none w-full h-48 md:h-auto"
                                    placeholder={"Type your code here..."}
                                    onChange={(e) => setInput(e.target.value)}
                                ></textarea>

                                <SyntaxHighlighter language={language} style={themes[theme]}>
                                    {input}
                                </SyntaxHighlighter>
                            </div>

                            <div className='flex items-center justify-between px-2 mt-4'>
                                <div className={`md:w-1/2 text-red-500  transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 md:mb-0 md:mr-5 text-center hover:cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleCancel}>Cancel</div>

                                <button type="submit" className={`md:w-1/2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${disabled ? "opacity-50" : ""}`} disabled={disabled}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default FileAddModal