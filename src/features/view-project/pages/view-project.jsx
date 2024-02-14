import { useParams } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import Chat from '../../chat/components/chat';
import Files from '../components/files';
import { useViewProject } from '../hooks/useViewProject';
import IonIcon from "@reacticons/ionicons";
import { useState } from 'react';
import FileUploadModal from '../components/add-files-modal';
import FolderUploadModal from '../components/add-folder-modal';


const ViewProject = () => {
    const { id } = useParams();
    const { directories, handleDirectories, currentDirectory, reverse } = useViewProject(id);
    const [showFileUpload, setShowFileUpload]=useState(false)
    const [showFolderUpload, setShowFolderUpload]=useState(false)
    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            {showFileUpload && (<FileUploadModal show={showFileUpload} setShow={setShowFileUpload} />)}
            {showFolderUpload && (<FolderUploadModal show={showFolderUpload} setShow={setShowFolderUpload} />)}
            <div className="w-full p-2 flex bg-violet-200 text-white">
                <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-5" onClick={() => reverse()}><IonIcon name="return-up-back-outline" className="me-2" />Go Back</button>
                <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-5" onClick={() => setShowFileUpload(true)}><IonIcon name="document-outline" /><IonIcon name="add-outline" className="me-2" />New File</button>
                <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-5" onClick={() => setShowFolderUpload(true)}><IonIcon name="folder-outline" /><IonIcon name="add-outline" className="me-2" />New Folder</button>
                <input type="text" className="w-7/12 text-black bg-white rounded-md ms-2" value={"\t" + currentDirectory} disabled={true}></input>
            </div>
            <Files directories={directories} handleDirectories={handleDirectories}/>
            <Chat />
        </div>
    );
};

export default ViewProject;
