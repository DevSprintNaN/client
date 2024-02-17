import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [pageNumbers, setPageNumbers] = useState([])

    useEffect(() => {
        const updatedPageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            updatedPageNumbers.push(i);
        }
        console.log("current page", currentPage)
        setPageNumbers(updatedPageNumbers);
        console.log("pagenumber in pagination", pageNumbers)
    }, [totalPages]);    

    return (
        <nav>
            <ul className="flex items-center justify-center">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        aria-label="Previous"
                    >
                        <span className="text-sm">&lt;</span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`mx-1 font-medium text-md flex h-9 w-9 items-center justify-center  p-0  shadow-xl transition duration-150 ease-in-out ${Number(currentPage) === Number(number) ? "text-white bg-purple-800 rounded-full" : "hover:bg-purple-600 rounded-sm text-black hover:text-white"}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-violet-300 ${currentPage === totalPages ? "opacity-50" : ""}`}
                        aria-label="Next"
                    >
                        <span className="text-sm">&gt;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
