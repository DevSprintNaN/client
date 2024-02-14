import { useParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import Chat from '../../chat/components/chat';
import IonIcon from "@reacticons/ionicons";
import { useSelector } from 'react-redux';
import PDFViewer from './cloudinary-viewer';
import ImageViewer from './image-viewer';
import CodeViewer from './code-viewer';
import VideoViewer from './video-viewer';


const Viewer = () => {
    const { id,type } = useParams();
    const currentDirectory = useSelector((state) => state.file.currentDirectory);
    const currentURL = useSelector((state) => state.file.currentFileURL);
    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg","webp", "avif","tiff", "ico"];
    const videoTypes = ["mp4", "webm", "mov", "avi", "wmv", "mkv", "flv", "mpeg", "mpg", "m4v", "3gp", "3g2", "mxf", "roq", "nsv", "f4v", "f4p", "f4a", "f4b", "f4r", "f4x", "f4m", "f4"];
    const navigate = useNavigate();
    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            <div className="w-full p-2 flex bg-violet-200 text-white">
                <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2" onClick={() => navigate(`/view-project/${id}`)}><IonIcon name="return-up-back-outline" className="me-2" /></button>
                <input type="text" className="w-9/12 text-black bg-white rounded-md ms-2" value={"\t" + currentDirectory} disabled={true}></input>
            </div>
            {!imageTypes.includes(type) && !videoTypes.includes(type) && type==="pdf" && (<PDFViewer src={currentURL}/>)}
            {imageTypes.includes(type)  && type!=="null" && (<ImageViewer src={currentURL}/>)}
            {videoTypes.includes(type) && type!=="null" && (<VideoViewer src={currentURL}/>)}
            {type==="null" && (<CodeViewer src={currentURL}/>)}
            <Chat />
        </div>
    );
};

export default Viewer;