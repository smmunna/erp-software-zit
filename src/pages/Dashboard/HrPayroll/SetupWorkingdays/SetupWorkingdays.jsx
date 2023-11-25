import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../../api/api';
import useWorkingdayHooks from '../../../../hooks/HrPayrollHooks/useWorkingdayHooks';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SetupWorkingdays = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const { workingdayInfo, error, loading, refetchData } = useWorkingdayHooks()
    const [id, setId] = useState([])
    // console.log(workingdayInfo)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with selectedMonth and selectedDay, e.g., send to the server
        if ((selectedMonth && selectedDay) == '') {
            toast.error('Invalid input');
            return
        }

        const info = {
            months: selectedMonth,
            days: selectedDay
        }

        // console.log(info)

        // Send to server;
        api.post('/add-days', info)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Working days added successfull');
                    // form.reset()
                    refetchData()
                }
                if (res.status == 'notok') {
                    toast.error('This month already saved, update it..!!')
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = Array.from({ length: 31 }, (_, index) => index + 1); // Assuming maximum 31 days in a month

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    // handle edit basic salary;
    const handleEdit = (id) => {
        setId(id)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const days = form.days.value;
        // console.log(basic_salary, id)
        const info = {
            days
        }

        // Sending to server;
        api.patch(`/edit-days?id=${id}`, info)
            .then(res => {
                if (res.status == 'ok') {
                    const modal = document.getElementById('my_modal_3')
                    if (modal) {
                        modal.close()
                    }
                    toast.success('Days updated successfully');
                    form.reset()
                    refetchData()
                }
                if (res.status == 'notok') {
                    toast.error('Days update error..!')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    // delete info;
    const handleDelete = (id) => {
        // console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Send to server;
                api.delete(`/delete-workingdays?id=${id}`)
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Deleted successfully..')
                            refetchData()
                        }
                        if (res.status == 'notok') {
                            toast.error('Data not deleted successfully..')
                        }
                    })
                    .catch(err => {
                        toast.error('Something went wrong..!')
                    })
            }
        });

    }

    return (
        <div className='min-h-screen'>

            <div className="container mx-auto p-2">
                <h1 className="text-2xl font-bold mb-4 text-center">Assign working day's</h1>
                <hr className='my-2' />
                <form onSubmit={handleSubmit} className='flex justify-center gap-2'>
                    <div className="flex items-center space-x-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                            <select
                                className="select select-bordered w-40"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            >
                                <option value="">Select Month</option>
                                {months.map((month, index) => (
                                    <option key={index} value={index + 1}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                className="input input-bordered w-20"
                                value={selectedDay}
                                onChange={handleDayChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-6">Submit</button>
                </form>
            </div>

            {
                loading ?
                    <>
                        <p className="text-center my-3 text-green-500">Loading....</p>
                    </>
                    :
                    <>
                        {
                            workingdayInfo.length > 0 ?
                                <>
                                    <hr className='my-3' />
                                    <div className='flex justify-center my-4'>

                                        <div className="overflow-x-auto w-[350px] md:w-full lg:w-full">
                                            <table className="table">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Months</th>
                                                        <th>Days</th>
                                                        <th colSpan={2} className='text-center'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}
                                                    {
                                                        workingdayInfo.map((basic, index) => <React.Fragment key={index + 1}>
                                                            <tr>
                                                                <th>{index + 1}</th>
                                                                <td>{months[basic?.months - 1]}</td>
                                                                <td>{basic?.days}</td>
                                                                <td className='flex justify-center gap-2 items-center'>
                                                                    <Link onClick={() => handleEdit(basic.id)}><button onClick={() => document.getElementById('my_modal_3').showModal()}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                                    <Link onClick={() => handleDelete(basic.id)}><button><i className="fa-solid fa-trash" style={{ color: '#ff0000' }}></i></button></Link>
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
                                    <p className="text-center text-red-500 my-3">Information not found...</p>
                                </>
                        }
                    </>
            }


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update working days</h3>
                    <hr className='my-4' />
                    <form onSubmit={handleUpdate}>
                        <input type="number" name='days' min={0} max={31} defaultValue={0} className='w-full input input-bordered my-2' required /> <br />
                        <button className='btn btn-primary'>Update</button>
                    </form>
                </div>
            </dialog>

            <ToastContainer />
        </div>
    );
}

export default SetupWorkingdays;
