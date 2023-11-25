import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/Dashboard/PageHeading/PageHeading';
import api from '../../../api/api';
import secureApi from '../../../api/secureApi';

const ServiceWiseExpense = ({ currme, prevme, currye, prevye }) => {
    const [serviceExpense, setServiceExpense] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        secureApi.get('/expense-service')
            .then(res => {
                if (res) {
                    setServiceExpense(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <PageHeading title={`Service wise Expense `} />


            {
                loading ?
                    <>
                        <h3 className='text-center py-4'>Loading......</h3>
                    </>
                    :
                    <>
                        {
                            serviceExpense.length == 0 ?
                                <>
                                    <h3 className='text-center py-4'>Data not found......</h3>
                                </>
                                :
                                <>

                                    <div className='flex justify-center'>
                                        <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                            <table className="table">
                                                {/* head */}
                                                <thead>
                                                    <tr className='font-bold text-black bg-white'>
                                                        {/* <th>SL</th> */}
                                                        <th>Reason</th>
                                                        <th>Current Month</th>
                                                        <th>Previous Month</th>
                                                        <th>Current Year</th>
                                                        <th>Previous Year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}

                                                    {
                                                        serviceExpense.map((ser, index) => <React.Fragment key={index}>
                                                            <tr className='bg-white'>
                                                                {/* <th>{index + 1}</th> */}
                                                                <td>{ser?.service}</td>
                                                                <td>{(ser?.total_expense_amount_currentMonth).toLocaleString()}</td>
                                                                <td>{(ser?.total_expense_amount_prevMonth).toLocaleString()}</td>
                                                                <td>{(ser?.total_expense_amount_currentYear).toLocaleString()}</td>
                                                                <td>{(ser?.total_expense_amount_prevYear).toLocaleString()}</td>
                                                            </tr>
                                                        </React.Fragment>)
                                                    }



                                                </tbody>
                                                <tfoot>
                                                    <tr className='bg-yellow-300 text-black'>
                                                        <td>Total</td>
                                                        <td>{(currme).toLocaleString()}</td>
                                                        <td>{(prevme).toLocaleString()}</td>
                                                        <td>{(currye).toLocaleString()}</td>
                                                        <td>{(prevye).toLocaleString()}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                </>
                        }
                    </>
            }





        </div>
    );
}

export default ServiceWiseExpense;
