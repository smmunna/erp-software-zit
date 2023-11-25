import React, { useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import { ToastContainer, toast } from 'react-toastify';
import useBasicSalaryList from '../../../../hooks/HrPayrollHooks/useBasicSalaryList';
import api from '../../../../api/api';

const AttendanceProcess = () => {
    const [selectedDate, setSelectedDate] = useState(getToday);
    const [attendanceStatusList, setAttendanceStatusList] = useState([]);
    const { basicSalary, error, loading, refetchData } = useBasicSalaryList();


    function getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = (index, status) => {
        const updatedStatusList = [...attendanceStatusList];
        updatedStatusList[index] = status;
        setAttendanceStatusList(updatedStatusList);
    };

    const handleAttendanceSubmit = (e) => {
        e.preventDefault()
        const form = e.target;

        if ((selectedDate) == '') {
            toast.error('Invalid input error....!')
            return
        }

        // attendance data for each user;
        const attendanceData = basicSalary.map((basic, index) => ({
            emp_id: basic.id,
            name: basic.name,
            email: basic.email,
            attendance_status: attendanceStatusList[index] || 'absent', // Default to 'absent' if status is not selected
            date: selectedDate
        }));

        const attendanceInfo = {
            data: attendanceData,
            date: selectedDate
        }

        // console.log(attendanceInfo)

        // add attendance to database;
        api.post('/add-attendance', attendanceInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Attendace saved successfully')
                    form.reset()
                }
                if (res.status == 'exist') {
                    toast.error('Attendance hasbeen already saved...!')
                }
            })
            .catch(err => {
                toast.error(`Something went error: ${err}`)
            })
    }

    return (
        <div>
            <PageHeading title={`Attendance Process`} />

            {
                loading ?
                    <>

                    </>
                    :
                    <>
                        {
                            error ?
                                <>
                                    <p className="text-center my-3 text-red-500">Network error.....!</p>
                                </>
                                :
                                <>
                                    {
                                        basicSalary.length > 0 ?
                                            <>
                                                <form onSubmit={handleAttendanceSubmit}>
                                                    <div className="flex justify-center items-center h-full">
                                                        <input
                                                            type="date"
                                                            className="p-2 border rounded focus:outline-none"
                                                            value={selectedDate}
                                                            onChange={handleDateChange}
                                                        />
                                                    </div>
                                                    <hr className='my-3' />
                                                    <div className='flex justify-center'>
                                                        <div className="overflow-x-auto w-[350px] md:w-full">
                                                            <table className="table">
                                                                {/* head */}
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>Name</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* row 1 */}
                                                                    {
                                                                        basicSalary.map((basic, index) => <React.Fragment key={index + 1}>
                                                                            <tr>
                                                                                <th>{index + 1}</th>
                                                                                <td>{basic?.name}</td>
                                                                                <td>
                                                                                    <select
                                                                                        className="select select-bordered"
                                                                                        value={attendanceStatusList[index] || ''}
                                                                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                                                                    >
                                                                                        <option value="absent">Absent</option>
                                                                                        <option value="present">Present</option>
                                                                                        <option value="late">Late</option>
                                                                                        <option value="overlate">Overlate</option>
                                                                                        <option value="half">Half</option>
                                                                                    </select>
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment>)
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    <div className='flex justify-center my-3'>
                                                        <button className='btn btn-primary w-52'>Submit</button>
                                                    </div>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <p className="text-center my-3 text-red-500">Information not found.....!</p>
                                            </>
                                    }
                                </>
                        }
                    </>
            }

            <ToastContainer />
        </div>
    );
}

export default AttendanceProcess;
