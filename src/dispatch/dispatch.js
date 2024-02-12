import axios from 'axios';
import actions from './actions';
export const baseUrl = import.meta.env.VITE_BASE_URL;

const dispatch = async (action, body={}) => {
    try{
        let response = {};
        switch(action){
            case actions.register:
                response = await axios.post(`${baseUrl}/auth/register`, body);
                return response.data;

            case actions.login:
                response = await axios.post(`${baseUrl}/auth/login`,body);
                console.log(response);
                return response.data;
        }
    }catch(error){
        return error;
    }
};

export default dispatch;
