import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';



const PieChartsExpense = ({ monthlydata }) => {
    const date = new Date();
    const year = date.getFullYear();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = monthlydata.map(month => ({
        name: monthNames[month.month - 1], // Subtract 1 because array index is 0-based
        income: month.total_paid,
        expense: month.total_expense,
        profit: month.total_profit,
    }));


    // const data = [
    //     {
    //         name: "January",
    //         income: 25000,
    //         expense: 15000,
    //     },
    //     {
    //         name: "February",
    //         income: 28000,
    //         expense: 18000,
    //     },
    //     {
    //         name: "March",
    //         income: 32000,
    //         expense: 20000,
    //     },
    //     {
    //         name: "April",
    //         income: 35000,
    //         expense: 22000,
    //     },
    //     {
    //         name: "May",
    //         income: 30000,
    //         expense: 18000,
    //     },
    //     {
    //         name: "June",
    //         income: 27000,
    //         expense: 16000,
    //     },
    //     {
    //         name: "July",
    //         income: 26000,
    //         expense: 15000,
    //     },
    //     {
    //         name: "August",
    //         income: 28000,
    //         expense: 17000,
    //     },
    //     {
    //         name: "September",
    //         income: 31000,
    //         expense: 19000,
    //     },
    //     {
    //         name: "October",
    //         income: 33000,
    //         expense: 4000,
    //     },
    //     {
    //         name: "November",
    //         income: 29000,
    //         expense: 17000,
    //     },
    //     {
    //         name: "December",
    //         income: 27000,
    //         expense: 16000,
    //     }
    // ];



    return (
        <div>
            <ResponsiveContainer width='100%' height={200}>
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="expenseChart"
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
                    <Area type="monotone" dataKey="income" stroke="#17A00E" fill="#C4E7C2" strokeWidth={3} />
                    <Area type="monotone" dataKey="expense" stroke="#F41127" fill="#FCC3C8" strokeWidth={3} />
                    <Area type="monotone" dataKey="profit" stroke="#0DCAF0" fill="#C5F2FC" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PieChartsExpense;
