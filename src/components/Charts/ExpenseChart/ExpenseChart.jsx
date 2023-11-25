import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseChart = () => {
    const data = [
        {
            name: 'Page A',
            expense_amount: 4000,
        },
        {
            name: 'Page B',
            expense_amount: 3000,

        },
        {
            name: 'Page C',
            expense_amount: 2000,

        },
        {
            name: 'Page D',
            expense_amount: 2780,
        }
    ];

    return (
        <div>
            <ResponsiveContainer width='100%' height={200}>
                <BarChart
                    width={500}
                    height={300}
                    data={data} // Use the data state
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expense_amount" stackId="a" fill="#0000f" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default ExpenseChart;
