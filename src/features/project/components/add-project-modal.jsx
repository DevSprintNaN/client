import React, { useState } from 'react';
import formDispatch, { formStates } from '../../../context/dispatch/formStatus';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';
import FormMessage from '../../../components/FormMessage';
import DisplayInputs from '../../profile/components/display-inputs';
import useFetchOptions from '../../profile/hooks/useFetchOptions';
import { WithContext as ReactTags } from 'react-tag-input';

const AddProjectModal = ({ open, setShow, setProjects, projects }) => {
    const [project, setProject] = useState("");
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [currSelected, setCurrSelected] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([])
    //const { options } = useFetchOptions();
    const [tags, setTags] = useState([]);

    const handleCancel = () => {
        if (!disabled) {
            formDispatch(formStates.default, setFormState, setPayload)
            setProject("")
            setShow(false)
        }
    }
    const handleRemoveSkill = (skill) => {
        setSelectedSkills((prevSkills) => prevSkills.filter((selectedSkill) => selectedSkill !== skill));
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        const selectedSkill = value;
        const isSelected = selectedSkills.includes(selectedSkill);
        const updatedSkills = !isSelected ? [...selectedSkills, selectedSkill] : skills;
        setSelectedSkills(updatedSkills);
        setCurrSelected(value)
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
        const tagText = tags.map(tag => tag.text);
        console.log(tagText);
        const response = await dispatch(actions.addProject, {
            name: project,
            content:tagText
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

    const handleDelete = (i) => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
    };

    const handleAddition = (tag) => {
        const newTags = [...tags, tag];
        setTags(newTags);
    };


    return (
        <>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-violet-100/75 transition-opacity z-20">
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
                            <div className="pb-6">
                                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                                <div className='flex'>
                                    {/* <select name="skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={currSelected} onChange={handleInputChange}>
                                        <option disabled selected>Select your skills</option>
                                        {options && options?.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    
                                        
                                    </select> */}
                                    <ReactTags
                                        tags={tags}
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        classNames={{
                                            tags: "flex flex-wrap gap-2 mt-2 max-w-full",
                                            tag: "inline-flex items-center px-2 py-1 rounded-full mx-1 bg-violet-500 text-white text-sm font-medium",
                                            tagInput:
                                                "block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-0 focus:border-green-600 peer",
                                            tagInputField: "w-full focus:outline-none",
                                        }}
                                        placeholder="Add skills"
                                        inputFieldPosition="top"
                                        
                                    />

                                </div>

                                <DisplayInputs className="pb-6" data={selectedSkills} message={' '} handleRemove={handleRemoveSkill} />


                            </div>

                            {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                            <div className='flex items-center justify-between px-2'>
                                <div className={`md:w-1/2 text-red-500  transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 md:mb-0 md:mr-5 hover:cursor-pointer text-center ${disabled ? "opacity-50 cursor-not-allowed " : ""}`} onClick={handleCancel}>Cancel</div>

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
