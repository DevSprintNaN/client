import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import AttachmentViewer from './attachment-viewer';

const ForumAttachment = ({ files, readonly, message, handleRemove, handleAttachmentView, show, closeModal, url, type }) => {   
    return (
        <>
        {url && type && (<AttachmentViewer url={url} type={type} show={show} setShow={closeModal}/>)}
        <div className='flex flex-wrap justify-start items-start pt-1'>
            {files.length > 0 ? (
                files.map(([objectURL, file]) => (
                    <div key={objectURL} className={`flex items-center bg-violet-200 rounded-full px-3 py-1 mb-2 mr-2 ${readonly? 'cursor-pointer' : ''}`}>
                        <span className="text-md font-medium mr-1 px-2"  onClick={() => handleAttachmentView(objectURL,file.name)}>{file.name}</span >
                        {!readonly && <IoClose className="text-gray-600 cursor-pointer" onClick={() => handleRemove(objectURL)} />}
                    </div>
                ))
            ) : (
                <label className="block text-sm font-medium text-gray-700">{message ? message : 'No files available yet'}</label>
            )}
        </div>
        </>
    );
};

export default ForumAttachment;
