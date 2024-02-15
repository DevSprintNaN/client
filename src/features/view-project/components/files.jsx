import IonIcon from "@reacticons/ionicons";
import  ChangesDrawer  from "./changes-drawer";
import { useState } from "react";
const Files = ({ directories, handleDirectories,handleViewFiles, changes }) => {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleDrawer = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    }

    return (
        <div className="block shadow bg-white p-2 rounded-md">
            {Array.from(new Set(directories.filter((directory) => directory.split("/")[0] !== "").map((directory) => directory.split("/")[0]+(directory.includes("/")?"/":"")))).map((directory, index) => (
            <div key={index} className="mx-auto mt-2 mb-2 py-1 px-2 flex flex-col">
                <div className="flex flex-row w-full">

                
                <div className="w-full bg-white rounded-lg shadow border align-middle cursor-pointer flex justify-between items-center pl-3"  onClick={() => handleDirectories(directory)}>
                    <p className="mb-2 mt-2 font-normal text-purple-900 inline"><IonIcon name={`${directory.includes("/") ? "folder-outline" : "document-outline"}`} className='me-2' />{directory.split("/")[0]}</p>
                </div>

                <div>
                {!directory.includes("/") && (
                    <button onClick={()=>{
                        handleViewFiles(directory);
                        toggleDrawer(index)}} className="bg-purple-700 text-white ml-2 rounded-md hover:bg-purple-900 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300 me-2">Versions</button>
                )}
                </div>
                </div>
                <div className="flex">
                        {openIndex === index &&(
                            <ChangesDrawer toggleDrawer={toggleDrawer} changes={changes}></ChangesDrawer>
                        )}
                </div>
                
                   
            </div>
             
                
            ))}
        </div>
    );
}

export default Files;