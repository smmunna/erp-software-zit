import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDueList from '../../../../hooks/useDueList';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import api from '../../../../api/api'
import { ToastContainer, toast } from 'react-toastify';

const DueListEdit = () => {
    const [oneDue, setOnedue] = useState([]);
    const [updateError, setUpdateError] = useState('');
    const { dueList, error, loading, refetchData } = useDueList();
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const dueOne = dueList.find((due) => due.id == id);
        if (dueOne) {
            setOnedue(dueOne)
        }
    }, [dueList, id])

    const handleUpdateDues = (e) => {
        e.preventDefault();
        const form = e.target;
        const current_due = parseFloat(form.current_due.value);
        const new_amount = parseFloat(form.new_amount.value);
        const paid_amount = parseFloat(form.paid_amount.value);
        const updated_due = current_due - new_amount;
        const new_paid = paid_amount + new_amount;


        if (updated_due < 0) {
            setUpdateError('Your current due < new amount. check again');
            return
        }
        setUpdateError('')

        const updatedueInfo = {
            new_amount: updated_due,
            paid: new_paid
        }

        // console.log(updatedueInfo)

        // Send to the server;
        api.put(`/update-dues?id=${id}`, updatedueInfo)
            .then(res => {
                // console.log(res)
                if (res.status == 'ok') {
                    toast.success('Dues added successfully..')
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
        <div className='min-h-screen dashbg py-2'>
            <PageHeading title={`Reduce Due Amount`} />
            <div className='flex justify-center '>
                <div>
                    <div>
                        {updateError && <h3 className='text-red-500'>{updateError}</h3>}
                    </div>
                    <form onSubmit={handleUpdateDues}>
                        <div className='space-y-1 mb-2 hidden'>
                            <label htmlFor="" className='label-text font-medium'>Current Dues:</label>
                            <input type="text" name='current_due' placeholder="Type here" defaultValue={oneDue?.due} className="input input-bordered w-full" readOnly />
                        </div>
                        <div className='space-y-1 mb-2 hidden'>
                            <label htmlFor="" className='label-text font-medium'>Current Paid:</label>
                            <input type="text" name='paid_amount' placeholder="Type here" defaultValue={oneDue?.paid} className="input input-bordered w-full" readOnly />
                        </div>
                        <div className='space-y-1 mb-2'>
                            <label htmlFor="" className='label-text font-medium'>Reduce Amount:</label>
                            <input type="text" name='new_amount' placeholder="Type here" defaultValue={0} className="input input-bordered w-full" required />
                        </div>
                        <div className='my-2'>
                            <button className='btn btn-primary' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DueListEdit;
