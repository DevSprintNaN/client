import React, { useState } from 'react';
import UserNavbar from '../../../components/UserNavbar';
import parse from 'html-react-parser';
import ForumAttachment from '../components/forum-attachments';
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { useFetchSingleForum } from '../hooks/useFetchSingleForum';
import Loading from '../../../components/Loading';
import { useViewAttachments } from '../hooks/useViewAttachments';

const ViewSingleForum = () => {
    const { loading, error, forum } = useFetchSingleForum();
    const {handleUploadedAttachmentView, setShow, show, closeModal, url, type} = useViewAttachments();
    const [vote, setVote] = useState(null);

    const handleUpvote = () => {
        if (vote !== null) {
            setVote(1);
        } else {
            setVote(null);
        }
        console.log(vote)
    };

    const handleDownvote = () => {
        if (vote !== null) {
            setVote(-1);
        } else {
            setVote(null);
        }
        console.log(vote)
    };

    return loading ? (
        <>
            <Loading message={"Please wait while we get the forum..."} />
        </>
    ) : (
        <>
            <div className={` bg-violet-100 overflow-y-hidden`}>
                <UserNavbar />
                <div className="max-w-screen-lg mx-auto">
                    <main className="mt-3">
                        <div className="mb-4 md:mb-0 mx-auto relative">
                            <div className="px-4 lg:px-0">
                                <h2 className="text-2xl md:text-4xl font-semibold text-purple-800 leading-tight">
                                    {forum.title}
                                </h2>
                                By&nbsp;
                                <a
                                    className="pt-2 text-gray-700 inline-flex items-center justify-center mb-2"
                                > {forum.author}
                                </a>
                            </div>

                            <form className='w-full flex flex-end justify-end xs:py-2 pb-2 space-x-2 xs:space-x-4 pr-1'>

                                <div className={`rounded-md inline-flex items-center justify-center p-2  cursor-pointer h-full my-auto ${Number(vote) === Number(1) ? 'bg-purple-800 text-white' : 'bg-white hover:bg-purple-800 text-green-800 hover:text-white'}`} onClick={handleUpvote}>
                                    <BiSolidUpvote className='inline-block mr-1' />
                                    <span className='inline-block px-1'>{forum.upvotes}</span>
                                </div>

                                <div className={`rounded-md items-center justify-center p-2 cursor-pointer h-full my-auto ${vote === -1 ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-500 text-red-500 hover:text-white'}`} onClick={handleDownvote}>
                                    <BiSolidDownvote className='inline-block mr-1' />
                                    <span className='inline-block px-1'>{forum.downvotes}</span>
                                </div>


                            </form>


                            <img src={forum.cover_image_url} className="w-full object-cover lg:rounded h-[24em]" alt="forum" />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-12 bg-white">

                            <div className="px-4 lg:px-8 my-2 text-black text-lg leading-relaxed overflow-hidden w-full ">
                                <blockquote className="italic border-l-4 border-violet-300 pl-4 py-2 my-4 md:w-3/4 w-full">
                                    {forum.short_description}
                                </blockquote>
                                <div className='my-4'>{parse(forum.content)}
                                </div>

                                <div className='my-8 w-full '>
                                    <div className='block text-sm font-medium text-gray-700 mb-3 '>Attachments</div>
                                    <ForumAttachment data={forum?.attachments ? forum.attachments : []} readonly={true} message={'N/A'} handleRemove={() => { }} handleAttachmentView={handleUploadedAttachmentView} show={show} setShow={setShow} closeModal={closeModalForUploadedFiles} url={url} type={type}/>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ViewSingleForum;
