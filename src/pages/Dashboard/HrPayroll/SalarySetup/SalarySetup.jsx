import React, { useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import useSalarySetupHooks from '../../../../hooks/HrPayrollHooks/useSalarySetupHooks';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useBasicSalaryList from '../../../../hooks/HrPayrollHooks/useBasicSalaryList';
import Swal from 'sweetalert2';

const SalarySetup = () => {
    const { salarySetupInfo } = useSalarySetupHooks();
    const { basicSalary, error, loading, refetchData } = useBasicSalaryList();
    const [selectedInfo, setSelectedInfo] = useState(); // State to store the selected info
    const [id, setId] = useState([]);

    // console.log(basicSalary)

    const formSubmit = (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const selectedValue = JSON.parse(selectedInfo);
            const basic_salary = form.basic_salary.value;
            selectedValue['basic_salary'] = basic_salary;
            // console.log(selectedValue); // Log the selected value when the form is submitted

            // Send to server;
            api.post('/setup-salary', selectedValue)
                .then(res => {
                    if (res.status == 'ok') {
                        toast.success('Salary setup successfull');
                        form.reset()
                        refetchData()
                    }
                    if (res.status == 'exist') {
                        toast.error('Salary for this employee already exist')
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        } catch (error) {
            toast.error('Set the employee properly')
        }


    };

    // handle edit basic salary;
    const handleEdit = (id) => {
        setId(id)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const basic_salary = form.basic_salary.value;
        // console.log(basic_salary, id)
        const info = {
            basic_salary
        }

        // Sending to server;
        api.patch(`/edit-salary?id=${id}`, info)
            .then(res => {
                if (res.status == 'ok') {
                    const modal = document.getElementById('my_modal_3')
                    if (modal) {
                        modal.close()
                    }
                    toast.success('Salary updated successfully');
                    form.reset()
                    refetchData()
                }
                if (res.status == 'notok') {
                    toast.error('Salary update error..!')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // delete basic_salary info;
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
                api.delete(`/delete-salary?id=${id}`)
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
            <PageHeading title={`Salary Setup`} />
            <form onSubmit={formSubmit} >
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                        {/* Dropdown to select info */}
                        <select
                            className="select select-bordered w-full"
                            value={selectedInfo} // Set the selected value to the state
                            onChange={(e) => setSelectedInfo(e.target.value)} // Update the selectedInfo state when the dropdown value changes
                        >
                            <option value="">Choose an Employee</option>
                            {/* Map through salarySetupInfo and create options with names */}
                            {salarySetupInfo.map((info, index) => (
                                <option key={index} value={JSON.stringify({ name: info?.name, email: info?.email })}> {info.name} </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-2'>
                        <input type="number" name='basic_salary' className='input input-bordered w-full' placeholder='Enter basic salary' required />
                    </div>
                    <button type="submit" className='btn btn-primary'>Submit</button> {/* Submit button */}
                </div>
            </form>

            <hr className='my-2' />

            {/* Showing the table functionality here */}
            {
                loading ?
                    <>
                        <p className="text-center my-3 text-green-500">Loading....</p>
                    </>
                    :
                    <>
                        {
                            error ?
                                <>
                                    <p className="text-center my-3 text-red-500">Network Error..</p>
                                </>
                                :
                                <>
                                    {
                                        basicSalary.length > 0 ?
                                            <>
                                                <div className='flex justify-center my-4'>

                                                    <div className="overflow-x-auto w-[350px] md:w-full lg:w-full">
                                                        <table className="table">
                                                            {/* head */}
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                    <th>Basic Salary</th>
                                                                    <th colSpan={2} className='text-center'>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* row 1 */}
                                                                {
                                                                    basicSalary.map((basic, index) => <React.Fragment key={index + 1}>
                                                                        <tr>
                                                                            <th>{index + 1}</th>
                                                                            <td>{basic?.name}</td>
                                                                            <td>{basic?.email}</td>
                                                                            <td>{parseFloat(basic?.basic_salary).toLocaleString()}</td>
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
                    </>
            }


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update salary</h3>
                    <hr className='my-4' />
                    <form onSubmit={handleUpdate}>
                        <input type="number" name='basic_salary' min={0} defaultValue={0} className='w-full input input-bordered my-2' /> <br />
                        <button className='btn btn-primary'>Update</button>
                    </form>
                </div>
            </dialog>



            <ToastContainer />
        </div>
    );
};

export default SalarySetup;
