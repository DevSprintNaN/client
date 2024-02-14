import IonIcon from "@reacticons/ionicons";

const Files = ({ directories, handleDirectories }) => {


    return (
        <div className="block shadow bg-white p-2 rounded-md">
            {Array.from(new Set(directories.filter((directory) => directory.split("/")[0] !== "").map((directory) => directory.split("/")[0]+(directory.includes("/")?"/":"")))).map((directory, index) => (
                <div key={index} className="mx-auto mt-2 mb-2 p-2 bg-white rounded-lg shadow border align-middle cursor-pointer" onClick={() => handleDirectories(directory)}>
                    <p className="mb-2 mt-2 font-normal text-purple-900"><IonIcon name={`${directory.includes("/") ? "folder-outline" : "document-outline"}`} className='me-2' />{directory.split("/")[0]}</p>
                </div>
            ))}
        </div>
    );
}

export default Files;