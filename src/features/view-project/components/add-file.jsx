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
import { useNavigate, useParams } from 'react-router';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';

const AddFilePage = () => {
    const {id}=useParams();
    const currentDirectoryContext = useSelector((state) => state.file.currentDirectory);
    const [currentDirectory,setCurrentDirectory]=useState(currentDirectoryContext);
    const [error,setError]=useState("");    
    const navigate=useNavigate();
    const filteredLanguages = Object.keys(languages)
        .filter(lang => prismLanguages.includes(lang))
        .reduce((obj, key) => {
            obj[key] = languages[key];
            return obj;
        }, {});
    // console.log(filteredLanguages)
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [language, setLanguage] = useState(languages.plain);
    function stringToFile(stringData, fileName, fileType) {
        const blob = new Blob([stringData], { type: fileType });
        const file = new File([blob], fileName);
        return file;
      }

    const handleCodeChange = (newCode) => {
        console.log(newCode)
        const detectedLanguage = hljs.highlightAuto(newCode).language;
        setLanguage(filteredLanguages[detectedLanguage] || languages.plain); 
        console.log(language)
        setInput(newCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setDisabled(true);
        const file=stringToFile(input,"file.txt","text/plain");
        if(currentDirectory[0]!=="/"){
            setCurrentDirectory("/"+currentDirectory);
        }
        if(currentDirectory.length<=1){
            setError("File Name Must Be Present");
            return;
        }
        console.log(file);
        console.log(input);
        console.log(id);
        console.log(currentDirectory);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectID',id);
        formData.append('currentDirectory',currentDirectory);
        const response=await dispatch(actions.fileUpload,formData);
        if(response.status==="success"){
            navigate("/view-project/"+id);
        }
        else{
            setError("File Upload Unsuccessful");
        }
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
                            <input type="text" className="py-2 w-full text-black bg-white rounded-md mt-2 md:mt-0" value={currentDirectory} onChange={(e)=>setCurrentDirectory(e.target.value)}></input>
                        </div>
                        <div className='flex justify-end my-auto'>
                            <button className=" text-purple-700 bg-white/70 px-2 rounded-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-1" onClick={() => { }}><IonIcon className="text-xl font-bold" name="clipboard" /></button>
                            <button type="submit" className={`bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300  ${disabled ? "opacity-50" : ""}`} disabled={disabled || input===""}>Save Changes</button>
                        </div>
                    </div>
                    <div className="w-full text-center bg-red-200 text-red-900">{error}</div>
                    <div className="flex items-center justify-center bg-transparent bg-opacity-75 transition-opacity ">
                        <div className="relative bg-white text-left transition-all w-full">

                            <div className='p-4'>
                                <div className="flex flex-col">
                                    <label htmlFor="languages" className="block text-sm font-medium text-gray-700">If your language is not highlighted automatically, select one manually from below:</label>
                                    <select
                                        id="languages"
                                        className="border border-gray-300 rounded-md p-2 w-full mb-4 md:w-1/4"
                                        value={Object.keys(filteredLanguages).find(key => filteredLanguages[key] === language) || "Not Detected"}
                                        onChange={handleLanguageChange}
                                    >
                                        {Object.keys(filteredLanguages).map((lang, index) => (
                                            <option key={index} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='bg-violet-100 text-black min-h-[50vh] text-lg'>
                                    <Editor
                                        value={input}
                                        onValueChange={handleCodeChange} // Pass handleCodeChange directly
                                        highlight={(code) => highlight(code, language)}
                                        padding={10}
                                        style={{
                                            fontFamily: 'monospace',
                                        }}
                                        textareaClassName='min-h-[60vh] rounded-md border-0 focus:outline-none'
                                        preClassName='min-h-[60vh] rounded-md border-0 focus:outline-none'
                                    />

                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <Chat  projectID={id}/>
        </>
    );
};

export default AddFilePage;