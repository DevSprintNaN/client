import { useEffect, useState } from "react"
import dispatch from "../../../dispatch/dispatch";
import actions from "../../../dispatch/actions";

export const useViewProject = (id) => {
    const [directories, setDirectories] = useState();
    const [currentDirectory, setCurrentDirectory] = useState("/");
    console.log(id);
    const [fileMap, setMap] = useState(new Map());
    const fetchFiles = async () => {
        const res = await dispatch(actions.getFiles, id);
        console.log(res);
        setDirectories(res.files.map((file) => file.name.split(id+"/")[1]));
    }
    useEffect(() => {
        fetchFiles();
    }, [])

    useEffect(() => {
        if (directories) {
            console.log(directories);   
            let fileMap = new Map();
            fileMap.set("/", directories);
            directories.forEach((directory) => {
                let temp = directory;
                let currentDir = "/";
                while (temp.includes("/")) {
                    currentDir += temp.split("/")[0] + "/";
                    temp = temp.split("/").slice(1).join("/");
                    if (!fileMap.has(currentDir)) {
                        fileMap.set(currentDir, [temp]);
                    }
                    else {
                        fileMap.set(currentDir, fileMap.get(currentDir).push(temp));
                    }
                }
            })
            setMap(fileMap);
        }
    }, [directories])

    const handleDirectories = (directory) => {
        if (directory.includes("/")) {
            let temp = directory.split("/")[0];
            if (fileMap.has(currentDirectory + temp + "/")) {
                if (fileMap.has(currentDirectory + temp + "/")) {
                    setDirectories(fileMap.get(currentDirectory + temp + "/"));
                }
                setCurrentDirectory(currentDirectory + temp + "/");
            }
        }
    }

    const reverse = () => {
        if (currentDirectory !== "/") {
            let temp = currentDirectory.split("/").slice(0, -2).join("/") + "/";
            setDirectories(fileMap.get(temp));
            setCurrentDirectory(temp);
        }
    }

    const handleFolder = (folder) => {
        setDirectories([...directories, folder + "/"]);
        let map = fileMap;
        const currentDir = currentDirectory === "/" ? currentDirectory : currentDirectory + "/";
        if (!map.has(currentDir)) {
            map.set(currentDir, [folder + "/"]);
        }
        else {
            let files = map.get(currentDir)
            files.push(folder + "/")
            map.set(currentDir, files);
        }
        map.set(currentDir + folder + "/", [""])
    }

    return { directories, handleDirectories, currentDirectory, reverse, setDirectories, handleFolder }
}