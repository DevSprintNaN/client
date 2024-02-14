import { useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useFileUpload = (currentDirectory,_id,setShow,handleFile) => {
    const [files, setFiles] = useState({});
    const [fileUploads, setFileUploads] = useState([]);
    const [progress,setProgress]=useState(0);
    const [uploading,setUploading]=useState(false);
    const [error, setError] = useState("");
    const addFile = (file) => {
        if(file.size>=10485760){
            setError("File size should be less than 10MB");
            return;
        }
        let files = fileUploads;
        fileUploads.push(file);
        setFileUploads(files);
        const objectURL = URL.createObjectURL(file);
        setFiles(prevFiles => ({
            ...prevFiles,
            [objectURL]: file
        }));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setError("");
        for (const file of event.dataTransfer.files) {
            addFile(file);
        }
    };

    const handleFileInput = (event) => {
        event.preventDefault();
        for (const file of event.target.files) {
            addFile(file);
        }
    };

    const deleteFile = (target) => {
        const filesCopy = { ...files };
        delete filesCopy[target];
        setFiles(filesCopy);
    };

    const handleCancel = () => {
        setFiles({})
        setShow(false)
    };

    const handleUpload = async () => {
        if(fileUploads.length>5){
            setError("You can upload only 5 files at a time");
            return;
        }
        let size=0;
        fileUploads.forEach((file)=>{
            size+=file.size;
        });
        if(size>=52428800){
            setError("Total size of files should be less than 50MB");
            return;
        }
        setUploading(true);
        let count=0;
        fileUploads.forEach(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('projectID',_id);
            formData.append('currentDirectory',currentDirectory);
            await dispatch(actions.fileUpload,formData);
            setProgress((count/fileUploads.length)*100);
            handleFile(file.name);
            count++;
            if(count===fileUploads.length){
                setUploading(false);
                setProgress(0);
                setFiles({});
                setShow(false);
            }
        })
    };

    return {files,error,handleDrop,handleCancel,handleFileInput,handleUpload,deleteFile,uploading,progress};
}