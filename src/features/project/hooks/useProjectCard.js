import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dispatch from "../../../dispatch/dispatch";
import actions from "../../../dispatch/actions";

export const useProjectCard=()=>{
    const navigate=useNavigate();
    const [projects,setProjects] = useState();
    const [error,setError]=useState("");

    const fetchProjects=async()=>{
        const response=await dispatch(actions.getProjects);
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