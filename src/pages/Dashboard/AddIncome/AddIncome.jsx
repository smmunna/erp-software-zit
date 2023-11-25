import React, { useRef, useState } from "react";
import PageHeading from "../../../components/Dashboard/PageHeading/PageHeading";
import { useEffect } from "react";
import api from "../../../api/api";
import secureApi from "../../../api/secureApi";
import { ToastContainer, toast } from "react-toastify";
import useCustomerList from "../../../hooks/useCustomerList";

const AddIncome = () => {
    const [service, setService] = useState([]);
    const [marketing, setMarketing] = useState([]);
    const [assignedPerson, setAssignedPerson] = useState([])
    const [payments, setPayments] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [changeService, setChangeService] = useState();
    const [changeMarketing, setChangeMarketing] = useState();
    const [changeAssignedPer, setChangeAssignedPer] = useState();
    const [changePayments, setChangePayments] = useState();

    const [submitting, setSubmitting] = useState(false)

    const inputRef = useRef(null);
    const { customerList } = useCustomerList();


    // get service data;
    useEffect(() => {
        secureApi.get('/all-service') //TODO: change with live server;
            .then(data => setService(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    // get marketing data;
    useEffect(() => {
        secureApi.get('/all-marketing-persons') //TODO: change with live server;
            .then(data => {
                setMarketing(data)
                // setChangeAssignedPer(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    // get assigned person data;
    useEffect(() => {
        secureApi.get('/all-marketing-persons') //TODO: change with live server;
            .then(data => {
                setAssignedPerson(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    // get payments_method data;
    useEffect(() => {
        secureApi.get('/all-payment-methods') //TODO:change with live  server;
            .then(data => setPayments(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])


    // Fill-up the Email and phone;  
    // Function to automatically fill email and phone fields if a match is found
    const autoFillEmailAndPhone = (name) => {
        const matchingIncome = customerList.find(item => item.client.toLowerCase() === name.toLowerCase());

        const emailField = document.getElementsByName("email")[0];
        const phoneField = document.getElementsByName("phone")[0];

        if (matchingIncome) {
            emailField.value = matchingIncome.email;
            phoneField.value = matchingIncome.contact_no;
        } else {
            // Clear the fields when there is no matching entry
            emailField.value = '';
            phoneField.value = '';
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Filter suggestions based on input
        const filteredSuggestions = customerList.filter(item =>
            item.client.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
        // Automatically fill email and phone if a match is found in income_list.json
        autoFillEmailAndPhone(value);
    };

    const handleSuggestionClick = (name) => {
        setInputValue(name);
        setSuggestions([]); // Clear suggestions when a suggestion is selected

        autoFillEmailAndPhone(name) //we have used it for automatic update from DB
    };

    useEffect(() => {
        // Close suggestion list when clicking outside of the input and suggestion list
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // Income Form Submit Form;
    const handleIncomeSubmitForm = (e) => {
        setSubmitting(true) //submitting..
        e.preventDefault()
        const form = e.target;
        const marketingPerson = changeMarketing;
        const service = changeService;
        const client = form.client.value;
        const date = form.date.value;
        const contact_no = form.phone.value;
        const project_value = form.project_value.value;
        const payment_method = changePayments;
        const paid = form.paid.value;
        // const due = form.due.value;
        const profit = form.profit.value;
        const details = form.details.value;
        const email = form.email.value;

        // Phone validation;
        if (contact_no.length !== 11) {
            toast.error('Phone number must be 11 digit')
            return
        }
        if (!contact_no.startsWith('01')) {
            toast.error('Phone number must be starts with 01XXXXXXX..')
            return
        }
        if (service == undefined) {
            toast.error('Please, select a service')
            return
        }
        if (marketingPerson == undefined) {
            toast.error('Please, select a marketing person')
            return
        }
        if (payment_method == undefined) {
            toast.error('Please, choose a payment method')
            return
        }



        const incomeInfo = {
            service,
            marketing_person: marketingPerson,
            assigned_person: changeAssignedPer,
            client,
            contact_no,
            email,
            project_value,
            payment_method,
            paid: paid,
            due: parseFloat(project_value) - parseFloat(paid),
            profit: profit,
            date,
            details
        }

        // console.log(incomeInfo)

        api.post('/add-income', incomeInfo)
            .then(res => {
                // console.log(res)
                if (res.status == 'ok') {
                    toast('Income added successfully')
                    form.reset()
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setSubmitting(false)
            })

    }

    return (
        <div className="px-0 lg:px-5  min-h-screen">
            <PageHeading title={`Add Income`} />
            <div className=" p-4 dashbg">
                <div>
                    <form onSubmit={handleIncomeSubmitForm}>


                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
                            <div>

                                <div className=" p-3 lg:p-5 bg-white shadow">

                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-bold">Select Date</span>
                                            </label>
                                            <input type="date" name="date" placeholder="Contact Number" className="input input-bordered w-full" required />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text font-bold">Payment Method</span>
                                        </label>
                                        <select className="select select-bordered w-full" defaultValue={changePayments} onChange={(e) => setChangePayments(e.target.value)}>
                                            <option>Choose one</option>
                                            {
                                                payments.map((value, index) => <React.Fragment key={index}>
                                                    <option value={value.name}>{value.name}</option>
                                                </React.Fragment>)
                                            }
                                        </select>
                                    </div>


                                </div>





                                <div className=" p-3 lg:p-5 bg-white shadow my-4">


                                    <div className="form-control" ref={inputRef}>
                                        <label className="label">
                                            <span className="label-text font-bold">Project/Client Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="client"
                                            placeholder="Client/project Name"
                                            className="input input-bordered w-full"
                                            required
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                        {suggestions.length > 0 && (
                                            <div className="relative">
                                                <ul className="suggestion-list absolute z-10">
                                                    {suggestions.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            className=" bg-slate-400 text-white p-2 border-b-2 cursor-pointer "
                                                            onClick={() => handleSuggestionClick(item.client)}
                                                        >
                                                            {item.client}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Phone Number</span>
                                        </label>
                                        <input type="text" name="phone" placeholder="Contact Number" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Email</span>
                                        </label>
                                        <input type="email" name="email" placeholder="Enter email" className="input input-bordered" />
                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Details</span>
                                        </label>
                                        <input type="text" name="details" placeholder="Enter the details" className="input input-bordered" />
                                    </div>


                                </div>
                            </div>

                            {/* 2nd col */}
                            <div>



                                <div className="p-3 lg:p-5 bg-white shadow">

                                    <div>
                                        <label className="label">
                                            <span className="label-text font-bold">Service</span>
                                        </label>
                                        <select className="select select-bordered w-full" defaultValue={changeService} onChange={(e) => setChangeService(e.target.value)}>
                                            <option>Choose one</option>
                                            {
                                                service.map((value, index) => <React.Fragment key={index}>
                                                    <option value={value.title}>{value.title}</option>
                                                </React.Fragment>)
                                            }
                                        </select>
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text font-bold">Marketing Person</span>
                                        </label>
                                        <select className="select select-bordered w-full" defaultValue={changeMarketing} onChange={(e) => setChangeMarketing(e.target.value)}>
                                            <option>Choose one</option>
                                            {
                                                marketing.map((value, index) => <React.Fragment key={index}>
                                                    <option value={value.name}>{value.name}</option>
                                                </React.Fragment>)
                                            }
                                        </select>
                                    </div>



                                </div>



                                <div className="p-3 lg:p-5 bg-white shadow my-4">


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Project Value</span>
                                        </label>
                                        <input type="text" name="project_value" placeholder="Value of Project" className="input input-bordered" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Paid</span>
                                        </label>
                                        <input type="text" name="paid" placeholder="Enter the paid amount" className="input input-bordered w-full" required />
                                    </div>

                                    {/* 
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Due</span>
                                        </label>
                                        <input type="text" name="due" placeholder="Enter the due amount" className="input input-bordered" required />
                                    </div> */}

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Profit</span>
                                        </label>
                                        <input type="text" name="profit" placeholder="Enter the profit amount" className="input input-bordered" required />
                                    </div>

                                    {/* Assigned Person */}
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-bold">Assigned Person</span>
                                        </label>
                                        <select className="select select-bordered w-full" defaultValue={changeAssignedPer} onChange={(e) => setChangeAssignedPer(e.target.value)}>
                                            <option>Choose one</option>
                                            {
                                                assignedPerson.map((value, index) => <React.Fragment key={index}>
                                                    <option value={value.name}>{value.name}</option>
                                                </React.Fragment>)
                                            }
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>




                        <div className="flex justify-center items-center my-4">
                            {
                                submitting ?
                                    <>
                                        <div>
                                            <button className="btn btn-primary w-52">Saving.....</button>
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div>
                                            <button type="submit" className="btn btn-primary w-52">Submit</button>
                                        </div>
                                    </>
                            }
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />

        </div>
    );
}

export default AddIncome;
