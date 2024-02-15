import React, { useState } from 'react'
import UserNavbar from '../../../components/UserNavbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import formDispatch, { formStates } from '../../../context/dispatch/formStatus';
import FormMessage from '../../../components/FormMessage';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] },{ font: [] }],
        [{ size: [] }],
        [{ 'color': [] }, { 'background': [] }],
        ["bold", "italic", "underline", "strike", "blockquote","code-block"],
        [
            { list: "ordered" },
            { list: "bulleted" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image", "video"],
    ]
}

const AddForum = () => {
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("dfsfdsfdfs")
    const [payload, setPayload] = useState(null)
    const navigate= useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(value);
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        setDisabled(true)

        const success = 1;
        if (success) {
            setDisabled(false)
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Created Successfully!")
            navigate("/forum");
        } else {
            setDisabled(false)
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Registration failed!")
        }
    }
    return (
        <div className={`h-full p-2 bg-violet-100 w-full min-h-screen`} >
            <UserNavbar />

            <form onSubmit={handleSubmit}>
                <div className='w-full bg-violet-100 py-2'>
                    <div className='flex items-center justify-end'>
                        <button type="submit" className={`bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disabled}>Post</button>
                    </div>
                </div>

                {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className='h-[70vh]'/>
            </form>
        </div>
    )
}

export default AddForum