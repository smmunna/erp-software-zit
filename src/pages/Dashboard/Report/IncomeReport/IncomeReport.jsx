import React, { useEffect, useRef, useState } from "react";
import PageHeading from "../../../../components/Dashboard/PageHeading/PageHeading";
import Spinner from "../../../../components/Spinner/Spinner";
import useIncomeList from "../../../../hooks/useIncomeList"
import { Link } from "react-router-dom";
import api from "../../../../api/api";
import secureApi from "../../../../api/secureApi";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import Pagination from "rc-pagination";

const IncomeReport = () => {
    const { incomeList, error, incomeall, loading, refetchData } = useIncomeList();
    const [searchTerm, setSearchTerm] = useState(incomeList);

    const [dueMessage, setDueMessage] = useState([]);
    const [id, setId] = useState([]);
    const [phone, setPhone] = useState([]);

    const [cominfo, setComInfo] = useState([]);


    const [service, setService] = useState([]);
    const [marketing, setMarketing] = useState([]);
    const [selectMarketing, setSelectMarketing] = useState([]);
    const [assignedPerson, setAssignedPerson] = useState([])

    const [changeService, setChangeService] = useState();
    const [changeMarketing, setChangeMarketing] = useState();
    const [changeAssignedPer, setChangeAssignedPer] = useState();
    const [changeSelectMarketing, setChangeSelectMarketing] = useState();

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [paid, setPaid] = useState(0)
    const [due, setDue] = useState(0)
    const [profit, setProfit] = useState(0)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });





    // Pagination Start;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // You can adjust the number of items per page.

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchTerm.length == 0 ? incomeList.slice(indexOfFirstItem, indexOfLastItem) : searchTerm.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Pagination End;

    // console.log(incomeall)


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

    // get marketing data;
    useEffect(() => {
        secureApi.get('/all-marketing-persons') //TODO: change with live server;
            .then(data => {
                setSelectMarketing(data)
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




    // Date range search
    const handleDateRangeSearch = (e) => {
        e.preventDefault();

        // Convert fromDate and toDate to Date objects
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const marketingPerson = changeSelectMarketing;

        // Filter incomeList based on the date range and assigned_person
        const filteredResults = incomeList.filter((income) => {
            const incomeDate = new Date(income.date);

            // Check if incomeDate is within the selected date range and assigned_person matches
            const isWithinDateRange = incomeDate >= fromDateObj && incomeDate <= toDateObj;
            const hasMatchingAssignedPerson = marketingPerson.length === 0 || marketingPerson.includes(income.marketing_person);

            return isWithinDateRange && hasMatchingAssignedPerson;
        });

        // Update search results
        // Calculate total paid from filteredResults
        const totalPaid = filteredResults.reduce((total, income) => total + parseFloat(income.paid), 0);
        const totalDue = filteredResults.reduce((total, income) => total + parseFloat(income.due), 0);
        const totalProfit = filteredResults.reduce((total, income) => total + parseFloat(income.profit), 0);

        setSearchTerm(filteredResults)
        setPaid(totalPaid)
        setDue(totalDue)
        setProfit(totalProfit)

        // Show an error message if no results are found
        if (filteredResults.length === 0) {
            toast.error('No information found');
        }
    };




    // const handleDateRangeSearch = (e) => {
    //     e.preventDefault();

    //     // Convert fromDate and toDate to Date objects
    //     const fromDateObj = new Date(fromDate);
    //     const toDateObj = new Date(toDate);
    //     const marketing_person = changeSelectMarketing;

    //     // Filter incomeList based on the date range
    //     const filteredResults = incomeList.filter((income) => {
    //         const incomeDate = new Date(income.date);

    //         // Check if incomeDate is within the selected date range
    //         return incomeDate >= fromDateObj && incomeDate <= toDateObj;
    //     });

    //     // Update search results
    //     setSearchTerm(filteredResults);

    //     // Show an error message if no results are found
    //     if (filteredResults.length === 0) {
    //         toast.error('No information found');
    //     }
    // };


    // handle Dropdown search;
    const handleDropSearch = (e) => {
        e.preventDefault();
        const selectedService = changeService;
        const selectedMarketingPerson = changeMarketing;
        const selectedAssignedPerson = changeAssignedPer;

        // Filter incomeList based on selectedService, selectedMarketingPerson, and selectedAssignedPerson
        const searchResults = incomeList.filter((software) => {
            const lowercaseService = software.service.toLowerCase();
            const lowercaseMarketingPerson = software.marketing_person.toLowerCase();
            const lowercaseAssignedPerson = (software.assigned_person ?? '').toLowerCase();

            const serviceMatch = selectedService && lowercaseService.includes(selectedService.toLowerCase());
            const marketingMatch = selectedMarketingPerson && lowercaseMarketingPerson.includes(selectedMarketingPerson.toLowerCase());
            const assignedMatch = selectedAssignedPerson && lowercaseAssignedPerson.includes(selectedAssignedPerson.toLowerCase());

            if (selectedService && selectedMarketingPerson && selectedAssignedPerson) {
                return serviceMatch && marketingMatch && assignedMatch;
            }

            if (selectedService && selectedMarketingPerson) {
                return serviceMatch && marketingMatch;
            }

            if (selectedService && selectedAssignedPerson) {
                return serviceMatch && assignedMatch;
            }

            if (selectedMarketingPerson && selectedAssignedPerson) {
                return marketingMatch && assignedMatch;
            }

            return serviceMatch || marketingMatch || assignedMatch;
        });

        setSearchTerm(searchResults);

        if (searchResults.length === 0) {
            toast.error('No information found');
        }
    };



    // Perfect search
    const handleSearch = (searchItem) => {
        if (currentItems) {
            // Split searchItem into an array of individual search terms
            const searchTerms = searchItem.split(',').map(term => term.trim());

            // Filter incomeList based on partial matches for multiple search terms
            const searchResults = incomeList.filter((software) => {
                const lowercaseSoftware = {
                    client: software.client && software.client.toString().toLowerCase(),
                    service: software.service && software.service.toString().toLowerCase(),
                    marketing_person: software.marketing_person && software.marketing_person.toString().toLowerCase(),
                    assigned_person: software.assigned_person && software.assigned_person.toString().toLowerCase(),
                    paid: software.paid && software.paid.toString().toLowerCase(),
                    due: software.due && software.due.toString().toLowerCase(),
                    profit: software.profit && software.profit.toString().toLowerCase(),
                    date: software.date && software.date.toString().toLowerCase()
                };

                // Check if any of the search terms have partial matches in the data properties and ignore nullish values
                return searchTerms.every(term =>
                    (lowercaseSoftware.client || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.service || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.marketing_person || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.assigned_person || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.paid || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.due || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.profit || '').includes(term.toLowerCase()) ||
                    (lowercaseSoftware.date || '').includes(term.toLowerCase())
                );
            });

            setSearchTerm(searchResults);
        }
    };


    // const handleSearch = (searchItem) => {
    //     const searchName = incomeList.filter((software) =>
    //         software.client.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.service.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.marketing_person.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.paid.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.due.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.profit.toString().toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.date.toString().toLowerCase().includes(searchItem.toLowerCase())
    //     );
    //     // console.log(searchName)
    //     setSearchTerm(searchName);
    // }



    // const handleSearch = (searchItem) => {
    //     const searchName = incomeList.filter((software) =>
    //         software.client.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.service.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.marketing_person.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.paid.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.due.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.profit.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         software.date.toLowerCase().includes(searchItem.toLowerCase())
    //     );
    //     // console.log(searchName)
    //     setSearchTerm(searchName);

    // }


    // const handleSearch = (searchItem) => {
    //     // Split searchItem into an array of individual search terms
    //     const searchTerms = searchItem.split(',').map(term => term.trim().toLowerCase());

    //     // Filter incomeList based on exact matches for multiple search terms
    //     const searchResults = incomeList.filter((software) => {
    //         const lowercaseSoftware = {
    //             client: software.client && software.client.toString().toLowerCase(),
    //             service: software.service && software.service.toString().toLowerCase(),
    //             marketing_person: software.marketing_person && software.marketing_person.toString().toLowerCase(),
    //             assigned_person: software.assigned_person && software.assigned_person.toString().toLowerCase(),
    //             paid: software.paid && software.paid.toString().toLowerCase(),
    //             due: software.due && software.due.toString().toLowerCase(),
    //             profit: software.profit && software.profit.toString().toLowerCase(),
    //             date: software.date && software.date.toString().toLowerCase()
    //         };

    //         // Check if all search terms have exact matches in the data properties
    //         return searchTerms.some(term =>
    //             lowercaseSoftware.client === term ||
    //             lowercaseSoftware.service === term ||
    //             lowercaseSoftware.marketing_person === term ||
    //             lowercaseSoftware.assigned_person === term ||
    //             lowercaseSoftware.paid === term ||
    //             lowercaseSoftware.due === term ||
    //             lowercaseSoftware.profit === term ||
    //             lowercaseSoftware.date === term
    //         );
    //     });

    //     setSearchTerm(searchResults);
    // };


    // getting companyInfo

    useEffect(() => {
        secureApi.get('/company-details')
            .then(res => {
                res.map((info, index) => setComInfo(info))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    // Delete Data;
    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/delete-income?id=${id}`)  //send to server for delete
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Income deleted successfully');
                            refetchData();
                        }
                        else {
                            toast.error(res.status)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })

    }

    // all Message Handle;
    const handlePublicMessage = (id, due, paid, service, phone, project_value) => {
        const messageInfo = {
            "message": `Dear sir,\nYour ${service} service value ${project_value} Tk.\nPaid: ${paid} Tk.\nDue: ${due} Tk.\n\nThank you\nAccounts Team\n${cominfo?.name}\n${cominfo?.phone}`
        }
        // console.log(phone)
        setDueMessage(messageInfo)
        setId(id)
        setPhone(phone)

    }


    // due Message Handle;
    const handleDueMessage = (id, due, paid, service, phone) => {
        const messageInfo = {
            "message": `Dear sir,\nYou have due ${due} Tk for ${service} service.\nPlease pay as soon as possible.\nAvoid the message if already paid.\n\nThank you\nAccounts Team\n${cominfo?.name}\n${cominfo?.phone}`
        }
        // console.log(phone)
        setDueMessage(messageInfo)
        setId(id)
        setPhone(phone)

    }

    // Handle Send Sms
    const handleSendMessage = (e) => {

        e.preventDefault();
        const form = e.target;
        const message = form.due_message.value;
        const messageInfo = {
            message,
            phone
        }

        // console.log(messageInfo)

        // Send Message to server;
        api.post(`/send-sms?id=${id}`, messageInfo)
            .then(res => {
                console.log(res)
                if (res.status_code == 200) {
                    refetchData()
                    setDueMessage(messageInfo)
                    const modal = document.getElementById('my_modal_3');
                    if (modal) {
                        modal.close(); // Close the modal
                    }
                    const modal1 = document.getElementById('my_modal_6');
                    if (modal1) {
                        modal1.close(); // Close the modal
                    }

                    toast.success('Message sent successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })


    }



    return (
        <div>

            <PageHeading title={`Income Report`} />

            <div className="p-5 min-h-screen ">

                {
                    loading ?
                        <>
                            {/* <Spinner /> */}
                        </>
                        :
                        <>
                            {
                                currentItems.length == 0 ?
                                    <>
                                        <div className='flex justify-center py-4'>
                                            <div>
                                                <h3 className='text-red-500'>Income information not found..!</h3>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>

                                        {/* form submission */}
                                        <div>
                                            <div>


                                                <form onSubmit={handleDropSearch}>
                                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                                        <div>
                                                            <label className="label">
                                                                <span className="label-text font-bold">Service</span>
                                                            </label>
                                                            <select className="select select-bordered w-full" value={changeService} onChange={(e) => setChangeService(e.target.value)}>
                                                                <option value="">Choose one</option>
                                                                {service.map((value, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <option value={value.title}>{value.title}</option>
                                                                    </React.Fragment>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="label">
                                                                <span className="label-text font-bold">Marketing Person</span>
                                                            </label>
                                                            <select className="select select-bordered w-full" value={changeMarketing} onChange={(e) => setChangeMarketing(e.target.value)}>
                                                                <option value="">Choose one</option>
                                                                {marketing.map((value, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <option value={value.name}>{value.name}</option>
                                                                    </React.Fragment>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="label">
                                                                <span className="label-text font-bold">Assigned Person</span>
                                                            </label>
                                                            <select className="select select-bordered w-full" value={changeAssignedPer} onChange={(e) => setChangeAssignedPer(e.target.value)}>
                                                                <option value="">Choose one</option>
                                                                {assignedPerson.map((value, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <option value={value.name}>{value.name}</option>
                                                                    </React.Fragment>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className=" my-2 lg:mt-9">
                                                            <button className="btn btn-info w-full lg:w-56">Search</button>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="my-2">
                                                    <form onSubmit={handleDateRangeSearch} className="flex items-center space-x-4 mb-4">
                                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                                            <div>
                                                                <label className="label">
                                                                    <span className="label-text font-bold">Marketing Person</span>
                                                                </label>
                                                                <select className="select select-bordered w-[350px] lg:w-full" value={changeSelectMarketing} onChange={(e) => setChangeSelectMarketing(e.target.value)}>
                                                                    <option value="">Choose one</option>
                                                                    {selectMarketing.map((value, index) => (
                                                                        <React.Fragment key={index}>
                                                                            <option value={value.name}>{value.name}</option>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="label">
                                                                    <span className="label-text font-bold">From Date</span>
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="input input-bordered w-full"
                                                                    value={fromDate}
                                                                    onChange={(e) => setFromDate(e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="label">
                                                                    <span className="label-text font-bold">To Date</span>
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="input input-bordered w-full"
                                                                    value={toDate}
                                                                    onChange={(e) => setToDate(e.target.value)}
                                                                />
                                                            </div>
                                                            <button type="submit" className="btn btn-primary w-full lg:w-52 lg:mt-9">Search</button>
                                                        </div>
                                                    </form>


                                                </div>

                                                <div className="py-1">
                                                    <input
                                                        type="text"
                                                        className="input input-bordered w-full md:w-full"
                                                        placeholder="Search by service, marketer or client..."
                                                        onChange={(e) => handleSearch(e.target.value)}
                                                    />
                                                </div>



                                            </div>
                                        </div>

                                        {/* Table data */}
                                        {/* hidden lg:block */}
                                        <div className="flex justify-center" ref={componentRef}>
                                            <div className="overflow-auto rounded-lg shadow w-[350px] md:w-[500px] lg:w-full tablebody">




                                                <table className="w-full">
                                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                        <tr aria-rowspan={2}>
                                                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">SL.</th>
                                                            <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left action-th">Action</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Service</th>
                                                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Marketing Person</th>
                                                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Assigned Person</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Client</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Value</th>
                                                            <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Paid</th>
                                                            <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Due</th>
                                                            <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Profit</th>
                                                            <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Date</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {
                                                            currentItems.map((income, index) => <React.Fragment key={index + 1}>
                                                                <tr key={income.id} className={`${(index + 1) % 2 == 0 ? 'bg-slate-100' : ''}`}>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                        <a href="#" className="font-bold text-blue-500 hover:underline">#{index + 1}</a>
                                                                    </td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap action-td">
                                                                        <div className="flex gap-3">
                                                                            {income.due >= 0 ? <Link className="" onClick={() => document.getElementById('my_modal_6').showModal()}><button title="Send Message All" onClick={() => handlePublicMessage(income.id, income.due, income.paid, income.service, income.contact_no, income.project_value)}><i className="fa-solid fa-mobile-retro" style={{ color: '#0ba847' }}></i></button></Link> : <><button title="Send Message" disabled onClick={() => handleDueMessage(income.id, income.due, income.paid, income.service, income.contact_no)}><i className="fa-solid fa-paper-plane" style={{ color: '#15CA20' }}></i></button></>}
                                                                            {income.due > 0 ? <Link className="" onClick={() => document.getElementById('my_modal_3').showModal()}><button title="Send Message due only" onClick={() => handleDueMessage(income.id, income.due, income.paid, income.service, income.contact_no)}><i className="fa-solid fa-paper-plane" style={{ color: '#0561ff' }}></i></button></Link> : <><button disabled onClick={() => handleDueMessage(income.id, income.due, income.paid, income.service, income.contact_no)}><i className="fa-solid fa-paper-plane" style={{ color: '#b0bbff' }}></i></button></>}
                                                                            {/* <Link to={`/dashboard/due-list-edit/${income.id}`}><button title="Reduce Dues"><i className="fa-solid fa-minus"></i></button></Link> */}
                                                                            {/* <Link to={`/dashboard/add-dueprofit-income/${income.id}`}><button title="Add Profit"><i className="fa-solid fa-plus"></i> +P</button></Link> */}
                                                                            <Link to={`/dashboard/edit-incomereport/${income.id}`} className=""><button title="Edit Informaton"><i className="fa-solid fa-pen-to-square" style={{ color: '#FFC107' }}></i></button></Link>
                                                                            <Link to={`/dashboard/income-invoice/${income.id}`} className=""><button title="Invoice Informaton"><i className="fa-solid fa-eye"></i></button></Link>
                                                                            <button title="Delete information" className="" onClick={() => handleDelete(income.id)}><i className="fa-solid fa-trash-can" style={{ color: '#ff0000' }}></i></button>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{income.service}</span>
                                                                    </td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.marketing_person}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.assigned_person}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.client}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{parseFloat((income.project_value)).toLocaleString()}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{(income.paid).toLocaleString()}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.due == 0 ? <>{(income.due).toLocaleString()}</> : <><span className="font-bold text-red-500">{(income.due).toLocaleString()}</span></>}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.profit == 0 ? <>{(income.profit).toLocaleString()}</> : <><span className="font-bold text-green-500">{(income.profit).toLocaleString()}</span></>}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{income.date}</td>

                                                                </tr>
                                                            </React.Fragment>)
                                                        }
                                                    </tbody>
                                                </table>


                                                {
                                                    paid ?
                                                        <>
                                                            <div className="py-4 flex justify-center">
                                                                <div >
                                                                    <h3><span className="font-bold">Total Paid:</span> {parseFloat(paid).toLocaleString()}</h3>
                                                                    <h3><span className="font-bold">Total Profit:</span> {parseFloat(profit).toLocaleString()}</h3>
                                                                    <h3><span className="font-bold">Total Due:</span> {parseFloat(due).toLocaleString()}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="my-2 flex justify-center">
                                                                <button className="btn btn-primary printbtn" onClick={handlePrint}>Print this out</button>
                                                            </div>
                                                        </>
                                                        :
                                                        <>

                                                        </>
                                                }



                                            </div>
                                        </div>



                                        {/* Pagination Controls */}
                                        <div className="flex justify-center space-x-2 py-4">

                                                <Pagination
                                                    current={currentPage}
                                                    total={incomeList.length}
                                                    pageSize={itemsPerPage}
                                                    onChange={handlePageChange}
                                                />

                                        </div>

                                    </>
                            }
                        </>
                }
            </div>


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className={`modal`}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-2">Dues Message</h3>

                    <form onSubmit={handleSendMessage}>
                        <div>
                            <div className="mb-2">
                                <textarea name="due_message" style={{ width: '100%' }} defaultValue={dueMessage.message} rows={4} cols={20} className="textarea textarea-primary"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </form>

                </div>
            </dialog>

            {/* Send Message to all user */}
            <dialog id="my_modal_6" className={`modal`}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-2">Public Message</h3>

                    <form onSubmit={handleSendMessage}>
                        <div>
                            <div className="mb-2">
                                <textarea name="due_message" style={{ width: '100%' }} defaultValue={dueMessage.message} rows={4} cols={20} className="textarea textarea-primary"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </div>
                    </form>

                </div>
            </dialog>




            <ToastContainer />

        </div>
    );
}

export default IncomeReport;
