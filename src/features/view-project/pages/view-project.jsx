import { useParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import Chat from '../../chat/components/chat';
import Files from '../components/files';
import { useViewProject } from '../hooks/useViewProject';
import IonIcon from "@reacticons/ionicons";
import { useState } from 'react';
import FileUploadModal from '../components/upload-files-modal';
import FolderUploadModal from '../components/upload-folder-modal';

const ViewProject = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    const { directories, handleDirectories, currentDirectory, reverse } = useViewProject(id);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [showFolderUpload, setShowFolderUpload] = useState(false);

    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            {showFileUpload && (<FileUploadModal show={showFileUpload} setShow={setShowFileUpload} />)}
            {showFolderUpload && (<FolderUploadModal show={showFolderUpload} setShow={setShowFolderUpload} />)}

            <div className="w-full p-2 bg-violet-200 text-white flex justify-start items-stretch flex-wrap">
                <div className="flex flex-wrap">
                    <button className="w-14 bg-purple-700 text-white px-2 py-3 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-5" onClick={() => reverse()}><IonIcon className="text-md" name="return-up-back-outline"/></button>

                    <button className="w-14 bg-purple-700 text-white px-2 py-3 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-5" onClick={() => navigate(`/view-project/${id}/add-file`)}><IonIcon className="text-lg" name="create-outline"/></button>


                    <button className="w-14 bg-purple-700 text-white px-2 py-3 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-5" onClick={() => setShowFileUpload(true)}><IonIcon className="text-md" name="document-outline" /><IonIcon className="text-md" name="add-outline" /></button>

                    
                    <button className="w-14 bg-purple-700 text-white px-2 py-3 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center transition-colors duration-300 me-5" onClick={() => setShowFolderUpload(true)}><IonIcon className="text-md" name="folder-outline" /><IonIcon className="text-md" name="add-outline" /></button>
                </div>
                <div className='flex-grow mx-4 my-0.5'>
                    <input type="text" className="h-full w-full text-black bg-white rounded-md ms-2 mt-2 md:mt-0" value={"\t" + currentDirectory} disabled={true}></input>
                </div>
            </div>
            <Files directories={directories} handleDirectories={handleDirectories} />
            <Chat />
        </div>
    );
};

export default ViewProject;
