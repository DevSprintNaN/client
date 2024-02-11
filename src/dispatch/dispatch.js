import axios from 'axios';
export const baseUrl = 'http://localhost:8000';

const dispatch = async (actions, body={}) => {
    try{
        let response = {};

        switch(actions){
            case actions.register:
                response = await axios.post(`${baseUrl}/auth/register`, body);
                return response.data;

            case actions.login:
                response = await axios.post(`${baseUrl}/auth/login`,body);
                return response.data;
        }
    }catch(error){
        console.log(error);
        return error.response.data;
    }
};

export default dispatch;
