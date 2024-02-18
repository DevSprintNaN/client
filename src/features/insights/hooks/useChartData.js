import { useEffect, useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useChartData = () => {
  const [contributorChartData, setContributorChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [starChartData, setStarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

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

  const fetchStars = async () => {
    const response = await dispatch(actions.numberOfStarsPerProject);
    let temp = [];
    for (let i = 1; i <= response.stars.length; i++) {
      temp.push(i);
    }
    return { stars: response.stars, rank: temp}
  }

  const fetchContributors = async () => {
    const response = await dispatch(actions.numberOfContributorsPerProject);
    let temp = [];
    for (let i = 1; i <= response.contributors.length; i++) {
      temp.push(i);
    }
    return {contributors:response.contributors, rank: temp};
  }

  const fetchChartData = async () => {
    await fetchStars().then((result)=>{
      setStarChartData({
        labels: result.rank,
        datasets: [
          {
            label: "Number of Stars in Top 100 Projects",
            data: result.stars,
            backgroundColor: ["#FFFFFF"],
            borderColor: "#581c87",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      });
    });
    await fetchContributors().then((result)=>{
      setContributorChartData({
        labels: result.rank,
        datasets: [
          {
            label: "Number of Contributors in Top 100 Projects",
            data: result.contributors,
            backgroundColor: ["#FFFFFF"],
            borderColor: "#581c87",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      });
    }); 
  }

  useEffect(() => {
    fetchChartData().then(() => { setLoading(false) }).catch((error) => { 
      setLoading(false);
      console.log(error) 
    });
  }, []);

  return { contributorChartData, starChartData, options, loading };
};
