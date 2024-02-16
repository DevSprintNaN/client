import React, { useEffect, useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import Loading from "../../../components/Loading";
import formDispatch, { formStates } from '../../../context/dispatch/formStatus';
import FormMessage from '../../../components/FormMessage';
import { IoClose } from "react-icons/io5";


const AccountPage = () => {
    const [editMode, setEditMode] = useState(false);
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("");
    const [payload, setPayload] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [options, setOptions] = useState([]);
    const [currSelected, setCurrSelected] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        skills: [],
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const optionsData = await [{ label: "skill 1" }, { label: "skill 2" }, { label: "skill 3" }, { label: "skill 4" }, { label: "skill 5" }];
                setOptions(optionsData);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        fetchOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'skills') {
            const selectedSkill = e.target.value;
            const isSelected = formData.skills.includes(selectedSkill);

            let updatedSkills;
            if (!isSelected) {
                updatedSkills = [...formData.skills, selectedSkill];
            } else {
                updatedSkills = formData.skills;
            }
            setFormData({ ...formData, skills: updatedSkills });
            setCurrSelected(selectedSkill)
        } else {
            setFormData({ ...formData, [name]: value });
        }

        if (name === 'newPassword' || name === 'confirmNewPassword') {
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;

            if (password.length < 8 || password.length > 20) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage('Password must be between 8 and 20 characters long.');
                setDisabled(true)
                return;
            }

            if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage('Password must contain at least one uppercase letter and one numeric character.');
                setDisabled(true)
                return;
            }

            if (password === confirmPassword) {
                setDisabled(false);
                setMessage('');
                formDispatch(formStates.default, setFormState, setPayload);
            } else {
                setDisabled(true);
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage("Password and confirm password values don't match!");
            }
        }
        console.log(formData)
    };

    const handleRemoveSkill = (skill) => {
        setFormData({ ...formData, skills: formData.skills.filter((selectedSkill) => selectedSkill !== skill) });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("");
        console.log(formData);
        setDisabled(true)

        const response = 1;
        if (response) {
            setDisabled(false)
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Changes saved successfully!");
        } else {
            setDisabled(false)
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Could not make changes!");
        }
    };

    return (
        <>
            <div className="h-full p-2 bg-violet-100 min-h-screen">
                <UserNavbar />
                <div className="block md:flex shadow bg-white p-2 rounded-md">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white rounded-md">
                        <div className="flex justify-between">
                            <span className="text-xl text-center font-semibold block">Account</span>
                        </div>
                        <img src={'account.png'} className='p-2' />
                    </div>

                    <div className="w-full md:w-3/5 p-8 rounded-md bg-white lg:ml-4 shadow-md">
                        {formState === formStates.loading ? (
                            <Loading message={'Please wait while we process your request...'} />
                        ) : !editMode && (
                            <div>
                                <button type="button" className="float-right bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300" onClick={() => setEditMode(true)}>Edit</button>
                            </div>
                        )}
                        <div className="rounded p-10 h-full my-auto">
                            <div className="pb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300" value={formData.email} disabled />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="pb-6">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300" value={formData.username} disabled={!editMode} onChange={handleInputChange} />
                                </div>
                                <div className="pb-6">
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                                        {editMode && (<select name="skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={currSelected} onChange={handleInputChange}>
                                            <option disabled selected>Select your skills</option>
                                            {options?.map((option, index) => (
                                                <option key={index} value={option.label}>{option.label}</option>
                                            ))}
                                        </select>)}

                                                <div className='flex justify-start items-start pt-1'>
                                        {formData.skills.length>0? formData.skills.map((skill, index) => (
                                            <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 mb-2 mr-2">
                                                <span className="text-sm mr-1">{skill}</span>
                                                <IoClose className="text-gray-600 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                                            </div>
                                        )) : (<> <label className="block text-sm font-medium text-gray-700">No skills added yet</label></>)}
                                        </div>
                                    </div>

                                {editMode && (<>

                                    

                                    <div className="pb-4">
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700"> Current Password</label>
                                        <input type="password" id="currentPassword" name="currentPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300" value={formData.currentPassword} onChange={handleInputChange} />
                                    </div>

                                    <div className="pb-4">
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700"> New Password</label>
                                        <input type="password" id="newPassword" name="newPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300" value={formData.newPassword} onChange={handleInputChange} />
                                    </div>

                                    <div className="pb-4">
                                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <input type="password" id="confirmNewPassword" name="confirmNewPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300" value={formData.confirmNewPassword} onChange={handleInputChange} />
                                    </div>

                                    {payload && (<FormMessage bg_class={payload.bg_color} message={message} />)}

                                    <div>
                                        <button type="submit" className={`w-full bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disabled}>Save Changes</button>
                                    </div>
                                </>)}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountPage;
