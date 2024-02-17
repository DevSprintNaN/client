import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { getPage } from '@cloudinary/url-gen/actions/extract';



const PDFViewer = ({ src }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pages = {}, setPages] = useState({});
    const [totalPages, setTotalPages] = useState();

    const renderPDF = ({ src, page }) => {
        return (new Cloudinary({
            cloud: {
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            },
            url: {
                secure: true
            }
        })).image(src)
            .setDeliveryType('fetch')
            .format('auto')
            .quality('auto')
            .extract(getPage().byNumber(page))
            .toURL();
    }

    const pdfPages = Object.keys(pages).map(key => {
        return {
            src: pages[key],
            pageNumber: parseInt(key)
        };
    });

    const hasNext = pdfPages.find(({ pageNumber }) => currentPage + 1 === pageNumber);
    useEffect(() => {
        const page = renderPDF({ src, page: 1 });
        setPages({ 1: page })
    }, [src]);

    const renderer = async () => {
        const newPages = { ...pages };
        if (currentPage - 1 > 0 && !newPages[currentPage - 1]) {
            const prev = renderPDF({ src, page: currentPage - 1 });
            const imageExists = await fetch(prev).then(res => res.ok);

            if (imageExists) {
                newPages[currentPage - 1] = prev;
            }
        }

        if (!newPages[currentPage]) {
            const current = renderPDF({ src, page: currentPage });
            const imageExists = await fetch(current).then(res => res.ok);

            if (imageExists) {
                newPages[currentPage] = current;
            }
        }

        if (!newPages[currentPage + 1]) {
            const next = renderPDF({ src, page: currentPage + 1 });
            const imageExists = await fetch(next).then(res => res.ok);

            if (imageExists) {
                newPages[currentPage + 1] = next;
            } else {
                setTotalPages(Object.keys(newPages).length);
            }
        }

        setPages(newPages);
    }

    useEffect(() => {
        renderer();
    }, [currentPage])

    function handleOnNextSlide() {
        setCurrentPage(currentPage + 1);
    }

    function handleOnPrevSlide() {
        if (currentPage - 1 <= 0) return;
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className="h-full p-2 bg-gray-100 min-h-screen flex flex-col ">
            <div className="flex justify-between mt-4 p-2 bg-violet-200">
                <div className="flex justify-start items-center space-x-2">
                    <button
                        onClick={handleOnPrevSlide}
                        disabled={currentPage - 1 <= 0}
                        className={`bg-purple-700 h-full text-white px-4 rounded-md hover:bg-purple-900 focus:outline-none transition-colors duration-300 ${currentPage - 1 <= 0 ? "opacity-50" : ""}`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleOnNextSlide}
                        disabled={totalPages === currentPage || !hasNext}
                        className={`bg-purple-700 h-full text-white px-4 rounded-md hover:bg-purple-900 focus:outline-none  transition-colors duration-300 ${totalPages === currentPage || !hasNext ? "opacity-50" : ""}`}
                    >
                        Next
                    </button>
                    <a
                        href={src}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className={`bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-900 focus:outline-none transition-colors duration-300`}
                    >
                        Download PDF
                    </a>
                </div>
                <div className="flex justify-end items-center">
                    <span className="bg-purple-700 text-white px-4 py-2 rounded-md">Page {currentPage}</span>
                </div>
            </div>
            <div className="flex justify-center items-center h-full mb-4">
                <img
                    src={pages[currentPage]}
                    alt={`slide-${currentPage}`}
                    className="object-contain h-[90vh]"
                    loading='lazy'
                />
            </div>
        </div>
    );
};

export default PDFViewer;
