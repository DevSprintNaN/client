import { useEffect, useState } from "react";
import useFetchOptions from "./useFetchOptions";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";
import { useNavigate } from "react-router-dom";

export const useAccountPage=()=>{
    const [editMode, setEditMode] = useState(false);
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("");
    const [payload, setPayload] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [showSkillSet, setShowSkillSet] = useState(false);
    const { options } = useFetchOptions(); 
    const [projects,setProjects]=useState();
    const navigate=useNavigate();
    const [releavantProjects, setRelevantProjects] = useState();
    const [releavantProjectsLoading, setRelevantProjectsLoading] = useState(false);

    const fetchStarredProjects=async()=>{
        const response=await dispatch(actions.getStarredProjects);
        if(response?.status==="success"){
            setProjects(response.projects);
        }
    }

    useEffect(()=>{
        fetchStarredProjects();
    },[]);

    const fetchRelevantProjects = async()=>{
        try{
            setRelevantProjectsLoading(true);
            const response = await dispatch(actions.getRelevantProjects);
            if(response?.status ==="success"){
                setRelevantProjects(response.projects);
            }
            setRelevantProjectsLoading(false);
        }catch(error){
            console.log(error);
            throw error;
        }finally{
            setRelevantProjectsLoading(false);
        }
        
    }

    useEffect(()=>{
        fetchRelevantProjects();
    }, []);

    return {editMode, setEditMode, formState, setFormState, message, setMessage, payload, setPayload, disabled, setDisabled, showSkillSet, setShowSkillSet, options,projects,navigate, releavantProjects, releavantProjectsLoading}
}