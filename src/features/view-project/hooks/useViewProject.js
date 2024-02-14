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
        setDirectories(res.files.map((file) => file.name.split(id+"/")[1]));
        generateMap(res.files.map((file) => file.name.split(id+"/")[1]));
    }

    const generateMap=(dirs)=>{
        let fileMap = new Map();
            fileMap.set("/", dirs);
            dirs.forEach((directory) => {
                let temp = directory;
                let currentDir = "/";
                while (temp.includes("/")) {
                    currentDir += temp.split("/")[0] + "/";
                    temp = temp.split("/").slice(1).join("/");
                    if (!fileMap.has(currentDir)) {
                        fileMap.set(currentDir, [temp]);
                    }
                    else {
                        let files=fileMap.get(currentDir);
                        files.push(temp);
                        fileMap.set(currentDir, files);
                    }
                }
            })
            setMap(fileMap);
    }

    useEffect(() => {
        fetchFiles();
    }, [])



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
            console.log(temp);
            setDirectories(fileMap.get(temp));
            console.log(fileMap.get(temp));
            setCurrentDirectory(temp);
        }
    }

    const handleFolder = (folder) => {
        setDirectories([...directories, folder + "/"])
        let map = fileMap;
        if (!map.has(currentDirectory)) {
            map.set(currentDirectory, [folder + "/"]);
        }
        else {
            let files = map.get(currentDirectory)
            files.push(folder + "/")
            map.set(currentDirectory, files);
        }
        map.set(currentDirectory + folder + "/", [""])
    }

    const handleFile =(file)=>{
        let files = directories;
        files.push(file);
        setDirectories(files);
        let map = fileMap;
        if (!map.has(currentDirectory)) {
            map.set(currentDirectory, [file]);
        }
        else {
            let files = map.get(currentDirectory)
            files.push(file)
            map.set(currentDirectory, files);
        }
    }

    return { directories, handleDirectories, currentDirectory, reverse, setDirectories, handleFolder,handleFile }
}