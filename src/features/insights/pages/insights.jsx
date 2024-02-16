import React from 'react';
import UserNavbar from '../../../components/UserNavbar';
import HeaderCard from '../components/header-card';
import { useChartData } from '../hooks/useChartData';
import LineChart from '../components/chart';

const Insights = () => {
    const { contributorChartData, starChartData, options, loading } = useChartData();

    return (
        <div className="h-full p-2 bg-violet-100 w-full min-h-screen">
            <UserNavbar />
            <HeaderCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-3">
                <div className="col-span-full lg:col-span-1">
                    <LineChart data={contributorChartData} options={options} loading={loading} />
                </div>
                <div className="col-span-full lg:col-span-1">
                    <LineChart data={starChartData} options={options} loading={loading} />
                </div>
            </div>
            
        </div>
    );
};

export default Insights;
