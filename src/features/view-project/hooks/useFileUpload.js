import { useState } from "react";
import dispatch from "../../../dispatch/dispatch";
import actions from "../../../dispatch/actions";

export const useFileUpload = (currentDirectory,_id,setShow) => {
    const [files, setFiles] = useState({});
    const [fileUploads, setFileUploads] = useState([]);
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
        await fileUploads.forEach(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('projectID',_id);
            formData.append('currentDirectory',currentDirectory);
            const res=await dispatch(actions.fileUpload,formData);
            console.log(res);
        })
        setShow(false);
    };

    return {files,error,handleDrop,handleCancel,handleFileInput,handleUpload,deleteFile}
}