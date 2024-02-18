import { useEffect, useState } from "react"
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDirectoryContext, setCurrentFileURL, setProjectID } from "../../../context/file/actions";
import { useNavigate } from "react-router";

export const useViewProject = (id) => {
    const [changes, setChanges] = useState();
    const [directories, setDirectories] = useState();
    const [currentDirectory, setCurrentDirectory] = useState("/");
    const currentDirectoryContext = useSelector((state) => state.file.currentDirectory);
    const [starred, setStarred] = useState(false)
    const [fileDetailed, setFileDetailed] = useState();
    const [disableStar, setDisableStar] = useState(false);
    const navigate=useNavigate();
    const fileDispatch = useDispatch();
    console.log(id);
    const [fileMap, setMap] = useState(new Map());
    const fetchFiles = async () => {
        const isStarred=await dispatch(actions.isStarred,id);
        setStarred(isStarred.isStarred);
        const res = await dispatch(actions.getFiles, id);
        setDirectories(res.files.map((file) => file.name.split(id + "/")[1]));
        generateMap(res.files.map((file) => file.name.split(id + "/")[1]));
        setFileDetailed(res.files);

    }

    const generateMap = (dirs) => {
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
                    let files = fileMap.get(currentDir);
                    files.push(temp);
                    fileMap.set(currentDir, files);
                }
            }
        })
        setMap(fileMap);
        if(currentDirectoryContext){
            const path=currentDirectoryContext[currentDirectoryContext.length-1]==="/"?currentDirectoryContext:currentDirectoryContext.split("/").slice(0,-1).join("/")+"/";
            setCurrentDirectory(path);
            setDirectories(fileMap.get(path));
        }
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
        else {
            fileDispatch(setCurrentDirectoryContext(currentDirectory + directory))
            fileDispatch(setProjectID(id));
            console.log(id + currentDirectory + directory);
            const urls = fileDetailed.find((file) => file.name === id + currentDirectory + directory).files;
            const fileTypes = fileDetailed.find((file) => file.name === id + currentDirectory + directory).fileType;
            fileDispatch(setCurrentFileURL(urls[urls.length - 1]));
            navigate(`/view-project/${id}/open-file/${fileTypes[fileTypes.length - 1]}`);
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

    const handleFile = (file) => {
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

    const handleAddFile = () => {
        fileDispatch(setCurrentDirectoryContext(currentDirectory))
        fileDispatch(setProjectID(id));
        navigate(`/view-project/${id}/add-file`)
    }

    const handleViewFiles = async (file_name) => {

        const response = await dispatch(actions.getVersions, encodeURIComponent(id+currentDirectory+file_name).replaceAll(".","%2E"));
        const sortedChanges = response.changes.sort((a, b) => new Date(b.date) - new Date(a.date));
        setChanges(sortedChanges);
        console.log(sortedChanges);
    }

    const handleAddStar=async()=>{
        setDisableStar(true);
        if(!starred){
            const response=await dispatch(actions.starProject,{id});
            if(response.status==="success"){
                setStarred(true);
            }
        }
        else{
            const response=await dispatch(actions.unstarProject,{id});
            if(response.status==="success"){
                setStarred(false);
            }
        }
        setDisableStar(false);
    }

    return { directories, handleDirectories, currentDirectory, reverse, setDirectories, handleFolder, handleFile,handleAddFile,handleViewFiles, changes,handleAddStar,starred,disableStar }
}