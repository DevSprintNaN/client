import axios from 'axios';
import actions from './actions';
export const baseUrl = import.meta.env.VITE_BASE_URL;

const dispatch = async (action, body={}) => {
    try{
        let response = {};
        axios.defaults.withCredentials=true;
        switch(action){
            case actions.verified:
                response = await axios.post(`${baseUrl}/auth/verify`,body);
                return response.data;

            case actions.register:
                response = await axios.post(`${baseUrl}/auth/register`, body);
                return response.data;
            case actions.logout:
                response = await axios.post(`${baseUrl}/auth/logout`);
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
            case actions.fileUpload:
                response = await axios.post(`${baseUrl}/file/upload`, body,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    
                    }
                });
                return response.data;
            case actions.getFiles:
                response = await axios.get(`${baseUrl}/file/get-all/${body}`);
                return response.data;
            case actions.getVersions:
                response = await axios.get(`${baseUrl}/file/get-changes/${body}`);
                return response.data;
            case actions.getUserName:
                response = await axios.get(`${baseUrl}/file/get-contributor/${body}`);
                return response.data;
            case actions.restoreVersion:
                response = await axios.put(`${baseUrl}/file/restore`, body);
                return response.data;
        }
    }catch(error){
        // if(error.code==="ERR_NETWORK"){
        //     console.log("comes here");
        //     window.location.href="/error500";
        // }
        // else if(error.code==="ECONNREFUSED"){
        //     window.location.href="/error500";
        // }
        // else if(error.response.status===500){
        //     window.location.href="/error500";
        // }
        // else if(error.response.status===404){
        //     window.location.href="/error404";
        // }
        return error.response;
    }
};

export default dispatch;
