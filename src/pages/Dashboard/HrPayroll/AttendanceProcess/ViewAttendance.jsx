import React, { useEffect, useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import secureApi from '../../../../api/secureApi';
import api from '../../../../api/api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment/moment';

const ViewAttendance = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [attendanceStatusList, setAttendanceStatusList] = useState('absent');
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState([]);

    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString(); // Adding 1 because months are zero-indexed
    const currentYear = currentDate.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    // getData;
    const getData = () => {
        secureApi.get(`/current-month-attendance?month=${selectedMonth}&year=${selectedYear}`)
            .then(res => {
                // console.log(res)
                setAttendanceList(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // getting attendance List;
    useEffect(() => {
        getData()

    }, [selectedMonth, selectedYear])

    // current month attendance;
    useEffect(() => {
        secureApi.get(`/current-month-attendance?month=${selectedMonth}&year=${selectedYear}`)
            .then(res => {
                // console.log(res)
                setAttendanceList(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])



    // Getting attendance status
    function getAttendanceStatus(name, date) {
        const personData = attendanceList.find(
            (person) => person.name === name && person.date === date
        );
        if (personData) {
            switch (personData.attendance_status) {
                case 'late':
                    return <span className='text-red-500 font-semibold'>L</span>;
                case 'absent':
                    return <span className='text-red-500 font-semibold'>A</span>;
                case 'overlate':
                    return <span className='text-red-500 font-semibold'>OL</span>;
                case 'half':
                    return <span className='text-red-500 font-semibold'>H</span>;
                default:
                    return <span className='text-green-500 font-semibold'>P</span>;
            }
        }
        return null;
    }


    return (
        <div>
            <PageHeading title={`View Attendance`} />
            <div className='flex justify-center'>
                <div className="mt-4">
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
            </div>
            <hr className='my-2' />
            {/* Showing attendance */}

            {
                loading ?
                    <>
                        <p className="text-center text-green-500 my-4">Loading...</p>
                    </>
                    :
                    <>
                        {
                            attendanceList.length > 0 ?
                                <>

                                    <div className='flex justify-center'>
                                        <div className="overflow-x-auto w-[350px] md:w-[500px] lg:w-full">
                                            <table className="table">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        {[...new Set(attendanceList.map((data) => data.date))].map((date, index) => (
                                                            <th key={index}>{moment(date).format('DD')}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}
                                                    {[...new Set(attendanceList.map((person) => person.name))].map((name, nameIndex) => (
                                                        <tr key={nameIndex + 1}>
                                                            <td>{name}</td>
                                                            {[...new Set(attendanceList.map((data) => data.date))].map((date, dateIndex) => (
                                                                <td key={`${name}-${dateIndex}`}>

                                                                    <Link to={`/dashboard/edit-attendance/${name}/${date}`}> {getAttendanceStatus(name, date)}</Link>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <p className="text-center text-red-500 my-4">Information not found..!!</p>
                                </>
                        }
                    </>
            }


            <ToastContainer />

        </div>
    );
}


// Helper function to get attendance status for a specific person and date



export default ViewAttendance;
