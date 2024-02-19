import React from 'react'
import { Line } from "react-chartjs-2"
import Loading from '../../../components/Loading'
import 'chart.js/auto'

const LineChart = ({ data, options, loading }) => {
    return (loading ? (<><Loading /></>) :
        (<>
            <div >
                <Line data={data} options={options}
                    height={400}
                    className="max-h-[50vh]" />
            </div>
        </>)
    )
}

export default LineChart