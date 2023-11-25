import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/Dashboard/PageHeading/PageHeading';
import PieCharts from '../../../components/Charts/PieCharts/PieCharts';
import useTotalIncomeExpense from '../../../hooks/useTotalIncomeExpense';
import Spinner from '../../../components/Spinner/Spinner';
import PieChartsExpense from '../../../components/Charts/PieCharts/PieChartsExpense';
import AreaChart from '../../../components/Charts/PersionWiseIncome/AreaChart';
import AreaChart1 from '../../../components/Charts/PersionWiseIncome/AreaChart1';
import AreaChart2 from '../../../components/Charts/PersionWiseIncome/AreaChart2';
import AreaChart3 from '../../../components/Charts/PersionWiseIncome/AreaChart3';
import useTotalMarketingPersonIncome from '../../../hooks/useTotalMarketingPersonIncome';
import useTotalExpense from '../../../hooks/useTotalExpense';

const CompanyProgress = () => {
    const [topservice, setTopService] = useState([]);
    const [topseller, setTopSeller] = useState([]);
    const [prevyTopSeller, setPrevYTopSeller] = useState([]);
    const [curmTopSeller, setCurmTopSeller] = useState([]);
    const [prevmTopSeller, setPrevmTopSeller] = useState([]);
    const [last10Income, setLast10Income] = useState([]);
    const [last10Expense, setLast10Expense] = useState([]);

    const { totalIncomeExpense, loading, error } = useTotalIncomeExpense();
    const { totalMarktingPersonIncome } = useTotalMarketingPersonIncome();
    const { totalExpense } = useTotalExpense();

    // console.log(totalMarktingPersonIncome)
    // console.log(totalIncomeExpense)
    // console.log(totalIncomeExpense)
    // console.log(totalExpense)

    const date = new Date();
    const year = date.getFullYear();

    useEffect(() => {
        if (totalMarktingPersonIncome) {
            setTopService(totalMarktingPersonIncome?.top_services)
            setTopSeller(totalMarktingPersonIncome.top_seller)
            setPrevYTopSeller(totalMarktingPersonIncome.top_sellerPrevYear)
            setCurmTopSeller(totalMarktingPersonIncome.top_sellerCurrMonth)
            setPrevmTopSeller(totalMarktingPersonIncome.top_sellerPrevMonth)
            setLast10Income(totalMarktingPersonIncome.last10Income)
            setLast10Expense(totalMarktingPersonIncome.last10Expense)
        }
    }, [totalMarktingPersonIncome, loading])

    return (
        <div>
            <PageHeading title={`Company's Progress`} />
            <div className='min-h-screen dashbg'>

                {
                    loading ?
                        <>
                            {/* <Spinner /> */}
                        </>
                        :
                        <>
                            {
                                totalIncomeExpense ?
                                    <>

                                        <div className='grid grid-cols-1 lg:grid-cols-1 gap-3 px-5'>
                                            {/* Income Profits */}
                                            <div>
                                                <div className='py-2'>
                                                    <h3 className='text-xl font-bold'>Yearly Progress</h3>
                                                    <hr />
                                                </div>
                                                <PieCharts
                                                    curyear={totalIncomeExpense.total_paid_currentYear}
                                                    prevyear={totalIncomeExpense.total_paid_prevYear}
                                                    prev1year={totalIncomeExpense.total_paid_prev1Year}
                                                    prev2year={totalIncomeExpense.total_paid_prev2Year}
                                                    prev3year={totalIncomeExpense.total_paid_prev3Year}
                                                    prev4year={totalIncomeExpense.total_paid_prev4Year}
                                                    prev5year={totalIncomeExpense.total_paid_prev5Year}
                                                    prev6year={totalIncomeExpense.total_paid_prev6Year}
                                                    prev7year={totalIncomeExpense.total_paid_prev7Year}
                                                    prev8year={totalIncomeExpense.total_paid_prev8Year}
                                                    prev9year={totalIncomeExpense.total_paid_prev9Year}

                                                    curyearp={totalIncomeExpense.total_profit_currentYear}
                                                    prevyearp={totalIncomeExpense.total_profit_prevYear}
                                                    prev1yearp={totalIncomeExpense.total_profit_prev1Year}
                                                    prev2yearp={totalIncomeExpense.total_profit_prev2Year}
                                                    prev3yearp={totalIncomeExpense.total_profit_prev3Year}
                                                    prev4yearp={totalIncomeExpense.total_profit_prev4Year}
                                                    prev5yearp={totalIncomeExpense.total_profit_prev5Year}
                                                    prev6yearp={totalIncomeExpense.total_profit_prev6Year}
                                                    prev7yearp={totalIncomeExpense.total_profit_prev7Year}
                                                    prev8yearp={totalIncomeExpense.total_profit_prev8Year}
                                                    prev9yearp={totalIncomeExpense.total_profit_prev9Year}

                                                    curyeare={totalExpense.toal_expense_amount_currentYear}
                                                    prevyeare={totalExpense.toal_expense_amount_prevYear}
                                                    prev1yeare={totalExpense.toal_expense_amount_prev1Year}
                                                    prev2yeare={totalExpense.toal_expense_amount_prev2Year}
                                                    prev3yeare={totalExpense.toal_expense_amount_prev3Year}
                                                    prev4yeare={totalExpense.toal_expense_amount_prev4Year}
                                                    prev5yeare={totalExpense.toal_expense_amount_prev5Year}
                                                    prev6yeare={totalExpense.toal_expense_amount_prev6Year}
                                                    prev7yeare={totalExpense.toal_expense_amount_prev7Year}
                                                    prev8yeare={totalExpense.toal_expense_amount_prev8Year}
                                                    prev9yeare={totalExpense.toal_expense_amount_prev9Year}
                                                />

                                            </div>

                                            {/* Income Profits */}
                                            <div>
                                                <div className='py-2'>
                                                    <h3 className='text-xl font-bold'>Monthly Progress {year}</h3>
                                                    <hr />
                                                </div>
                                                <PieChartsExpense
                                                    monthlydata={totalIncomeExpense.monthly_paid_amounts}
                                                />
                                            </div>

                                            {/* Person wise income */}
                                        </div>



                                        <hr className='py-4' />

                                        {/* Chart Person wise income expense */}
                                        <div>
                                            <div className='py-2'>
                                                <h3 className='text-xl font-bold text-center'>Person wise Income & Profit</h3>
                                                <hr />
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                                <div>
                                                    <div className='py-2'>
                                                        <h3 className='font-bold'>Current Month</h3>
                                                        <hr />
                                                    </div>
                                                    <AreaChart />
                                                </div>
                                                <div>
                                                    <div className='py-2'>
                                                        <h3 className='font-bold'>Previous Month</h3>
                                                        <hr />
                                                    </div>
                                                    <AreaChart1 />
                                                </div>
                                                <div>
                                                    <div className='py-2'>
                                                        <h3 className='font-bold'>Current Year</h3>
                                                        <hr />
                                                    </div>
                                                    <AreaChart2 />
                                                </div>
                                                <div>
                                                    <div className='py-2'>
                                                        <h3 className='font-bold'>Previous Year</h3>
                                                        <hr />
                                                    </div>
                                                    <AreaChart3 />
                                                </div>

                                            </div>
                                        </div>




                                        <div className='px-5 md:px-10 pb-5'>
                                            <div className='py-2'>
                                                <h3 className='text-xl font-bold text-center'>Employee Involvement</h3>
                                                <hr />
                                            </div>



                                            {/* Last 10 Income & Expenses */}
                                            <div>


                                                {/* Last 10 Incomes */}
                                                <div>
                                                    <h3 className='font-semibold py-4'>Last 10 Incomes</h3>
                                                    <hr />

                                                    <div>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">

                                                                    <thead>
                                                                        <tr className='text-black font-bold bg-white'>
                                                                            <th>SL</th>
                                                                            <th>Seller</th>
                                                                            <th>Service</th>
                                                                            <th>Value</th>
                                                                            <th>Paid</th>
                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            last10Income?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className='bg-white'>
                                                                                    <th>{index + 1}</th>
                                                                                    <td> {services?.marketing_person}</td>
                                                                                    <td>{(services?.service)}</td>
                                                                                    <td>{parseFloat((services?.project_value)).toLocaleString()}</td>
                                                                                    <td>{(services?.paid).toLocaleString()}</td>
                                                                                    <td>{(services?.date)}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                {/* Last 10 Expenses */}
                                                <div>
                                                    <h3 className='font-semibold py-4'>Last 10 Expenses</h3>
                                                    <hr />

                                                    <div>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] lg:w-full overflow-x-auto">
                                                                <table className="table">

                                                                    <thead>
                                                                        <tr className='text-black font-bold bg-white'>
                                                                            <th>SL</th>
                                                                            <th>Reason</th>
                                                                            <th>Who</th>
                                                                            <th>Amount</th>
                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            last10Expense?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className='bg-white'>
                                                                                    <th>{index + 1}</th>
                                                                                    <td> {services?.reason}</td>
                                                                                    <td>{(services?.who)}</td>
                                                                                    <td>{parseFloat((services?.amount)).toLocaleString()}</td>
                                                                                    <td>{(services?.date)}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>



                                            <hr className='my-4' />



                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                                                {/* Current Month */}
                                                <div>
                                                    <h3 className='font-semibold'>Top Seller Current Month</h3>
                                                    <hr />

                                                    <div className='p-4 bg-white shadow'>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr className='text-black font-bold'>
                                                                            <th>SL</th>
                                                                            <th>Seller</th>
                                                                            <th>Total Sales (amt)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            curmTopSeller?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className=''>
                                                                                    <th>{index + 1}</th>
                                                                                    <td> {services?.marketing_person}</td>
                                                                                    <td>{(services?.total_sales).toLocaleString()}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                {/* Previous Month */}
                                                <div>
                                                    <h3 className='font-semibold'>Top Seller Previous Month</h3>
                                                    <hr />

                                                    <div className='p-4 bg-white shadow'>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr className='text-black'>
                                                                            <th>Seller</th>
                                                                            <th>Total Sales (amt)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            prevmTopSeller?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className=''>
                                                                                    <td> {services?.marketing_person}</td>
                                                                                    <td>{(services?.total_sales).toLocaleString()}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>



                                                {/* Current year */}
                                                <div>
                                                    <h3 className='font-semibold'>Top Seller {year}</h3>
                                                    <hr />

                                                    <div className='p-4 bg-white shadow'>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr className='text-black font-bold'>
                                                                            <th>Seller</th>
                                                                            <th>Total Sales (amt)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            topseller?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className=''>
                                                                                    <td> {services?.marketing_person}</td>
                                                                                    <td>{(services?.total_sales).toLocaleString()}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                {/* Previous year */}
                                                <div>
                                                    <h3 className='font-semibold'>Top Seller {year - 1}</h3>
                                                    <hr />

                                                    <div className='p-4 bg-white shadow'>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr className='text-black font-bold'>
                                                                            <th>Seller</th>
                                                                            <th>Total Sales (amt)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            prevyTopSeller?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className=''>
                                                                                    <td> {services?.marketing_person}</td>
                                                                                    <td>{(services?.total_sales).toLocaleString()}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                {/* Top Services current year */}
                                                <div>
                                                    <h3 className='font-semibold'>Top Services {year}</h3>
                                                    <hr />
                                                    <div className='p-4 bg-white shadow'>
                                                        <div className='flex justify-center'>
                                                            <div className="w-[350px] md:w-[500px] lg:w-full overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr className='font-bold text-black'>
                                                                            <th>Services</th>
                                                                            <th>Total Sales (pc)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>


                                                                        {
                                                                            topservice?.map((services, index) => <React.Fragment key={index + 1}>
                                                                                <tr className=''>
                                                                                    <td> {services?.service}</td>
                                                                                    <td>{(services?.total_sales).toLocaleString()}</td>
                                                                                </tr>
                                                                            </React.Fragment>)
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>



                                    </>
                                    :
                                    <>
                                        <h3 className='text-red-500 text-center py-5'>Data not found</h3>
                                    </>
                            }
                        </>
                }




            </div>

        </div>
    );
}

export default CompanyProgress;
