import { useEffect, useState } from "react"

export const useViewProject = (id) => {
    const [directories, setDirectories] = useState(["src/value/file", "something/something/something2/something3/file","something1/something4/something5/file", "public", "node_modules", "package.json", "package-lock.json", ".gitignore", "README.md", "yarn.lock", ".env", ".env.example", ".env.local", ".env.development", ".env.test", ".env.production", ".git", ".github", ".vscode", ".gitattributes", ".gitignore", ".gitpod", ".gitmodules", ".gitkeep", ".gitpod.yml", ".gitpod.Dockerfile", ".gitpod.yml", ".gitpod.Dockerfile"]);
    const [currentDirectory, setCurrentDirectory] = useState("/");
    console.log(id);
    const [fileMap, setMap] = useState(new Map());
    useEffect(() => {
        let fileMap = new Map();
        fileMap.set("/", directories);
        directories.forEach((directory)=>{
            let temp=directory;
            let currentDir="/";
            while(temp.includes("/")){
                currentDir+=temp.split("/")[0]+"/";
                temp=temp.split("/").slice(1).join("/");
                if(!fileMap.has(currentDir)){
                    fileMap.set(currentDir,[temp]);
                }
                else{
                    fileMap.set(currentDir, fileMap.get(currentDir).push(temp));
                }
            }
        })
        setMap(fileMap);
    }, [])

    const handleDirectories = (directory) => {
        if(directory.includes("/")){
            let temp=directory.split("/")[0];
            if(fileMap.has(currentDirectory+temp+"/")){
                setDirectories(fileMap.get(currentDirectory+temp+"/"));
                setCurrentDirectory(currentDirectory+temp+"/");
            }
        }
    }

    const reverse=()=>{
        if(currentDirectory!=="/"){
            let temp=currentDirectory.split("/").slice(0,-2).join("/")+"/";
            setDirectories(fileMap.get(temp));
            setCurrentDirectory(temp);
        }
    }

    return { directories, handleDirectories,currentDirectory,reverse}
}