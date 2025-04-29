import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { CravingTopFoodCategoryDataTypes } from '../page';

type CravingTopCategoryPieChartProps = {
    data: CravingTopFoodCategoryDataTypes[];
};

const CravingTopCategoryPieChart = ({ data }: CravingTopCategoryPieChartProps) => {

    const COLORS = ['#F97316', '#EA580C', '#FDBA74', '#333333'];

    return (
        <PieChart width={300} height={300}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
            >
                {data.map((entry: CravingTopFoodCategoryDataTypes, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}

            </Pie>

            <Tooltip
                formatter={(value: number, name: string) => [`${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            />

            <Legend
                iconType="square"
                formatter={(value) => {
                    const item = data.find((d) => d.category === value);
                    return `${value} (${item?.value || 0}%)`;
                }} />
        </PieChart>
    );
};

export default CravingTopCategoryPieChart;