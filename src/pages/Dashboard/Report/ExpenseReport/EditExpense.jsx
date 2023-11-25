import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import useExpenseList from '../../../../hooks/useExpenseList';
import api from '../../../../api/api';
import secureApi from '../../../../api/secureApi';

const EditExpense = () => {

    const [expenseData, setExpenseData] = useState([]);

    const [reason, setReason] = useState([]);
    const [who, setWho] = useState([]);

    const [changeReason, setChangeReason] = useState(expenseData.reason);
    const [changeWho, setChangeWho] = useState(expenseData.who);

    const { id } = useParams();
    const { data, loading } = useExpenseList();
    const navigate = useNavigate();

    useEffect(() => {
        const expense = data.find((myexpense) => myexpense.id == id)
        if (expense) {
            setExpenseData(expense)
            setChangeReason(expense.reason)
            setChangeWho(expense.who)
        }
    }, [data, id])

    useEffect(() => {
        secureApi.get('/all-reasons')  //TODO: Change with live server;
            .then(data => setReason(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    // get who data;
    useEffect(() => {
        secureApi.get('/all-who')  //TODO: change with live server
            .then(data => setWho(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    // Income Form Submit Form;
    const handleIncomeSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const date = form.date.value;
        const reason = changeReason;
        const who = changeWho;
        const amount = form.amount.value;
        const details = form.details.value;

        const expenseInfo = {
            date,
            reason,
            who,
            amount: amount,
            details
        }

        // console.log(expenseInfo);

        // Expense sent to the server;
        api.put(`/edit-expense?id=${id}`, expenseInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast('Expense updated successfully')
                    setTimeout(() => {
                        navigate('/dashboard/expense-report');
                    }, 1000)
                    // refetchData()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className='min-h-screen'>
            <PageHeading title={`Edit Expenses`} />
            {
                !loading ?
                    <>
                        <div className="  p-4 dashbg">
                            <div>
                                <form onSubmit={handleIncomeSubmitForm}>

                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center lg:gap-4">

                                            <div className="space-y-2">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Select Date</span>
                                                    </label>
                                                    <input type="date" name="date" defaultValue={expenseData.date} placeholder="Contact Number" className="input input-bordered w-full" required />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="label">
                                                    <span className="label-text font-bold">Reason</span>
                                                </label>
                                                <select className="select select-bordered w-full" defaultValue={changeReason} onChange={(e) => setChangeReason(e.target.value)}>
                                                    <option value={expenseData.reason}>{expenseData.reason}</option>
                                                    {
                                                        reason.map((value, index) => <React.Fragment key={index}>
                                                            <option value={value.name}>{value.name}</option>
                                                        </React.Fragment>)
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <label className="label">
                                                    <span className="label-text font-bold">Who</span>
                                                </label>
                                                <select className="select select-bordered w-full" defaultValue={changeWho} onChange={(e) => setChangeWho(e.target.value)}>
                                                    <option value={expenseData.who}>{expenseData.who}</option>
                                                    {
                                                        who.map((value, index) => <React.Fragment key={index}>
                                                            <option value={value.name}>{value.name}</option>
                                                        </React.Fragment>)
                                                    }
                                                </select>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-bold">Amount</span>
                                                </label>
                                                <input type="text" name="amount" defaultValue={expenseData.amount} placeholder="Enter Amount" className="input input-bordered w-full" />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Details</span>
                                        </label>
                                        <textarea rows={0} type="text" defaultValue={expenseData.details} name="details" placeholder="Write details .." className="textarea textarea-bordered" />
                                    </div>

                                    <div className="flex justify-center items-center my-4">
                                        <div>
                                            <button type="submit" className="btn btn-primary w-52">Submit</button>
                                        </div>
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

export default EditExpense;
