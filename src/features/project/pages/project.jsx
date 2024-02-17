import { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import ProjectCards from '../components/project-cards';
import ProjectHeader from '../components/project-header';
import AddProjectModal from '../components/add-project-modal';
import { useProjectCard } from '../hooks/useProjectCard';
import Pagination from '../../../components/Pagination';
import usePagination from '../../../hooks/usePagination';
import Message from '../components/message';


const Project = () => {
    const [show, setShow] = useState(false);
    const { navigate, projects, setProjects, error } = useProjectCard();
    const { currentPage, setCurrentPage, totalPages, getCurrentItems, handlePageChange } = usePagination(8, projects);


    return (
        <div className={`h-full p-2 bg-violet-100 w-full min-h-screen`} >
            <UserNavbar />
            <ProjectHeader show={show} setShow={setShow} />
            <AddProjectModal open={show} setShow={setShow} projects={projects} setProjects={setProjects} />
            <div className="shadow bg-white p-2 rounded-md h-full">
                <ProjectCards navigate={navigate} projects={getCurrentItems()} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                {!(getCurrentItems() && getCurrentItems().length > 0) && (<div className='p-2'><Message message={"No projects found"} /></div>)}

            </div>
        </div>
    );
};

export default Project;
