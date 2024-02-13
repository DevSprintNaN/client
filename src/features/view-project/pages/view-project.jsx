import { useParams } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import { useViewProject } from '../hooks/useViewProject';
import Chat from '../../chat/components/chat';
import IonIcon from '@reacticons/ionicons';


const ViewProject = () => {
    const { id } = useParams();
    const { directories,setDirectories } = useViewProject(id);
    console.log(directories);
    const handleDirectories=(directory)=>{
        
    }
    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            <div className="block shadow bg-white p-2 rounded-md">
                {directories.map((directory, index) => (
                    <div key={index} class="mx-auto mt-2 mb-2 p-2 bg-white rounded-lg shadow border align-middle cursor-pointer" onClick={()=>handleDirectories(directory)}>
                    <p class="mb-2 mt-2 font-normal text-purple-900"><IonIcon name={`${directory.includes("/")?"folder-outline":"document-outline"}`} className='me-2'/>{directory.split("/")[0]}</p>
                </div>
                    ))}
            </div>
            <Chat />
        </div>
    );
};

export default ViewProject;
