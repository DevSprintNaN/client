import { useEffect, useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useFetchSingleForum = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forum, setForum] = useState(null);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const response=await dispatch(actions.getForumPost,id);
        console.log(response);
        console.log(response);
        setForum(response.forum);

        setForum(forumData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchForum();
  }, []);

  return { loading, error, forum };
};
