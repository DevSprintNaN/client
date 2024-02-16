import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const NewSkillInput = ({ handleInputChange, formData, newSkillInput, addNewSkill }) => {
    return (
        <div className='pb-3'>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Add A New Skill</label>
            <div className='flex'>
                <input type="text" id={`newSkills`} name={`newSkills`} className="mt-1 mr-2 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300" value={newSkillInput} onChange={handleInputChange} />
                <div className='h-full flex my-auto pl-1 bg-purple-800 p-1 rounded-md cursor-pointer' onClick={addNewSkill}>
                    <IoMdAdd className='text-2xl text-white' />
                </div>
            </div>
        </div>
    );
};

export default NewSkillInput;
