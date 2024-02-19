import React, { useEffect, useState } from 'react';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';
  

export const useFetchForums = () => {
  const [forums, setForums] = useState();
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState('');
  const [searchItems,setSearchItems]=useState([]);

  const handleSearch=(e)=>{
    setSearch(e.target.value);
    if(search!==''){
      const filtered=forums.filter((forum)=>{
        return forum.title.toLowerCase().includes(search.toLowerCase()) || forum.description.toLowerCase().includes(search.toLowerCase());
      });
      setSearchItems(filtered);
    }
    else{
      setSearchItems(forums);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result=await dispatch(actions.getForumPosts);
        setForums(result.posts);
        setSearchItems(result.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return {searchItems,loading,handleSearch,search,setSearch};
};
