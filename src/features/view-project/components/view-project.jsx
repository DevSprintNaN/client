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
import { FaStar, FaFolderPlus, FaFileUpload } from 'react-icons/fa';
import { IoReturnUpBack } from "react-icons/io5";
import { AiFillFileAdd } from "react-icons/ai";



const ViewProject = () => {
    const { id } = useParams();
    const { directories, handleDirectories, currentDirectory, reverse, handleFolder, handleFile, handleAddFile, handleViewFiles, changes } = useViewProject(id);
    const [showFileUpload, setShowFileUpload] = useState(false)
    const [showFolderUpload, setShowFolderUpload] = useState(false)
    const [starred, setStarred] = useState(false)

    const handleAddStar = () => {
        setStarred(!starred);
    }
    if (directories) {
        return (<>
            <div className="h-full p-2 bg-violet-100 min-h-screen w-full flex flex-col">
                <UserNavbar />
                {showFileUpload && (<FileUploadModal _id={id} setShow={setShowFileUpload} currentDirectory={currentDirectory} handleFile={handleFile} />)}
                {showFolderUpload && (<FolderUploadModal show={showFolderUpload} setShow={setShowFolderUpload} handleFolder={handleFolder} currentDirectory={currentDirectory} />)}
                <div className="w-full p-2 flex flex-wrap bg-violet-200 text-white">
                    <button className="text-purple-700 bg-white px-1 md:px-2 md:py-2 rounded-md hover:bg-purple-700 hover:text-white focus:outline-none  transition-colors duration-300 me-2" onClick={reverse}><IoReturnUpBack className="text-xl mx-1" /></button>

                    <button className="text-purple-700 bg-white px-2 py-2 rounded-md hover:bg-purple-700 hover:text-white focus:outline-none  transition-colors duration-300 me-2" onClick={() => setShowFileUpload(true)}><FaFileUpload className='text-xl mx-1' /></button>

                    <button className="text-purple-700 bg-white px-2 py-2 rounded-md hover:bg-purple-700 hover:text-white focus:outline-none  transition-colors duration-300 me-2" onClick={() => handleAddFile()}><AiFillFileAdd className='text-xl mx-1' /></button>

                    <button className="text-purple-700 bg-white px-2 py-2 rounded-md hover:bg-purple-700 hover:text-white focus:outline-none  transition-colors duration-300 me-2" onClick={() => setShowFolderUpload(true)}><FaFolderPlus className='text-xl mx-1' /></button>

                    <button className="text-purple-700 bg-white px-2 py-2 rounded-md hover:bg-purple-700 hover:text-white focus:outline-none  transition-colors duration-300 me-2" onClick={handleAddStar}><FaStar className={`mx-1 text-xl text-center ${starred ? 'text-yellow-400' : ' '}`} /></button>

                    <input type="text" className="md:w-7/12 w-full text-black bg-white rounded-md mt-1 md:my-0 md:ms-2" value={"\t" + currentDirectory} disabled={true}></input>
                </div>
                <Files directories={directories} handleDirectories={handleDirectories} handleViewFiles={handleViewFiles} changes={changes} />
                <Chat  projectID={id}/>
            </div>
            
        </>
        );
    }
    else {
        return (
            <Loading />
        )
    }
};

export default ViewProject;
