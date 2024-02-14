import React, { useState } from 'react';

const FileUploadModal = ({ show, setShow }) => {
  const [files, setFiles] = useState({});

  const addFile = (file) => {
    const objectURL = URL.createObjectURL(file);

    setFiles(prevFiles => ({
      ...prevFiles,
      [objectURL]: file
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    for (const file of event.dataTransfer.files) {
      addFile(file);
    }
  };

  const handleFileInput = (event) => {
    for (const file of event.target.files) {
      addFile(file);
    }
  };

  const deleteFile = (target) => {
    const filesCopy = { ...files };
    delete filesCopy[target];
    setFiles(filesCopy);
  };

  const handleCancel = () => {
    setFiles({})
    setShow(false)
  };

  const handleUpload = () => {
    console.log(files)
  };

  return (
    <div className="fixed inset-0 bg-violet-100/75 rounded-md h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()}>

          <section className="h-full overflow-auto p-8 w-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input id="hidden-input" type="file" multiple className="hidden" onChange={handleFileInput} />
              <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={() => document.getElementById('hidden-input').click()}>
                Upload a file
              </button>
            </header>

            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>

            {Object.keys(files).length > 0 ? (<ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {Object.entries(files).map(([objectURL, file]) => (
                <li key={objectURL} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                  <article tabIndex="0" className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                    {/* {file.type.match('image.*') && <img alt="upload preview" className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed" src={objectURL} />} */}
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
              : (<><ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center">
                  <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                  <span class="text-small text-gray-500">No files selected</span>
                </li>
              </ul></>)}
          </section>

          <footer className="flex justify-end px-8 pb-8 pt-4">
            <button id="submit" className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none" onClick={handleUpload}>
              Upload now
            </button>
            <button id="cancel" className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default FileUploadModal;
