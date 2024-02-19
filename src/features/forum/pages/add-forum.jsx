import React, { useRef, useState } from 'react'
import UserNavbar from '../../../components/UserNavbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import formDispatch, { formStates } from '../../../context/dispatch/formStatus';
import FormMessage from '../../../components/FormMessage';
import { useNavigate } from 'react-router-dom';
import { useQuill } from '../hooks/useQuill';
import UploadAttachments from '../components/upload-attachments';
import { useFileUpload } from '../../view-project/hooks/useFileUpload';
import ForumAttachment from '../components/forum-attachments';
import { useViewAttachments } from '../hooks/useViewAttachments';
import Message from '../../project/components/message';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';



const AddForum = () => {
    const [disabled, setDisabled] = useState(false)
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const [forumID,setForumID]=useState();
    const [formData, setFormData] = useState({
        title: '',
        coverImg: null,
    })
    const { content:contentValue, setContent, description, setDescription, checkQuillCharacterCount, getStringFromHtml, contentModules, modulesDescription, quillRef,handleQuillLengthCheck } = useQuill()
    const {files,handleDrop,handleFileInput,deleteFile,setError,error}=useFileUpload(null,null, setShow, null)
    const {closeModal, handleAddedAttachmentView, url, type, show :showViewer } = useViewAttachments()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name==='coverImg'){
            const {files} = e.target
            setFormData({...formData, [name]: files[0]})
        }
        else 
            setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!description || description==='' ){
            formDispatch(formStates.invalid, setFormState, setPayload)
            setMessage("Description cannot be empty");
            return;
        }
        if( !contentValue || contentValue===''){
            setMessage("Content cannot be empty!")
            return
        }

        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        setDisabled(true)
        const forumData=new FormData();
        forumData.append('title',formData.title);
        forumData.append('coverImage',formData.coverImg);
        forumData.append('description',description);
        forumData.append('content',contentValue);
        const response=await dispatch(actions.addToForum,forumData).then((res)=>{
            if(res.status==="success"){
                setForumID(res._id);
                let result=true;
                Object.values(files).forEach(async(file)=>{
                    const fileData=new FormData();
                    fileData.append('id',res._id);
                    fileData.append('file',file);
                    const resp=await dispatch(actions.addFileToForum,fileData);
                    if(resp.status==="error"){
                        result=false;
                    }
                });
                return result;
            }
        })
        if (response) {
            setDisabled(false)
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Created Successfully!");
            navigate('/view-forums');
        } else {
            setDisabled(false)
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Forum posting failed!")
        }
    }
    return (
        <>
            {show && (<UploadAttachments setShow={setShow} files={files} handleDrop={handleDrop} handleFileInput={handleFileInput} deleteFile={deleteFile} setError={setError} error={error}/>)}
            <div className={`h-full bg-violet-100 w-full min-h-screen`} >
                <UserNavbar />

                <form onSubmit={handleSubmit} className='min-h-screen bg-white px-4 pb-24 space-y-4'>
                    <div className='w-full bg-white py-2'>
                        <div className='flex items-center justify-end'>
                            <button type="submit" className={`bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disabled}>Submit</button>
                        </div>
                    </div>

                    {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-purple-900">Title</label>
                        <input type="text" id="title" name="title" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none  transition-colors duration-300"
                            value={formData.title}
                            onChange={handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="coverImg" className="block text-sm font-medium text-purple-900">Cover Image</label>
                        <input type="file" accept="image/*" id="coverImg" name="coverImg" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none  transition-colors duration-300"
                            onChange={handleInputChange} required />
                    </div>

                    <div>
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-purple-900">Short Description</label>
                        <ReactQuill theme="snow" name="shortDescription" value={description} onChange={(content, delta, source, editor) => {setDescription(editor.getHTML())}} modules={modulesDescription} />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-purple-900">Content</label>
                        <ReactQuill theme="snow" name="content" value={contentValue} onChange={(content, delta, source, editor) => setContent(editor.getHTML())} modules={contentModules} />
                    </div>

                    <div>
                        <label htmlFor="attachments" className="block text-sm font-medium text-purple-900">Attachments</label>
                        <ForumAttachment files={files? Object.entries(files) : []} readonly={false} message={'No attachments'} handleRemove={deleteFile} closeModal={closeModal} handleAttachmentView={handleAddedAttachmentView} url={url} type={type} show={showViewer}/>
                        <div className='flex flex-start'>
                            <div className={`mt-2 block bg-violet-100 cursor-pointzer h-10 transform rounded-md border px-4 py-2 text-center capitalize text-purple-800 hover:text-white  transition-colors duration-300 hover:bg-purple-600  lg:mt-0 lg:w-auto`} onClick={() => setShow(true)} disabled={false} >Add Attachments</div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddForum