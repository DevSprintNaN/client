import React from 'react';
import UserNavbar from '../../../components/UserNavbar';
import HeaderCard from '../components/header-card';
import { useChartData } from '../hooks/useChartData';
import LineChart from '../components/chart';
import usePagination from '../../../hooks/usePagination';
import ProjectCards from '../../project/components/project-cards';
import Pagination from '../../../components/Pagination';
import { useInsights } from '../hooks/useInsights';

const Insights = () => {
    const { contributorChartData, starChartData, options, loading } = useChartData();
    const { navigate, projects } = useInsights();
    const { currentPage, setCurrentPage, itemsPerPage, totalPages, getCurrentItems, handlePageChange } = usePagination(8, projects);
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

            <div className="shadow bg-white p-2 rounded-md h-full">
                <div className="sm:flex py-3 items-center justify-center text-center w-full h-full">
                    <h5 className="text-3xl font-bold text-purple-800">
                        Top Projects Of The Week
                    </h5>
                </div>

                <ProjectCards navigate={navigate} projects={getCurrentItems()} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

            </div>

        </div>
    );
};

export default Insights;
