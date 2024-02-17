import IonIcon from '@reacticons/ionicons'
import React from 'react'
import ProjectCards from '../../project/components/project-cards'
import Pagination from '../../../components/Pagination'
import Message from '../../project/components/message'
import usePagination from '../../../hooks/usePagination'

const SearchResultModal = ({ show, setShow, searchResults, navigate }) => {
    const handleClose = () => {
        setShow(false)
    }
    const { currentPage, setCurrentPage, itemsPerPage, totalPages, getCurrentItems, handlePageChange } = usePagination(3, searchResults);
    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center bg-violet-100/75 transition-opacity z-20">
                {/* Close button on the far right */}
                <IonIcon name="close-circle" className="absolute top-0 right-0 p-1 text-3xl text-purple-800 cursor-pointer" onClick={()=>setShow(false)} />

                <div className="overflow-hidden rounded-md bg-white shadow-xl transition-all mt-1">
                <div className='bg-purple-900 py-2 text-white'>
                            <h1 className="text-xl font-semibold text-center">These results matched what you were searching for</h1>
                        </div> 
                    <div className='h-[90vh] w-[90vw] overflow-y-auto p-2'>
                        <ProjectCards navigate={navigate} projects={searchResults} />
                        {/* given there is at least one valid search result  */}
                        {searchResults && searchResults.length > 0 && (<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />)}
                        {/* given there is valid search result and the search result is empty */}
                        {searchResults && searchResults.length < 1 && (<div className='p-2'><Message message={"No search results found"} /></div>)}
                    </div>
                </div>
            </div>

        )
    )
}

export default SearchResultModal
