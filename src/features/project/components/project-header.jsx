import IonIcon from "@reacticons/ionicons";

const ProjectHeader = ({show,setShow}) => {
    return ( 
         <div className="w-full bg-violet-200">
            <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"  onClick={()=>setShow(!show)}><IonIcon name="add-circle-outline" className="me-2"/>Add Project</button>
        </div>
     );
}
 
export default ProjectHeader;