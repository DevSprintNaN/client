import React, { useEffect, useState } from 'react';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';
  

export const useFetchForums = () => {
  const [forums, setForums] = useState();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result=await dispatch(actions.getForumPosts);
        setForums(result.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return {forums,loading};
};
