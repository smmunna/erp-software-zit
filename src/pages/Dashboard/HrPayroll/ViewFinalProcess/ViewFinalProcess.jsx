import React, { useEffect, useState } from 'react';
import secureApi from '../../../../api/secureApi';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import { Link } from 'react-router-dom';

const ViewFinalProcess = () => {
    const [show, setShow] = useState(false);
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString(); // Adding 1 because months are zero-indexed
    const currentYear = currentDate.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const getData = () => {
        secureApi.get(`/view-all-processed-salary?month=${selectedMonth}&year=${selectedYear}`)
            .then(res => {
                setSalaries(res)
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getData()
    }, [selectedMonth, selectedYear])

    const handleSalaryShowdata = (e) => {
        e.preventDefault()

        // Showing the data;

    }

    return (
        <div className='min-h-screen'>

            <PageHeading title={`Processed Salary List`} />

            <div>
                <form>
                    <div className="flex mt-3 space-x-4 justify-center items-center">
                        {/* Dropdown for 12 months */}
                        <select
                            className="block appearance-none w-32 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        {/* Dropdown for current year */}
                        <select
                            className="block appearance-none w-32 bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value={currentYear}>
                                {currentYear}
                            </option>
                            <option value={currentYear - 1}>
                                {currentYear - 1}
                            </option>

                        </select>

                    </div>
                </form>

            </div>
            <hr className='my-2' />

            {
                loading ?
                    <>
                        <p className="text-center text-green-500 my-4">Loading...</p>
                    </>
                    :
                    <>
                        {
                            salaries.length > 0 ?
                                <>
                                    <div className='flex justify-center my-2'>
                                        <div className="overflow-x-auto w-[350px] md:w-full">
                                            <table className="table">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Name</th>
                                                        {/* <th>Email</th> */}
                                                        <th>Basic Salary</th>
                                                        <th>Advance</th>
                                                        <th>Ta</th>
                                                        <th>Bonus</th>
                                                        <th>Total Attendance</th>
                                                        <th>Processed Salary</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}

                                                    {
                                                        salaries.map((info, index) => <React.Fragment key={index + 1}>
                                                            <tr>
                                                                <th>{index + 1}</th>
                                                                <td>{info?.name}</td>
                                                                {/* <td>{info?.email}</td> */}
                                                                <td>{info?.basic_salary}</td>
                                                                <td>{info?.advance}</td>
                                                                <td>{info?.ta}</td>
                                                                <td>{info?.bonus}</td>
                                                                <td>{info?.total_attendance}</td>
                                                                <td>{info?.final_salary}</td>
                                                                <td>
                                                                    <Link to={`/dashboard/edit-final-salary/${info?.id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <p className="text-center text-red-500">No information found...</p>
                                </>
                        }
                    </>
            }



        </div>
    );
}

export default ViewFinalProcess;
