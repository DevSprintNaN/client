import { useState, useEffect } from 'react';

const useFetchOptions = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const optionsData = await ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"];
                setOptions(optionsData);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        fetchOptions();
    }, []);

    return { options };
};

export default useFetchOptions;
