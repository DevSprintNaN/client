import React, { useEffect, useState } from "react";

export const useChartData = () => {
  const [contributorChartData, setContributorChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [starChartData, setStarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const projects = [
    {
      name: "Project 1",
      owner: "user1",
      ownerName: "John Doe",
      users: ["user1", "user2", "user3"],
      userIds: ["id1", "id2", "id3"],
      fileId: ["fileId1", "fileId2"],
      contents: ["Content 1", "Content 2"],
      creationDate: "2023-05-15 10:30:00",
      lastModified: "2023-07-20 14:45:00",
      stars: 5, // Example star count for Project 1
    },
    {
      name: "Project 2",
      owner: "user2",
      ownerName: "Jane Doe",
      users: ["user2", "user3"],
      userIds: ["id2", "id3"],
      fileId: ["fileId3"],
      contents: ["Content 3", "Content 4", "Content 5"],
      creationDate: "2023-06-10 08:15:00",
      lastModified: "2023-08-25 11:20:00",
      stars: 8, // Example star count for Project 2
    },
    {
      name: "Project 3",
      owner: "user3",
      ownerName: "Alice Smith",
      users: ["user1", "user3"],
      userIds: ["id1", "id3"],
      fileId: ["fileId4", "fileId5"],
      contents: ["Content 6"],
      creationDate: "2023-07-02 12:00:00",
      lastModified: "2023-09-05 09:10:00",
      stars: 3, // Example star count for Project 3
    },
  ];

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  useEffect(() => {
    if (projects && projects.length > 0) {
      setLoading(true);
      const sortedProjects = projects?.sort((a, b) => {
        return b.stars - a.stars; // Sort in descending order of stars
      });

      const rank = sortedProjects.map((project, index) => {
        return index + 1;
      });
      const contributors = sortedProjects.map((project) => {
        return project.userIds.length;
      });

      const stars = sortedProjects.map((project) => {
        return project.stars;
      });

      setContributorChartData({
        labels: rank,
        datasets: [
          {
            label: "Number of Contributors in Top 100 Projects",
            data: contributors,
            backgroundColor: ["#FFFFFF"],
            borderColor: "#581c87",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      });

      setStarChartData({
        labels: rank,
        datasets: [
          {
            label: "Number of Stars in Top 100 Projects",
            data: stars,
            backgroundColor: ["#FFFFFF"],
            borderColor: "#581c87",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      });
    }

    setLoading(false);
  }, []);

  return { contributorChartData, starChartData, options, loading };
};
