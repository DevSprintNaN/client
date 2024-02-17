import React from 'react';
import UserNavbar from '../../../components/UserNavbar';
import ForumCards from '../components/forum-cards';
import { useFetchForums } from '../hooks/useFetchForums';
import Pagination from '../../../components/Pagination';
import Message from '../../project/components/message';
import usePagination from '../../../hooks/usePagination';
import { useNavigate } from 'react-router';

const ViewForums = () => {
    const { forums } = useFetchForums();
    const { currentPage, setCurrentPage, totalPages, getCurrentItems, handlePageChange } = usePagination(12, forums);
    const navigate = useNavigate()
    return (
        <div className={`h-full p-2 bg-violet-100 w-full min-h-screen`} >
            <UserNavbar />
            <div className="text-gray-900 pb-8 pr-0 pl-0 bg-white">
                <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-0 md:py-2 sm:space-y-8 md:space-y-16 max-w-7xl">
                    <div className="flex flex-col items-center sm:px-5 md:flex-row">
                        
                        <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0">
                            <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16 md:space-y-5">
                                <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl text-purple-800">Share Your Brilliance</a>
                                <div className="pt-1">
                                    <p className='text-md text-purple-900 font-medium my-2'>We're interested in hearing from you! </p>
                                    <p className="text-sm font-medium inline">
                                        Share your unique insights, experiences, and project stories with our community. Your brilliance and creativity are what make this forum thrive, so don't hesitate to contribute.
                                        Whether it's a tip, a success story, or a lesson learned, every contribution adds value and inspires others.
                                    </p>
                                    <div className='w-full flex flex-start justify-start xs:py-2 py-2 space-x-2 xs:space-x-4 pr-1'>
                                        <div>
                                            <button className={`w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300`} onClick={()=>navigate('/add-forum')}>Create Forum</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ForumCards forums={getCurrentItems()} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                {!(getCurrentItems() && getCurrentItems().length > 0) && (<div className='p-2'><Message message={"No forums found"} /></div>)}
            </div>
        </div>
    );
}

export default ViewForums;
