import React, { useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';

const EditAttendance = () => {
    const { name, date } = useParams()
    const [attendance, setAttendance] = useState('absent');
    const navigate = useNavigate();

    const handleSubmitAttendance = () => {
        // console.log(name, date, attendance)
        const attendanceData = {
            attendance_status: attendance
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.patch(`/edit-attendance?name=${name}&date=${date}`, attendanceData)
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Attendance updated')
                            setTimeout(() => {
                                navigate('/dashboard/view-attendance')
                            }, 1200)
                        }
                        else {
                            toast.error('Something went wrong..')
                        }
                    })
                    .catch(error => {
                        toast.error(error)
                    })
            }
        });
    }

    return (
        <div>
            <PageHeading title={`Edit Attendance`} />

            <div className='flex justify-center py-3'>
                <div>
                    <select
                        className="select select-bordered w-full md:w-96"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                    >
                        <option value="absent">Absent</option>
                        <option value="present">Present</option>
                        <option value="late">Late</option>
                        <option value="overlate">Overlate</option>
                        <option value="half">Half</option>
                    </select>
                    <div className='mt-2'>
                        <button className='btn btn-primary' onClick={handleSubmitAttendance}>Update</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditAttendance;
