import React from 'react';

const DashHomeAIncome = ({ currentMonthMPI }) => {
    // console.log(currentMonthMPI)
    return (
        <div>
            <div>

                <div className="overflow-auto rounded-lg shadow">
                    <table className="w-full">
                        <thead className=" border-b-2 bg-white">
                            <tr aria-rowspan={2}>
                                {/* <th className="w-12 p-3 text-sm font-semibold tracking-wide text-left">SL.</th> */}
                                <th className="w-12 p-3 text-sm font-bold tracking-wide text-left">Name</th>
                                <th className="w-24 p-3 text-sm font-bold tracking-wide text-left">Collect</th>
                                <th className="w-16 p-3 text-sm font-bold tracking-wide text-left">Profit</th>
                                <th className="w-16 p-3 text-sm font-bold tracking-wide text-left">Due</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {
                                currentMonthMPI.map((income, index) => <React.Fragment key={index + 1}>
                                    <tr className="bg-white">
                                        {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">#{index + 1}</a>
                                        </td> */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income?.assigned_person}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{(income?.total_sales).toLocaleString()}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{(income?.total_profit).toLocaleString()}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income?.total_due > 0 ? <span className='text-red-500'>{(income.total_due).toLocaleString()}</span> : <span>{income.total_due}</span>}</td>
                                    </tr>
                                </React.Fragment>)
                            }
                        </tbody>
                    </table>
                </div>



                {/* For Mobile devices */}
                {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-4  lg:hidden space-y-3">
                    {
                        currentMonthMPI.map((income, index) => <React.Fragment key={index + 1}>
                            <div className=" bg-slate-200 space-y-3 mt-3 p-4 rounded-lg shadow">
                                <div className="flex items-center space-x-2 text-sm">
                                    <div>
                                        <a href="#" className="text-blue-500 font-bold hover:underline">#{index + 1}</a>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <span className='font-bold'>Name:</span> {income.marketing_person}
                                </div>
                                <div className="text-sm text-gray-700">
                                    <span className='font-bold'>Total Collect:</span> {income.total_sales}
                                </div>
                                <div className="text-sm text-gray-700">
                                    <span className='font-bold'>Total Profit:</span> {income.total_profit}
                                </div>
                                <div className="text-sm text-gray-700">
                                    <span className='font-bold'>Total Due:</span> {income.total_due > 0 ? <span className='text-red-500'>{income.total_due}</span> : <span>{income.total_due}</span>}
                                </div>
                            </div>
                        </React.Fragment>)
                    }
                </div> */}


            </div>
        </div>
    );
}

export default DashHomeAIncome;
