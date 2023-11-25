import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDueList from '../../../../hooks/useDueList';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';

const AddDueProfit = () => {
    const [oneDue, setOnedue] = useState([]);
    const { id } = useParams();
    const { dueList, error, loading, refetchData } = useDueList();
    const navigate = useNavigate();

    useEffect(() => {
        const dueOne = dueList.find((due) => due.id == id);
        if (dueOne) {
            // setOnedue(dueOne)
            setOnedue(dueOne)
        }
    }, [dueList, id])


    const handleUpdateDues = (e) => {
        e.preventDefault();
        const form = e.target;
        // const current_due = form.current_due.value;
        const current_profit = form.current_profit.value;
        // const add_due = form.add_due.value;
        const add_profit = form.add_profit.value;
        // const current_paid = form.current_paid.value;

        // const totalDue = parseFloat(current_due) + parseFloat(add_due);
        const totalProfit = parseFloat(current_profit) + parseFloat(add_profit);
        // const totalPaid = parseFloat(current_paid) + parseFloat(add_due);

        const addDueProfitInfo = {
            // totalDue,
            totalProfit,
            // totalPaid
        }

        // console.log(addDueProfitInfo)

        // Send to the server;
        api.put(`/add-due-profit?id=${id}`, addDueProfitInfo)
            .then(res => {
                // console.log(res)
                if (res.status == 'ok') {
                    toast.success('Data hasbeen added successfully..')
                    setTimeout(() => {
                        navigate('/dashboard/due-list');
                    }, 1000)
                    refetchData();
                }
                form.reset();
            })
            .catch(err => console.log(err))

    }

    return (
        <div className='min-h-screen'>
            <PageHeading title={`Add due/profit`} />
            {
                !loading ?
                    <>
                        <div className='flex justify-center '>
                            <div>
                                <div>
                                    {/* {updateError && <h3 className='text-red-500'>{updateError}</h3>} */}
                                </div>
                                <form onSubmit={handleUpdateDues}>
                                    <div className='space-y-1 mb-2 hidden'>
                                        <label htmlFor="" className='label-text font-medium'>Current Dues:</label>
                                        <input type="text" name='current_due' placeholder="Type here" defaultValue={oneDue?.due} className="input input-bordered w-full" readOnly />
                                    </div>
                                    <div className='space-y-1 mb-2 hidden'>
                                        <label htmlFor="" className='label-text font-medium'>Current Paid:</label>
                                        <input type="text" name='current_paid' placeholder="Type here" defaultValue={oneDue?.paid} className="input input-bordered w-full" readOnly />
                                    </div>
                                    <div className='space-y-1 mb-2 hidden'>
                                        <label htmlFor="" className='label-text font-medium'>Current Profit:</label>
                                        <input type="text" name='current_profit' placeholder="Type here" defaultValue={oneDue?.profit} className="input input-bordered w-full" readOnly />
                                    </div>
                                    {/* <div className='space-y-1 mb-2'>
                                        <label htmlFor="" className='label-text font-medium'>Add Dues:</label>
                                        <input type="text" name='add_due' placeholder="Type here" defaultValue={0} className="input input-bordered w-full" required />
                                    </div> */}
                                    <div className='space-y-1 mb-2'>
                                        <label htmlFor="" className='label-text font-medium'>Add Profit:</label>
                                        <input type="text" name='add_profit' placeholder="Type here" defaultValue={0} className="input input-bordered w-full" required />
                                    </div>
                                    <div className='my-2'>
                                        <button className='btn btn-primary' type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <>

                    </>
            }

            <ToastContainer />

        </div>
    );
}

export default AddDueProfit;
