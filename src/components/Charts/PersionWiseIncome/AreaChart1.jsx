import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useTotalMarketingPersonIncome from '../../../hooks/useTotalMarketingPersonIncome';

const AreaChart1 = () => {
    const { totalMarktingPersonIncome } = useTotalMarketingPersonIncome();
    const [data, setData] = useState([]); // Define data in the component's state

    useEffect(() => {
        if (totalMarktingPersonIncome && totalMarktingPersonIncome.sales_by_person_prevMonth) {
            // console.log(totalMarktingPersonIncome.sales_by_person_prevMonth)
            const newData = totalMarktingPersonIncome.sales_by_person_prevMonth.map(item => ({
                name: item.marketing_person,
                sales: item.total_sales,
                profit: item.total_profit,
            }));
            setData(newData); // Update the data state
        }
    }, [totalMarktingPersonIncome]);

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
                    <Bar dataKey="profit" fill="#FFC107" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="sales" fill="#6DA7FF" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AreaChart1;
