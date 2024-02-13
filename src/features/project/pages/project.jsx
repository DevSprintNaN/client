import { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import ProjectCards from '../components/project-cards';
import ProjectHeader from '../components/project-header';


const Project = () => {
    const [show,setShow]=useState(false);
    return (
        <div className={`h-full p-2 bg-violet-100 min-h-screen ${show?"blur-sm":"blur-none"}`} >
            <UserNavbar />
            <ProjectHeader show={show} setShow={setShow}/>
            <div className="shadow bg-white p-2 rounded-md">
                <ProjectCards />
            </div>
        </div>
    );
};

export default Project;
