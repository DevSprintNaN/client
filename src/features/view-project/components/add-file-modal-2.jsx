import React, { useState } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import "../../../utils/prismImports"
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';
import { prismLanguages } from '../../../utils/prismLanguages';

const FileAddModal = ({ show, setShow }) => {
    const filteredLanguages = Object.keys(languages)
        .filter(lang => prismLanguages.includes(lang))
        .reduce((obj, key) => {
            obj[key] = languages[key];  
            return obj;
        }, {});
        console.log(filteredLanguages)
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [language, setLanguage] = useState(languages.javascript);

    const handleCancel = () => {
        if (!disabled) {
            setInput("");
            setShow(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);


        setDisabled(false);
        setShow(false);
    };

    const handleLanguageChange = (e) => {
        setLanguage(filteredLanguages[e.target.value]);
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity">
                    <div className="relative overflow-hidden rounded-md bg-white text-left shadow-xl transition-all md:w-[80vw] sm:w-[95vw] w-full">
                        <div className='bg-purple-900 py-2 text-white'>
                            <h1 className="text-3xl font-semibold text-center">Add A New File</h1>
                        </div>
                        <form className='p-4' onSubmit={handleSubmit}>
                            <div className="flex flex-col md:w-1/2">
                                <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Select A Language</label>
                                <select
                                    id="languages"
                                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                    value={Object.keys(filteredLanguages).find(key => filteredLanguages[key] === language)} // Find the key of the current language
                                    onChange={handleLanguageChange}
                                >
                                    {Object.keys(filteredLanguages).map((lang, index) => (
                                        <option key={index} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Editor
                                value={input}
                                onValueChange={setInput}
                                highlight={(code) => highlight(code, language)}
                                padding={10}
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: 12,
                                }}
                            />

                            <div className='flex items-center justify-between px-2 mt-4'>
                                <div className={`w-1/2 text-red-500  transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 mb-0 mr-5 text-center hover:cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleCancel}>Cancel</div>

                                <button type="submit" className={`w-1/2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${disabled ? "opacity-50" : ""}`} disabled={disabled}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FileAddModal;
