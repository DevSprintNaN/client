import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const AddProjectModal = ({ open, setShow }) => {
    const [project, setProject] = useState("");

    const handleSubmit = () => {
        setShow(false);
    };

    return (
        <Dialog open={open} size="md" handler={() => setShow(false)} className="rounded-bl-3xl mx-auto mt-5 w-1/2">
            <DialogHeader className="bg-purple-900 text-white border-b">
                Add Project
            </DialogHeader>
            <DialogBody className="bg-gray-100">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input type="text" id="project" name="project" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            value={project}
                            onChange={(e) => setProject(e.target.value)} />
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <button
                    onClick={()=>setShow(false)}
                    className="ms-2 me-4 bg-whitesmoke-100 text-red-500  px-2 py-2 rounded-md hover:bg-red-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"
                >
                    <span>Cancel</span>
                </button>
                <button className="bg-green-700 text-white  px-2 py-2 rounded-md hover:bg-green-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300" onClick={handleSubmit}>
                    <span>Confirm</span>
                </button>
            </DialogFooter>
        </Dialog>
    );
};

export default AddProjectModal;
