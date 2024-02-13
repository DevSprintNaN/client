import { useParams } from 'react-router-dom';
import UserNavbar from '../../../components/UserNavbar';
import { useViewProject } from '../hooks/useViewProject';


const ViewProject = () => {
    const {id}=useParams();
    const {directories}=useViewProject(id);
    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
        </div>
    );
};

export default ViewProject;
