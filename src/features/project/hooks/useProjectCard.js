import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dispatch from "../../../dispatch/dispatch";
import actions from "../../../dispatch/actions";

export const useProjectCard=()=>{
    const navigate=useNavigate();
    const [projects,setProjects] = useState([]);

    const fetchProjects=async()=>{
        const response=await dispatch(actions.getProjects);
        if(response?.status==="success"){
            setProjects(response.projects);
        }
    }

    useEffect(()=>{
        fetchProjects();
    },[])

    return {navigate,projects,setProjects}
}