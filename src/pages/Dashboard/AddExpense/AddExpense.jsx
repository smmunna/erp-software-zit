import React, { useState } from "react";
import PageHeading from "../../../components/Dashboard/PageHeading/PageHeading";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/api";
import secureApi from "../../../api/secureApi";

const AddExpense = () => {
    const [reason, setReason] = useState([]);
    const [who, setWho] = useState([]);

    const [changeReason, setChangeReason] = useState();
    const [changeWho, setChangeWho] = useState();

    // get reason data;
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

    // Expense Form Submit Form;
    const handleIncomeSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const date = form.date.value;
        const reason = changeReason;
        const who = changeWho;
        const amount = form.amount.value;
        const details = form.details.value;

        // form validation
        if (reason == undefined) {
            toast.error('Please, choose a reason')
            return
        }
        if (who == undefined) {
            toast.error('Please, choose a person from who')
            return
        }

        const expenseInfo = {
            date,
            reason,
            who,
            amount: amount,
            details
        }

        // console.log(expenseInfo);

        // Expense sent to the server;
        api.post('/add-expense', expenseInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast('Expense added successfully')
                }
                form.reset();
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="min-h-screen dashbg">
            <PageHeading title={`Add Expenses`} />
            <div className=" p-4">
                <div>
                    <form onSubmit={handleIncomeSubmitForm}>

                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center lg:gap-4">

                                <div className="space-y-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Select Date</span>
                                        </label>
                                        <input type="date" name="date" placeholder="Contact Number" className="input input-bordered w-full" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-bold">Reason</span>
                                    </label>
                                    <select className="select select-bordered w-full" defaultValue={changeReason} onChange={(e) => setChangeReason(e.target.value)}>
                                        <option>Choose one</option>
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
                                        <option >Choose one</option>
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
                                    <input type="text" name="amount" placeholder="Enter Amount" className="input input-bordered w-full" required />
                                </div>

                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Details</span>
                            </label>
                            <textarea rows={0} type="text" name="details" placeholder="Write details .." className="textarea textarea-bordered" />
                        </div>

                        <div className="flex justify-center items-center my-4">
                            <div>
                                <button type="submit" className="btn btn-primary w-52">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddExpense;
