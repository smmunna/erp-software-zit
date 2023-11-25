import React, { useEffect, useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading'
import secureApi from '../../../../api/secureApi'
import useWorkingdayHooks from '../../../../hooks/HrPayrollHooks/useWorkingdayHooks';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SalaryProcess = () => {


    const [preData, setPreData] = useState([]);
    const [processingLoader, setProcessingLoader] = useState(false);
    const [loading, setLoading] = useState(true)
    // const [workingdays, setWorkingdays] = useState(0)
    const [halfAttendance, setHalfAttendance] = useState(0.5)
    const [overlateAttendance, setOverlateAttendance] = useState(0.5)
    // const { workingdayInfo, error, loading, refetchData } = useWorkingdayHooks();

    const currentDate1 = new Date();
    const currentYear = currentDate1.getFullYear();
    const [selectedMonth, setSelectedMonth] = useState((currentDate1.getMonth() + 1).toString());
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [currentMonthDays, setCurrentMonthDays] = useState(0);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const getData = () => {
        secureApi.get(`/join-salary-attendance?month=${selectedMonth}&year=${selectedYear}`)
            .then(res => {
                setPreData(res)
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

    // Update the total days when the selectedMonth changes
    useEffect(() => {
        const selectedDate = new Date(currentDate.getFullYear(), parseInt(selectedMonth, 10), 0);
        const totalDays = selectedDate.getDate();
        setCurrentMonthDays(totalDays);
    }, [selectedMonth, currentDate1]);

    const handleSalaryShowdata = (e) => {
        e.preventDefault()

        // Showing the data;

    }

    // getting the working days;
    // useEffect(() => {
    //     if (workingdayInfo) {
    //         workingdayInfo.map((months, index) => {
    //             if (selectedMonth == months?.months) {
    //                 // console.log(months)
    //                 setWorkingdays(months.days)
    //             }
    //         })
    //     }
    // }, [selectedMonth])


    // Calculation Pard start, defining the const variables;
    const currentDate = new Date();
    // const CurrentMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    // const Holidays = CurrentMonthDays - workingdays;
    const Half = halfAttendance;
    const OverLate = overlateAttendance;
    // console.log(CurrentMonthDays, workingdays, Holidays)
    // console.log(workingdays)
    // console.log(Holidays)
    // console.log(Half)
    // console.log(OverLate)



    // End of calculation

    // Start salary processing..
    const handleSalaryProcess = (e) => {
        e.preventDefault();
        const formData = [];

        // Loop through preData and extract input values
        preData.map((info, index) => {
            const advance = parseFloat(e.target.elements[`advance${index}`].value);
            const ta = parseFloat(e.target.elements[`ta${index}`].value);
            const bonus = parseFloat(e.target.elements[`bonus${index}`].value);

            // total Attendance;
            const basicSalary = parseFloat(info?.basic_salary);

            const lateCut = Math.floor((info?.total_late) / 3);
            const totalAttendance = parseFloat(info?.total_present) + parseFloat(info?.total_late) + (Half * parseFloat(info?.total_half)) + (OverLate * parseFloat(info?.total_overlate)) - lateCut;


            // const finalSalary = parseFloat((parseFloat(basicSalary / CurrentMonthDays) * (totalAttendance + Holidays)) - advance + ta + bonus);
            const finalSalary = parseFloat((parseFloat(basicSalary / currentMonthDays) * (totalAttendance + 1)) - advance + ta + bonus);

            // Create an object with employee details and input values
            const data = {
                name: info?.name,
                email: info?.email,
                basic_salary: info?.basic_salary,
                total_attendance: totalAttendance,
                advance: advance || 0,
                ta: ta || 0,
                bonus: bonus || 0,
                final_salary: parseFloat(finalSalary.toFixed(2)),
                month: selectedMonth,
                year: selectedYear
            };

            // Add the data object to the formData array
            formData.push(data);
        });

        // Log the form data to the console
        const processInfo = {
            data: formData,
            month: selectedMonth,
            year: selectedYear
        }

        // console.log(currentMonthDays)
        // console.log(processInfo)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, process it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setProcessingLoader(true)
                api.post('/add-process-salary', processInfo)
                    .then(res => {
                        // console.log(res)
                        if (res.status == 'ok') {
                            toast.success('Salary processed successfully..')
                        }
                        if (res.status == 'exist') {
                            toast.error('Already this months has been processed..!!!')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        setProcessingLoader(false)
                    })
            }
        });


    };
    // End of salary processing..


    return (
        <div>
            <PageHeading title={`Salary Process`} />
            <form onSubmit={handleSalaryShowdata}>
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

                    </select>
                    {/* 
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Search
                    </button> */}
                </div>
            </form>

            <hr className='my-2' />
            {/* Showing data employee wise*/}

            {
                loading ?
                    <>
                        <p className="text-center text-green-500 my-4">Loading...</p>
                    </>
                    :
                    <>
                        {
                            preData.length > 0 ?
                                <>
                                    <form onSubmit={handleSalaryProcess}>
                                        <div className='flex justify-center my-2 '>
                                            <div className="overflow-x-auto w-[350px] md:w-full">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Name</th>
                                                            {/* <th>Basic Salary</th> */}
                                                            <th>Total Attendance</th>
                                                            <th>Advance</th>
                                                            <th>TA</th>
                                                            <th>Bonus</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* row 1 */}

                                                        {
                                                            preData.map((info, index) => <React.Fragment key={index + 1}>
                                                                <tr>
                                                                    <th>{index + 1}</th>
                                                                    <td>{info?.name}</td>
                                                                    {/* <td>{info?.basic_salary}</td> */}
                                                                    <td>{parseFloat(info?.total_present) + parseFloat(info?.total_late) + (Half * parseFloat(info?.total_half)) + (OverLate * parseFloat(info?.total_overlate)) - Math.floor((parseFloat(info?.total_late) / 3))}</td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            name={`advance${index}`}
                                                                            defaultValue={0}
                                                                            className='input input-bordered'
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            name={`ta${index}`}
                                                                            defaultValue={0}
                                                                            className='input input-bordered'
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            name={`bonus${index}`}
                                                                            defaultValue={0}
                                                                            className='input input-bordered'
                                                                        />
                                                                    </td>

                                                                </tr>
                                                            </React.Fragment>)
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <hr className='my-2' />
                                        <div className='flex justify-center my-2'>
                                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{
                                                processingLoader ? 'Processing....' : 'Submit'
                                            }</button>
                                        </div>

                                    </form>
                                </>
                                :
                                <>
                                    <p className="text-center text-red-500 my-2">No infromation found</p>
                                </>
                        }
                    </>
            }

            <ToastContainer />

        </div>
    );
}

export default SalaryProcess;

