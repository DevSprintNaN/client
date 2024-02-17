import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import AttachmentViewer from './attachment-viewer';

const ForumAttachment = ({ data, readonly, message, handleRemove, handleAttachmentView, show, closeModal, url, type }) => {   
    console.log("data",data) 
    return (
        <>
        {url && type && (<AttachmentViewer url={url} type={type} show={show} setShow={closeModal}/>)}
        <div className='flex md:flex-nowrap flex-wrap justify-start items-start pt-1'>
            {data.length > 0 ? (
                data.map((entry, index) => (
                    <div key={index} className="flex items-center bg-violet-200 rounded-full px-3 py-1 mb-2 mr-2 cursor-pointer">
                        <span className="text-md font-medium mr-1 px-2"  onClick={() => handleAttachmentView(entry)}>{entry.name}</span >
                        {!readonly && <IoClose className="text-gray-600 cursor-pointer" onClick={() => handleRemove(entry)} />}
                    </div>
                ))
            ) : (
                <label className="block text-sm font-medium text-gray-700">{message ? message : 'No data available yet'}</label>
            )}
        </div>
        </>
    );
};

export default ForumAttachment;
