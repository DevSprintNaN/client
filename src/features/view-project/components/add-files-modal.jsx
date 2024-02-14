import { useFileUpload } from "../hooks/useFileUpload";

const FileUploadModal = ({ currentDirectory, _id, setShow, handleFile }) => {
  const { files, error, handleDrop, handleCancel, handleFileInput, handleUpload, deleteFile, uploading, progress } = useFileUpload(currentDirectory, _id, setShow, handleFile);

  return (
    <div className="fixed inset-0 bg-violet-100/75 rounded-md h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        {!uploading && (<article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()}>

          <section className="h-full overflow-auto p-8 w-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input id="hidden-input" type="file" multiple className="hidden" webkitdirectory mozdirectory directory onChange={handleFileInput} />
              <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={() => document.getElementById('hidden-input').click()}>
                Upload a file
              </button>
            </header>

            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>
            <div className="w-full bg-red-100 text-red-500 border">
              {error}
            </div>
            {Object.keys(files).length > 0 ? (<ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {Object.entries(files).map(([objectURL, file]) => (
                <li key={objectURL} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                  <article tabIndex="0" className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                    <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                      <h1 className="flex-1 group-hover:text-blue-800">{file.name}</h1>
                      <div className="flex">
                        <span className="p-1 text-blue-800">
                          <i>
                            <svg className="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                            </svg>
                          </i>
                        </span>
                        <p className="p-1 size text-xs text-gray-700">{file.size > 1024 ? (file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb') : file.size + 'b'}</p>
                        <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800" onClick={() => deleteFile(objectURL)}>
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

          <footer className="flex justify-end px-8 pb-8 pt-4">
            <div className={`md:w-1/2 text-red-500 text-center  transition-colors duration-300 bg-gray-100 hover:bg-red-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 md:mb-0 md:mr-5 hover:cursor-pointer ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleCancel}>Cancel</div>

            <button className={`md:w-1/2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 ${uploading ? "opacity-50" : ""}`} disabled={uploading} onClick={() => handleUpload()}>Upload</button>
          </footer>
        </article>)}
        {uploading && (<article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
          <section className="h-full overflow-auto p-8 w-full flex flex-col">
            <header className="border-b-2 border-gray-100 pb-5">
              <h1 className="text-2xl font-semibold text-gray-900">Uploading...</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-1 bg-gray-200 rounded-full">
                <div id="progress" className="h-1 bg-purple-700 rounded-full" style={{ width: progress.toPrecision(3) + '%' }}></div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{progress}%</span>
            </div>
          </section>
        </article>)}
      </main>
    </div>
  );
};

export default FileUploadModal;
