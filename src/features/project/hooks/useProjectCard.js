import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useProjectCard=()=>{
    const navigate=useNavigate();
    const [projects,setProjects] = useState();
    const [error,setError]=useState("");

    const fetchProjects=async()=>{
        const response=await dispatch(actions.getAllProjects);
        if(response?.status==="success"){
            setError("");
            setProjects(response.projects);
        }
        else{
            setError("Sorry, we couldn't fetch your projects. Please try again later...")
            setProjects([]);
        }
    }

    useEffect(()=>{
        fetchProjects();
    },[])

    return {navigate,projects,setProjects,error}
}