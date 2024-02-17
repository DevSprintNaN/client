import React, { useEffect, useState } from 'react';

const forumDummy =[
    {
      "_id": "1",
      "title": "Lorem Ipsum",
      "author": "abc",
      "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "cover_image_url": "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
    {
      "_id": "2",
      "title": "Dolor Sit Amet",
      "author": "abc",
      "short_description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "cover_image_url": "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
    {
      "_id": "3",
      "title": "Consectetur Adipiscing Elit",
      "author": "abc",
      "short_description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "cover_image_url": "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
    {
      "_id": "4",
      "title": "Sed Do Eiusmod Tempor",
      "author": "abc",
      "short_description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "cover_image_url": "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
  ]
  

export const useFetchForums = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setForums(forumDummy);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return {forums};
};
