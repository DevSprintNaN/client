import UserNavbar from '../../../components/UserNavbar';
import ProjectCards from '../components/project-cards';


const Project = () => {

    return (
        <div className="h-full p-2 bg-violet-100 min-h-screen">
            <UserNavbar />
            <div className="shadow bg-white p-2 rounded-md">
                <ProjectCards />
            </div>
        </div>
    );
};

export default Project;
