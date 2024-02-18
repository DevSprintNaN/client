import axios from 'axios';
import actions from './actions';
export const baseUrl = import.meta.env.VITE_BASE_URL;

const dispatch = async (action, body={}) => {
    try{
        let response = {};
        axios.defaults.withCredentials=true;
        const secure={
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }
        switch(action){
            case actions.verified:
                response = await axios.post(`${baseUrl}/auth/verify`,body,secure);
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
                response = await axios.post(`${baseUrl}/project/create`, body,secure);
                return response;
            case actions.getProjects:
                response = await axios.get(`${baseUrl}/project/get`,secure);
                return response.data;
            case actions.fileUpload:
                response = await axios.post(`${baseUrl}/file/upload`, body,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                return response.data;
            case actions.getFiles:
                response = await axios.get(`${baseUrl}/file/get-all/${body}`,secure);
                return response.data;
            case actions.getUser:
                response = await axios.get(`${baseUrl}/auth/get-user`,secure);
                console.log(response);
                return response.data;
            case actions.getVersions:
                response = await axios.get(`${baseUrl}/file/get-changes/${body}`,secure);
                return response.data;
            case actions.getUserName:
                response = await axios.get(`${baseUrl}/file/get-contributor/${body}`,secure);
                return response.data;
            case actions.restoreVersion:
                response = await axios.put(`${baseUrl}/file/restore`, body,secure);
                return response.data;
            case actions.getMessages:
                response = await axios.get(`${baseUrl}/messaging/get-all/${body}`,secure);
                return response.data;
            case actions.getAllProjects:
                response = await axios.get(`${baseUrl}/project/get-all`,secure);
                return response.data;
            case actions.getContributions:
                response = await axios.get(`${baseUrl}/reputation/get-contributions`,secure);
                return response.data;
            case actions.starProject:
                response=await axios.post(`${baseUrl}/project/star`,body,secure);
                return response.data;
            case actions.unstarProject:
                response=await axios.post(`${baseUrl}/project/unstar`,body,secure);
                return response.data;
            case actions.getProject:
                response=await axios.get(`${baseUrl}/project/get-project/${body}`,secure);
                return response.data;
            case actions.isStarred:
                response=await axios.get(`${baseUrl}/project/is-starred/${body}`,secure);
                return response.data;
            case actions.numberOfContributorsPerProject:
                response=await axios.get(`${baseUrl}/project/number-of-contributors`,secure);
                return response.data;
            case actions.numberOfStarsPerProject:
                response=await axios.get(`${baseUrl}/project/number-of-stars`,secure);
                return response.data;
            case actions.changePassword:
                response=await axios.post(`${baseUrl}/profile/change-password`,body,secure);
                return response.data;
            case actions.getSkills:
                response=await axios.get(`${baseUrl}/profile/get-skills`,secure);
                return response.data;
            case actions.getUserSkills:
                response=await axios.get(`${baseUrl}/profile/get-user-skills`,secure);
                return response.data;
            case actions.getStarredProjects:
                response=await axios.get(`${baseUrl}/profile/get-starred-projects`,secure);
                return response.data;
            case actions.getProfile:
                response=await axios.get(`${baseUrl}/profile/get-profile`,secure);
                return response.data;
            case actions.updateProfile:
                response=await axios.patch(`${baseUrl}/profile/update-profile`,body,secure);
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
        console.log(error);
        return error.response;
    }
};

export default dispatch;
