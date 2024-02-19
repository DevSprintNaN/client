

const UploadAttachments = ({ setShow, files, handleDrop, handleFileInput, deleteFile,setError,error }) => {
    const handleCloseModal=()=>{
        setError("");
        let size=0;
        if(Object.values(files).length>5){
            setError("Cannot Upload More Than 5 Files");
            return;
        }
        Object.values(files).forEach((file)=>{
            size+=file.size;
        })
        if(size>52428800){
            setError("Total File Size has to be less than 50 MB");
            return;
        }
        setShow(false);
    }
    return (
        <>
            <div className="fixed inset-0 bg-violet-100/75 rounded-md h-screen w-screen sm:px-8 md:px-16 sm:py-8 z-20">
                <main className="container mx-auto max-w-screen-lg h-full">
                    <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()}>

                        <section className="h-full overflow-auto p-8 w-full flex flex-col">
                            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                </p>
                                <input id="hidden-input" type="file" multiple className="hidden" webkitdirectory mozdirectory directory onChange={(e)=>handleFileInput(e)} />
                                <button id="button" className="mt-4 block h-10 transform rounded-md border px-4 py-2 text-center capitalize text-purple-800 hover:text-white  transition-colors duration-300 hover:bg-purple-600  lg:mt-0 lg:w-auto" onClick={() => document.getElementById('hidden-input').click()}>
                                    Choose file
                                </button>
                            </header>

                            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>
                            <div className="bg-red-100 text-red-900">{error}</div>
                            {Object.keys(files).length > 0 ? (<ul id="gallery" className="flex flex-1 flex-wrap">
                                {Object.entries(files).map(([objectURL, file]) => (
                                    <li key={objectURL} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                                        <article tabIndex="0" className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-violet-100 cursor-pointer relative shadow-sm">
                                            <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                                                <h1 className="flex-1 group-hover:text-purple-800">{file.name}</h1>
                                                <div className="flex">
                                                    <span className="p-1 text-purple-800">
                                                        <i>
                                                            <svg className="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                                            </svg>
                                                        </i>
                                                    </span>
                                                    <p className="p-1 size text-xs text-gray-700">{file.size > 1024 ? (file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb') : file.size + 'b'}</p>
                                                    <button className="delete ml-auto focus:outline-none  p-1 rounded-md text-purple-800" onClick={() => deleteFile(objectURL)}>
                                                        <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </section>
                                        </article>
                                    </li>
                                ))}
                            </ul>)
                                : (<><ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                                    <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center">
                                        <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                        <span className="text-small text-gray-500">No files selected</span>
                                    </li>
                                </ul></>)}
                        </section>

                        <footer className="flex justify-center space-x-2 px-8 pb-8 pt-4">

                            <button className={` bg-purple-700 text-white py-2 px-6 md:px-12 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300` } onClick={()=>handleCloseModal()}>Done</button>
                        </footer>

                    </article>
                </main>
            </div>
        </>
    )
}

export default UploadAttachments