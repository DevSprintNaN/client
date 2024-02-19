import { useEffect } from "react";
import dispatch from "../context/dispatch/dispatch";
import actions from "../context/dispatch/actions";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../context/auth/actions";

export const useProtection=()=>{
    const token=useSelector((state)=>state.auth.token);
    const authenticated=useSelector((state)=>state.auth.authenticated);
    const authDispatch=useDispatch();

    const checkToken=async()=>{
        const response=await dispatch(actions.verified);
        console.log(response);
        if(response.status==="error"){
            authDispatch(setAuthenticated(false));
            localStorage.removeItem("token");
        }
        else{
            authDispatch(setAuthenticated(true));
        }
    }   

    useEffect(()=>{
        if(!authenticated){
            checkToken();
        }
    },[token])

    return {}
}