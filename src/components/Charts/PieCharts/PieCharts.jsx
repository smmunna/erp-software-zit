import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieCharts = ({
    prev9year, prev8year, prev7year, prev6year, prev5year, prev4year, prev3year, prev2year, prev1year, curyear,
    prev9yeare, prev8yeare, prev7yeare, prev6yeare, prev5yeare, prev4yeare, prev3yeare, prev2yeare, prev1yeare, curyeare,
    prev9yearp, prev8yearp, prev7yearp, prev6yearp, prev5yearp, prev4yearp, prev3yearp, prev2yearp, prev1yearp, curyearp
}) => {
    const date = new Date();
    const year = date.getFullYear();

    const data = [
        { name: `${year - 9}`, income: prev9year, expense: prev9yeare, profit: prev9yearp },
        { name: `${year - 8}`, income: prev8year, expense: prev8yeare, profit: prev8yearp },
        { name: `${year - 7}`, income: prev7year, expense: prev7yeare, profit: prev7yearp },
        { name: `${year - 6}`, income: prev6year, expense: prev6yeare, profit: prev6yearp },
        { name: `${year - 5}`, income: prev5year, expense: prev5yeare, profit: prev5yearp },
        { name: `${year - 4}`, income: prev4year, expense: prev4yeare, profit: prev4yearp },
        { name: `${year - 3}`, income: prev3year, expense: prev3yeare, profit: prev3yearp },
        { name: `${year - 2}`, income: prev2year, expense: prev2yeare, profit: prev2yearp },
        { name: `${year - 1}`, income: prev1year, expense: prev1yeare, profit: prev1yearp },
        { name: `${year}`, income: curyear, expense: curyeare, profit: curyearp }
    ];

    return (
        <div>
            <ResponsiveContainer width='100%' height={200}>
                <LineChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="incomeChart"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#17A00E" fill="#17A00E" strokeWidth={3} />
                    <Line type="monotone" dataKey="expense" stroke="#F40E26" fill="#F40E26" strokeWidth={3} />
                    <Line type="monotone" dataKey="profit" stroke="#FFC107" fill="#FFC107" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PieCharts;
