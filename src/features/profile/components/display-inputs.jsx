import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayInputs = ({data, handleRemove, message}) => {
    return (
        <>
            <div className='flex justify-start items-start pt-1'>
                {data.length > 0 ? data.map((skill, index) => (
                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 mb-2 mr-2">
                        <span className="text-sm mr-1">{skill}</span>
                        <IoClose className="text-gray-600 cursor-pointer" onClick={() => handleRemove(skill)} />
                    </div>
                )) : (<> <label className="block text-sm font-medium text-gray-700">{message?message: 'No data available yet'}</label></>)}
            </div>
        </>
    )
}

export default DisplayInputs