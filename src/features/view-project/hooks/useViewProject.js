import { useState } from "react"

export const useViewProject=(id)=>{
    const [directories,setDirectories]=useState(["src/value/file","something/something2/something3/file","public","node_modules","package.json","package-lock.json",".gitignore","README.md","yarn.lock",".env",".env.example",".env.local",".env.development",".env.test",".env.production",".git",".github",".vscode",".gitattributes",".gitignore",".gitpod",".gitmodules",".gitkeep",".gitpod.yml",".gitpod.Dockerfile",".gitpod.yml",".gitpod.Dockerfile"]);

    return {directories,setDirectories}
}