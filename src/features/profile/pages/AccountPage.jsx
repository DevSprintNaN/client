import UserNavbar from '../../../components/UserNavbar';
import Loading from "../../../components/Loading";
import { formStates } from '../../../context/dispatch/formStatus';
import FormMessage from '../../../components/FormMessage';
import { IoMdAdd } from "react-icons/io";
import useForm from '../hooks/useForm';
import NewSkillInput from '../components/new-skill-input';
import DisplayInputs from '../components/display-inputs';
import CodeContributions from '../components/code-contributions';
import ProjectCards from '../../project/components/project-cards';
import { useAccountPage } from '../hooks/useAccountPage';
import Pagination from '../../../components/Pagination';
import usePagination from '../../../hooks/usePagination';
import ShowBadges from '../components/show-badges';
const AccountPage = () => {
    const {editMode, setEditMode, formState, setFormState, message, setMessage, payload, setPayload, disabled, setDisabled, showSkillSet, setShowSkillSet, options,projects,navigate}=useAccountPage();
    const { formData, handleInputChange, handleRemoveSkill, currSelected, newSkillInput, addNewSkill, handleRemoveNewSkill, skillMessage,handleSubmit } = useForm(options,setDisabled,setPayload,setFormState,setMessage,setEditMode); 
    const {currentPage,totalPages,handlePageChange} =usePagination(8, projects);

    if(formData){
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
                                        {!editMode && (<DisplayInputs className="pb-6" data={formData.skills} message={'No Skills Added Yet'} handleRemove={()=>{}} readonly={true}/>)}
                                        {editMode && (<><div className='flex'>
                                            <select name="skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={currSelected} onChange={handleInputChange}>
                                                <option disabled selected>Select your skills</option>
                                                {options && options?.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
    
    
    
                                            <DisplayInputs className="pb-6" data={formData.skills} message={' '} handleRemove={handleRemoveSkill} />
    
                                            {!showSkillSet && (<span className="block text-sm font-medium text-gray-700">Don't see what you're searching for? <div className='text-purple-800 inline-block cursor-pointer ' onClick={()=>setShowSkillSet(true)}>Add New</div><IoMdAdd className=' text-purple-800  inline-block' /></span>)}
    
                                            {showSkillSet && (<div className='pt-6'>
                                                <div className='w-full'>
                                                    <NewSkillInput formData={formData} handleInputChange={handleInputChange} newSkillInput={newSkillInput} addNewSkill={addNewSkill} />
                                                </div>
                                                {skillMessage && (<span className="block text-sm font-medium text-gray-700">{skillMessage}</span>)}
                                                <DisplayInputs data={formData.newSkills} message={'Add a new skill to see it here'} handleRemove={handleRemoveNewSkill} />
                                            </div>)}
                                        </>
                                        )}

    
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
                    <div className="md:flex shadow bg-white mt-2 p-2 rounded-md flex flex-row w-full">
                        <div className='w-1/3 min-h-full mr-1'>
                            <ShowBadges></ShowBadges>
                        </div>
                        <div className='w-2/3 mx-auto bg-gray-100'>
                            <CodeContributions></CodeContributions>
                        </div>
                    </div>
                    <div className="shadow bg-white mt-2 p-2 rounded-md w-full">
                            <div className="flex justify-between p-4">
                                <span className="text-xl text-center font-semibold block">Starred Projects</span>
                            </div>
                        <div className='w-full'>
                            <ProjectCards projects={projects} navigate={navigate}/>
                            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else{
        return (
            <Loading />
        )
    }
};

export default AccountPage;
