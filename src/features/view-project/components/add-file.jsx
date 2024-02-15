import React, { useState } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import "../../../utils/prismImports"
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';
import UserNavbar from '../../../components/UserNavbar';
import prismLanguages from '../../../utils/prismLanguages';
import IonIcon from '@reacticons/ionicons';
import { useSelector } from 'react-redux';
import Chat from '../../chat/components/chat';
import hljs from 'highlight.js';

const AddFilePage = () => {
    const currentDirectory = useSelector((state) => state.file.currentDirectory);
    const filteredLanguages = Object.keys(languages)
        .filter(lang => prismLanguages.includes(lang))
        .reduce((obj, key) => {
            obj[key] = languages[key];
            return obj;
        }, {});
    // console.log(filteredLanguages)
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [language, setLanguage] = useState(languages.javascript);


    const handleCodeChange = (newCode) => {
        console.log(newCode)
        const detectedLanguage = hljs.highlightAuto(newCode).language;
        setLanguage(filteredLanguages[detectedLanguage] || languages.plain); // Set to plain if language is not supported
        console.log(detectedLanguage)
        setInput(newCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);


        setDisabled(false);
    };

    const handleLanguageChange = (e) => {
        setLanguage(filteredLanguages[e.target.value]);
    };

    return (
        <>
            <div className="h-full bg-violet-100 min-h-screen">
                <UserNavbar />
                <form onSubmit={handleSubmit}>
                    <div className="w-full p-2 bg-violet-200 text-white flex justify-start items-stretch flex-wrap">
                        <div className='flex-grow mx-4 my-auto'>
                            <input type="text" className="py-2 w-full text-black bg-white rounded-md mt-2 md:mt-0" value={"\t" + currentDirectory} disabled={true}></input>
                        </div>
                        <div className='flex justify-end my-auto'>
                            <button className=" bg-purple-700 text-white px-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-1" onClick={() => { }}><IonIcon className="text-xl font-bold" name="clipboard-outline" /></button>
                            <button type="submit" className={`bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300  ${disabled ? "opacity-50" : ""}`} disabled={disabled}>Save Changes</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-black bg-opacity-75 transition-opacity">
                        <div className="relative bg-white text-left shadow-xl transition-all w-full h-full">

                            <div className='p-4'>
                                <div className="flex flex-col md:w-1/4">
                                    <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Select A Language</label>
                                    <select
                                        id="languages"
                                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                        value={Object.keys(filteredLanguages).find(key => filteredLanguages[key] === language)}
                                        onChange={handleLanguageChange}
                                    >
                                        {Object.keys(filteredLanguages).map((lang, index) => (
                                            <option key={index} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='bg-gray-100 text-black min-h-[50vh] text-lg'>
                                    <Editor
                                        value={input}
                                        onValueChange={handleCodeChange} // Pass handleCodeChange directly
                                        highlight={(code) => highlight(code, language)}
                                        padding={10}
                                        style={{
                                            fontFamily: 'monospace',
                                        }}
                                        textareaClassName='min-h-[50vh] rounded-md border-0 focus:outline-none'
                                        preClassName='min-h-[50vh] rounded-md border-0 focus:outline-none'
                                    />

                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <Chat />
        </>
    );
};

export default AddFilePage;