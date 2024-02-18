import { useState, useEffect } from 'react';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';

const useFetchOptions = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const optionsData = await dispatch(actions.getSkills);
                console.log("optionsData:", optionsData);
                setOptions(optionsData.skills);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        fetchOptions();
    }, []);

    return { options };
};

export default useFetchOptions;
