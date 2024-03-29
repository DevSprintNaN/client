import React, { useEffect, useState } from "react";
import actions from "../../../context/dispatch/actions";
import dispatch from "../../../context/dispatch/dispatch";

const getDatesFor52Weeks = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 52 * 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().slice(0, 10));
    }
    return dates.reverse();
};

const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const diff = date - oneJan;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil((diff + oneJan.getDay() * oneDay) / (oneDay * 7));
};

const getColor = (contributions) => {

    if (contributions >= 12) return 'bg-green-700';
    if (contributions >= 10) return 'bg-green-600';
    if (contributions >= 8) return 'bg-green-500';
    if (contributions >= 4) return 'bg-green-400';
    if (contributions >= 2) return 'bg-green-300';
    if (contributions >= 1) return 'bg-green-200';
    return 'bg-gray-200';
};

const CodeContributions = () => {

    const [contributions, setContributions] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchContributions = async () => {
            const response = await dispatch(actions.getContributions, {});
            setContributions(response.contributions);
        };
        fetchContributions();

    }, []);

    useEffect(() => {
        console.log(contributions);
    }, [contributions]);

    const dates = getDatesFor52Weeks();
    const contributionsMap = {};

    if (contributions) {
        contributions.forEach((contribution) => {
            const date = new Date(contribution.date).toISOString().slice(0, 10);
            contributionsMap[date] = (contributionsMap[date] || 0) + 1;
        });
    }

    return (
        <>
            <div className="rounded-md shadow-md p-8 bg-white">
                <div className="text-xl font-semibold m-2">
                    Contributions
                </div>
                <div className="grid grid-cols-7 gap-1 md:grid-cols-7 md:gap-2">
                    {[...Array(52)].map((_, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-7 gap-1 md:grid-cols-7 md:gap-2">
                            {[...Array(7)].map((_, colIndex) => {
                                const dateIndex = rowIndex * 7 + colIndex;
                                const date = dates[dateIndex];
                                const weekNumber = getWeekNumber(new Date(date));
                                const contributions = contributionsMap[date] || 0;
                                const colorClass = getColor(contributions);

                                return (
                                    <div className="relative" key={colIndex}>
                                        <div
                                            className={`w-4 h-4 ${colorClass}`}
                                            title={`${contributions} contributions on ${date}`}
                                            onMouseEnter={() => setHoveredIndex(colIndex)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default CodeContributions;