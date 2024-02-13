import axios from 'axios';
import actions from './actions';
import { useNavigate } from 'react-router-dom';
export const baseUrl = import.meta.env.VITE_BASE_URL;

const dispatch = async (action, body={}) => {
    try{
        let response = {};
        axios.defaults.withCredentials=true;
        switch(action){
            case actions.register:
                response = await axios.post(`${baseUrl}/auth/register`, body);
                return response.data;

            case actions.login:
                response = await axios.post(`${baseUrl}/auth/login`,body);
                return response.data;
            case actions.addProject:
                response = await axios.post(`${baseUrl}/project/create`, body);
                return response;
            case actions.getProjects:
                response = await axios.get(`${baseUrl}/project/get-all`, body);
                return response.data;
        }
    }catch(error){
        if(error.code==="ERR_NETWORK"){
            console.log("comes here");
            window.location.href="/error500";
        }
        else if(error.code==="ECONNREFUSED"){
            window.location.href="/error500";
        }
        else if(error.response.status===401 || error.response.status===403){
            window.location.href="/error401";
        }
        else if(error.response.status===500){
            window.location.href="/error500";
        }
        else if(error.response.status===404){
            window.location.href="/error404";
        }
        return error.response;
    }
};

export default dispatch;
