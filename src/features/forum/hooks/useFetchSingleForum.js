import { useEffect, useState } from "react";

export const useFetchSingleForum = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forum, setForum] = useState(null);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const forumData = {
          _id: "1",
          title: "Lorem Ipsum",
          author: "abc",
          short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          cover_image_url:
            "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          content:
            "This is the content of the forum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            upvotes:3,
            downvotes:10,
          attachments: [
            {
              name: "On Usefulness of the Deep-Learning-Based Bug Localization.pdf",
              files:
                "http://res.cloudinary.com/dmam6dmrv/image/upload/v1707920415/75_2019_On%20Usefulness%20of%20the%20Deep-Learning-Based%20Bug%20Localization.pdf%24_65cadd85a417b64b3c7afd51%24_2024-02-14T20:20:10.220Z.pdf",
              upload_date: [
                {
                  $date: "2024-02-14T20:20:10.220Z",
                },
              ],
              fileType: "pdf",
              __v: 0,
            },
            {
              name: "Exploiting Code Knowledge Graph for Bug Localization via.pdf",
              files:
                "http://res.cloudinary.com/dmam6dmrv/image/upload/v1707920416/77_2020_Exploiting%20Code%20Knowledge%20Graph%20for%20Bug%20Localization%20via.pdf%24_65cadd85a417b64b3c7afd51%24_2024-02-14T20:20:11.175Z.pdf",
              upload_date: [
                {
                  $date: "2024-02-14T20:20:11.175Z",
                },
              ],
              fileType: "pdf",
              __v: 0,
            },
          ],
        };

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
