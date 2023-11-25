import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/Dashboard/PageHeading/PageHeading';
import DashCard from '../../../components/Dashboard/DashCards/DashCard';
import useTotalIncomeExpense from '../../../hooks/useTotalIncomeExpense';
import useTotalMarketingPersonIncome from '../../../hooks/useTotalMarketingPersonIncome';
import DashHomeMIncome from '../../../components/Dashboard/DashHomeMIncome/DashHomeMIncome';
import useTotalExpense from '../../../hooks/useTotalExpense';
import ServiceWiseExpense from '../ServiceWiseExpense/ServiceWiseExpense';
import AddIncome from '../AddIncome/AddIncome';
import useUserAuthHook from '../../../hooks/useUserAuthHook';
import CompanyProgress from '../CompanyProgress/CompanyProgress';
import DashHomeAIncome from '../../../components/Dashboard/DashHomeMIncome/DashHomeAIncome';
import Profile from '../HrPayroll/User/Profile';

const DashboardHome = () => {
    const [currentMonthMPI, setCurrentMonthMPI] = useState([]);
    const [currentYearMPI, setCurrentYearMPI] = useState([]);
    const [prevMonthMPI, setPrevMonthMPI] = useState([]);
    const [prevYearMPI, setPrevYearMPI] = useState([]);

    const [currentMonthAPI, setCurrentMonthAPI] = useState([]);
    const [currentYearAPI, setCurrentYearAPI] = useState([]);
    const [prevMonthAPI, setPrevMonthAPI] = useState([]);
    const [prevYearAPI, setPrevYearAPI] = useState([]);

    const [month, setMonth] = useState([]);
    const [prevmonth, setPrevMonth] = useState([]);
    const [year, setYear] = useState(0);

    const { totalIncomeExpense, loading, error } = useTotalIncomeExpense();
    const { totalMarktingPersonIncome } = useTotalMarketingPersonIncome();
    const { totalExpense } = useTotalExpense();

    const { user, userLoading } = useUserAuthHook();

    // console.log(totalExpense)
    // console.log(totalExpense)
    // console.log(sales_by_person_currentMonth)
    // console.log(totalMarktingPersonIncome)

    useEffect(() => {
        if (totalMarktingPersonIncome) {
            const currentMonthData = totalMarktingPersonIncome.sales_by_person_currentMonth;
            const currentYearhData = totalMarktingPersonIncome.sales_by_person_currentYear;
            const prevMonthData = totalMarktingPersonIncome.sales_by_person_prevMonth;
            const prevYearhData = totalMarktingPersonIncome.sales_by_person_prevYear;

            const currentMonthAData = totalMarktingPersonIncome.sales_by_assigned_person_currentMonth;
            const currentYearhAData = totalMarktingPersonIncome.sales_by_assigned_person_currentYear;
            const prevMonthAData = totalMarktingPersonIncome.sales_by_assigned_person_prevMonth;
            const prevYearhAData = totalMarktingPersonIncome.sales_by_assigned_person_prevYear;




            const month = totalMarktingPersonIncome.current_Month;
            const year = totalMarktingPersonIncome.current_year;
            setYear(year);

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const currentMonthName = monthNames[month - 1];
            setMonth(currentMonthName)

            const previousMonthNumber = (month - 2 + 12) % 12;
            const previousMonthName = monthNames[previousMonthNumber];
            setPrevMonth(previousMonthName)

            // Check if currentMonthData;
            if (currentMonthData) {
                setCurrentMonthMPI(currentMonthData)
                setCurrentYearMPI(currentYearhData)
                setPrevMonthMPI(prevMonthData)
                setPrevYearMPI(prevYearhData)

                // setPrevMonthAPI(prevMonthAData)
                setCurrentMonthAPI(currentMonthAData)
                setPrevMonthAPI(prevMonthAData)
                setCurrentYearAPI(currentYearhAData)
                setPrevYearAPI(prevYearhAData)

            }
        }
    }, [totalMarktingPersonIncome]);



    return (
        <div className='min-h-screen dashbg'>

            {/* Subadmin view dashboard */}

            {
                userLoading ?
                    <>

                        {/* <h3 className='text-center py-5'>Loading....</h3> */}

                    </>
                    :
                    <>

                        {/* Summary */}

                        {
                            user?.roles == 'admin' ?
                                <>

                                    <PageHeading title={`Summary`} />
                                    {/* Admin view dashboard */}
                                    <div>
                                        {
                                            loading ? <>
                                                {/* <Spinner /> */}
                                            </>
                                                :
                                                <>

                                                    <>
                                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                                                            <div>
                                                                <DashCard
                                                                    title={`Current Month`}
                                                                    paid={totalIncomeExpense.total_paid_currentMonth}
                                                                    due={totalIncomeExpense.total_due_currentMonth}
                                                                    profit={totalIncomeExpense.total_profit_currentMonth}
                                                                    expense={totalExpense.total_expense_amount_currentMonth}
                                                                    bgcolor={`#15CA20`}
                                                                    icon={<i className="fa-solid fa-wallet rounded-lg" style={{ color: '#19d016', backgroundColor: 'white', padding: '10px' }}></i>}
                                                                />
                                                            </div>
                                                            <div>
                                                                <DashCard
                                                                    title={`Previous Months`}
                                                                    paid={totalIncomeExpense.total_paid_prevMonth}
                                                                    due={totalIncomeExpense.total_due_prevMonth}
                                                                    profit={totalIncomeExpense.total_profit_prevMonth}
                                                                    expense={totalExpense.toal_expense_amount_prevMonth}
                                                                    bgcolor={`#0F93FF`}
                                                                    icon={<i className="fa-solid fa-cart-shopping rounded-lg" style={{ color: '#0F93FF', backgroundColor: 'white', padding: '10px' }}></i>}
                                                                />
                                                            </div>

                                                            <div>
                                                                <DashCard
                                                                    title={`Current Year ${totalIncomeExpense.current_year}`}
                                                                    paid={totalIncomeExpense.total_paid_currentYear}
                                                                    due={totalIncomeExpense.total_due_currentYear}
                                                                    profit={totalIncomeExpense.total_profit_currentYear}
                                                                    expense={totalExpense.toal_expense_amount_currentYear}
                                                                    bgcolor={`#FD3550`}
                                                                    icon={<i className="fa-solid fa-glasses rounded-lg" style={{ color: '#ec0909', backgroundColor: 'white', padding: '10px' }}></i>}
                                                                />

                                                            </div>

                                                            <div>
                                                                <DashCard title={`Prev Year ${totalIncomeExpense.prev_year}`}
                                                                    paid={totalIncomeExpense.total_paid_prevYear}
                                                                    due={totalIncomeExpense.total_due_prevYear}
                                                                    profit={totalIncomeExpense.total_profit_prevYear}
                                                                    expense={totalExpense.toal_expense_amount_prevYear}
                                                                    bgcolor={`#FFC107`}
                                                                    icon={<i className="fa-solid fa-chart-line rounded-lg" style={{ color: '#000000', backgroundColor: 'white', padding: '10px' }}></i>}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Marketing Person Individual Income -> Paid, Due, Profit */}
                                                        <PageHeading title={`-- Marketing Person --`} />

                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in current Month (${month})`} />
                                                                    <DashHomeMIncome currentMonthMPI={currentMonthMPI} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Last Month (${prevmonth})`} />
                                                                    <DashHomeMIncome currentMonthMPI={prevMonthMPI} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Income for current year & prev year */}

                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Current Year (${year})`} />
                                                                    <DashHomeMIncome currentMonthMPI={currentYearMPI} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Last Year (${year - 1})`} />
                                                                    <DashHomeMIncome currentMonthMPI={prevYearMPI} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <PageHeading title={`-- Assigned Person --`} />
                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in current Month (${month})`} />
                                                                    <DashHomeAIncome currentMonthMPI={currentMonthAPI} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Last Month (${prevmonth})`} />
                                                                    <DashHomeAIncome currentMonthMPI={prevMonthAPI} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Income for current year & prev year */}

                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Current Year (${year})`} />
                                                                    <DashHomeAIncome currentMonthMPI={currentYearAPI} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='p-5'>
                                                                    <PageHeading title={`Income in Last Year (${year - 1})`} />
                                                                    <DashHomeAIncome currentMonthMPI={prevYearAPI} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Service wise Expense Details */}
                                                        <div className='my-4'>
                                                            <ServiceWiseExpense
                                                                currme={totalExpense.total_expense_amount_currentMonth}
                                                                prevme={totalExpense.toal_expense_amount_prevMonth}
                                                                currye={totalExpense.toal_expense_amount_currentYear}
                                                                prevye={totalExpense.toal_expense_amount_prevYear}
                                                            />
                                                        </div>




                                                    </>

                                                </>
                                        }
                                    </div>

                                    <CompanyProgress />

                                </>
                                :
                                <>
                                    {/* Subadmin activity */}

                                    {
                                        user.roles == 'subadmin' ?
                                            <>
                                                <AddIncome />
                                            </>

                                            :

                                            <>
                                                {/* Here will be show general user activity */}
                                                {
                                                    user.roles == 'user' ?
                                                    <>
                                                        <Profile/>
                                                    </>
                                                    :
                                                    <>
                                                        <h3 className="text-center my-4">Something error</h3>
                                                    </>
                                                }
                                            </>
                                    }
                                </>
                        }

                    </>
            }










        </div>
    );
}

export default DashboardHome;
