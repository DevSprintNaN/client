import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import actions from "../../../dispatch/actions";
import dispatch from "../../../dispatch/dispatch";
const AddProjectModal = ({ open, setShow,setProjects,projects }) => {
    const [project, setProject] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async() => {
        setDisabled(true);
        if(project===""){
            setError("Project name cannot be empty");
            setDisabled(false);
            return;
        }
        const response = await dispatch(actions.addProject, {
            name:project
        });
        if(response.status===400){
            setError("Project Already Exists");
            setDisabled(false);
            return;
        }
        console.log(response.data.project);
        setProjects([...projects,response.data.project])
        setDisabled(false);
        setShow(false);
    };

    return (
        <Dialog open={open} size="xl" handler={() => setShow(false)} className="ms-96 mt-24">
            <DialogHeader className="bg-purple-900 text-white rounded-lg">
                Add Project
            </DialogHeader>
            <DialogBody className="bg-gray-100">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="text-red-500">{error}</div>
                        <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input type="text" id="project" name="project" className="mt-1 p-2 w-4/5 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            value={project}
                            onChange={(e) => setProject(e.target.value)} />
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <button
                    onClick={()=>setShow(false)}
                    className="ms-2 me-4 bg-whitesmoke-100 text-red-500  px-2 py-2 rounded-md hover:bg-red-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"
                    disabled={disabled}
                >
                    <span>Cancel</span>
                </button>
                <button className="bg-green-700 text-white  px-2 py-2 rounded-md hover:bg-green-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300" onClick={handleSubmit} disabled={disabled}>
                    <span>Confirm</span>
                </button>
            </DialogFooter>
        </Dialog>
    );
};

export default AddProjectModal;
