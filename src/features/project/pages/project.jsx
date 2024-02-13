import { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import ProjectCards from '../components/project-cards';
import ProjectHeader from '../components/project-header';
import AddProjectModal from '../components/add-project-modal';
import { useProjectCard } from '../hooks/useProjectCard';


const Project = () => {
    const [show, setShow] = useState(false);
    const { navigate, projects, setProjects, error } = useProjectCard();
    return (
        <div className={`h-full p-2 bg-violet-100 w-full min-h-screen`} >
            <UserNavbar />
            <ProjectHeader show={show} setShow={setShow} />
            <AddProjectModal open={show} setShow={setShow} projects={projects} setProjects={setProjects} />
            <div className="shadow bg-white p-2 rounded-md">
                <ProjectCards navigate={navigate} projects={projects} />
            </div>
        </div>
    );
};

export default Project;
