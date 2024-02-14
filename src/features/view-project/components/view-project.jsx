import { useParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import Chat from '../../chat/components/chat';
import Files from './files';
import { useViewProject } from '../hooks/useViewProject';
import IonIcon from "@reacticons/ionicons";
import { useState } from 'react';
import FileUploadModal from './upload-files-modal';
import FolderUploadModal from './upload-folder-modal';
import Loading from '../../../components/Loading';


const ViewProject = () => {
    const { id } = useParams();
    const { directories, handleDirectories, currentDirectory, reverse,handleFolder,handleFile,handleAddFile } = useViewProject(id);
    const [showFileUpload, setShowFileUpload]=useState(false)
    const [showFolderUpload, setShowFolderUpload]=useState(false)
    if(directories){
        return (
            <div className="h-full p-2 bg-violet-100 min-h-screen">
                <UserNavbar />
                {showFileUpload && (<FileUploadModal _id={id} setShow={setShowFileUpload} currentDirectory={currentDirectory} handleFile={handleFile} />)}
                {showFolderUpload && (<FolderUploadModal show={showFolderUpload} setShow={setShowFolderUpload} handleFolder={handleFolder} currentDirectory={currentDirectory} />)}
                <div className="w-full p-2 flex bg-violet-200 text-white">
                    <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2" onClick={reverse}><IonIcon name="return-up-back-outline" className="me-2" /></button>
                    <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2" onClick={() => setShowFileUpload(true)}><IonIcon name="document-outline" /><IonIcon name="cloud-upload-outline" className="me-2" /></button>
                    <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2" onClick={()=>handleAddFile()}><IonIcon name="document-outline" /><IonIcon name="add-outline" className="me-2" /></button>
                    <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2" onClick={() => setShowFolderUpload(true)}><IonIcon name="folder-outline" /><IonIcon name="cloud-upload-outline" className="me-2" /></button>
                    <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-5" onClick={() => setShowFolderUpload(true)}><IonIcon name="folder-outline" /><IonIcon name="add-outline" className="me-2" /></button>
                    <input type="text" className="w-7/12 text-black bg-white rounded-md ms-2" value={"\t" + currentDirectory} disabled={true}></input>
                </div>
                <Files directories={directories} handleDirectories={handleDirectories}/>
                <Chat />
            </div>
        );
    }
    else{
        return(
            <Loading/>
        )
    }
};

export default ViewProject;
