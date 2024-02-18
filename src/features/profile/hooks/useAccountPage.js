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

    const fetchStarredProjects=async()=>{
        const response=await dispatch(actions.getStarredProjects);
        if(response?.status==="success"){
            setProjects(response.projects);
        }
    }

    useEffect(()=>{
        fetchStarredProjects();
    },[])

    return {editMode, setEditMode, formState, setFormState, message, setMessage, payload, setPayload, disabled, setDisabled, showSkillSet, setShowSkillSet, options,projects,navigate}
}