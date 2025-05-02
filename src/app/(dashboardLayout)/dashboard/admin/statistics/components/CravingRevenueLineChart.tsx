import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { CravingRevenueDataTypes } from '../page';

type CravingRevenueLineChartProps = {
    data: CravingRevenueDataTypes[];
}

const CravingRevenueLineChart = ({data}: CravingRevenueLineChartProps) => {
    return (
        <LineChart width={1100} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="month" />
            <YAxis ticks={[10000, 20000, 30000, 40000, 50000]}/>
            <Tooltip />
            <Legend iconType="square" formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
            <Line type="monotone" dataKey="revenue" strokeWidth={2.5} stroke="#F97316" />
            <Line type="monotone" dataKey="expense" strokeWidth={2.5} stroke="#000000" />
        </LineChart>
    );
};

export default CravingRevenueLineChart;