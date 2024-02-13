import { useParams } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import { useViewProject } from '../hooks/useViewProject';
import Chat from '../../chat/components/chat';


const ViewProject = () => {
    const {id}=useParams();
    const {directories}=useViewProject(id);
    console.log(directories);
    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            <Chat/>
        </div>
    );
};

export default ViewProject;
