import React, { useState } from 'react';
import formDispatch, { formStates } from '../../../dispatch/formStatus';
import dispatch from '../../../dispatch/dispatch';
import actions from '../../../dispatch/actions';
import FormMessage from '../../../components/FormMessage';

const AddProjectModal = ({ open, setShow, setProjects, projects }) => {
    const [project, setProject] = useState("");
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const handleCancel = () => {
        if (!disabled) {
            formDispatch(formStates.default, setFormState, setPayload)
            setProject("")
            setShow(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        console.log(project)
        setDisabled(true)

        if (project === "") {
            formDispatch(formStates.invalid, setFormState, setPayload);
            setMessage("Project name cannot be empty!")
            setDisabled(false);
            return;
        }

        const response = await dispatch(actions.addProject, {
            name: project
        });

        if (response.status === 400) {
            formDispatch(formStates.invalid, setFormState, setPayload);
            setMessage("Project already exists!")
            setDisabled(false);
            return;
        }
        console.log(response?.data?.project);
        setProjects([...projects, response.data.project])
        setDisabled(false);
        setShow(false);
        formDispatch(formStates.default, setFormState, setPayload);
    };
    return (
        <>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-violet-100/75 transition-opacity">
                    <div className="relative overflow-hidden rounded-md bg-white text-left shadow-xl transition-all md:max-w-6xl">
                        <div className='bg-purple-900 py-2 text-white'>
                            <h1 className="text-3xl font-semibold text-center">Add A Project</h1>
                        </div>

                        <form className="space-y-4 p-4 sm:p-10 " onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input type="text" id="name" name="name" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)} required />
                            </div>

                            {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                            <div className='flex items-center justify-between px-2'>
                                <div className={`md:w-1/2 text-red-500  transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 md:mb-0 md:mr-5 hover:cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleCancel}>Cancel</div>

                                <button type="submit" className={`md:w-1/2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${disabled ? "opacity-50" : ""}`} disabled={disabled}>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddProjectModal;
