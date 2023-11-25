import React, { useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import useExpenseList from '../../../../hooks/useExpenseList';
import Spinner from '../../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from 'rc-pagination';

const ExpenseReport = () => {
    const { data, error, loading, refetchData } = useExpenseList();
    const [searchTerm, setSearchTerm] = useState(data);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [changeSelectWho, setChangeSelectWho] = useState();

    const [whoExpense, setWhoExpense] = useState(0)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // You can adjust the number of items per page.

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchTerm.length == 0 ? data.slice(indexOfFirstItem, indexOfLastItem) : searchTerm.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (searchItem) => {

        if (currentItems) {
            // Split searchItem into an array of individual search terms
            const searchTerms = searchItem.split(',').map(term => term.trim());

            // Filter data based on multiple search terms
            const searchResults = data.filter((soft) => {
                const lowercaseSoft = {
                    who: soft.who.toLowerCase(),
                    reason: soft.reason.toLowerCase(),
                    amount: soft.amount.toLowerCase(),
                    date: soft.date.toLowerCase()
                };

                // Check if any of the search terms match the data properties
                return searchTerms.every(term =>
                    lowercaseSoft.who.includes(term.toLowerCase()) ||
                    lowercaseSoft.reason.includes(term.toLowerCase()) ||
                    lowercaseSoft.amount.includes(term.toLowerCase()) ||
                    lowercaseSoft.date.includes(term.toLowerCase())
                );
            });

            setSearchTerm(searchResults);
        }


        // if (currentItems) {
        //     const searchResults = data.filter((soft) =>
        //         soft.who.toLowerCase().includes(searchItem.toLowerCase()) ||
        //         soft.reason.toLowerCase().includes(searchItem.toLowerCase()) ||
        //         soft.amount.toLowerCase().includes(searchItem.toLowerCase()) ||
        //         soft.date.toLowerCase().includes(searchItem.toLowerCase())
        //     );

        //     setSearchTerm(searchResults);
        // }
    }


    // Date range search
    const handleDateRangeSearch = (e) => {
        e.preventDefault();

        // Convert fromDate and toDate to Date objects
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const whoPerson = changeSelectWho;

        // Filter incomeList based on the date range and assigned_person
        const filteredResults = data.filter((expense) => {
            const expenseDate = new Date(expense.date);

            // Check if incomeDate is within the selected date range and assigned_person matches
            const isWithinDateRange = expenseDate >= fromDateObj && expenseDate <= toDateObj;
            const hasMatchingWho = whoPerson.length === 0 || whoPerson.includes(expense.who);

            return isWithinDateRange && hasMatchingWho;
            // return isWithinDateRange ;
        });

        // console.log(filteredResults)

        // Calculate total paid from filteredResults
        const totalExpense = filteredResults.reduce((total, expense) => total + parseFloat(expense.amount), 0);

        setSearchTerm(filteredResults)
        setWhoExpense(totalExpense)

        // Show an error message if no results are found
        if (filteredResults.length === 0) {
            toast.error('No information found');
        }
    };




    // Expense Delete;
    const handleDeleteExpense = (id) => {
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
                api.delete(`/delete-expense?id=${id}`)  //send to server for delete
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Expense deleted successfully');
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

    return (
        <div>
            <div >
                <PageHeading title={`Expense Report`} />
            </div>

            <div className="p-5 min-h-screen dashbg">
                {
                    loading ?
                        <>
                            {/* <Spinner /> */}
                        </>
                        :
                        <>
                            {
                                data.length == 0 ?
                                    <>
                                        <div className='flex justify-center py-4'>
                                            <div>
                                                <h3 className='text-red-500'>Expense information not found..!</h3>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>

                                        <div className="py-1">
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Search by reason, or who..."
                                                onChange={(e) => handleSearch(e.target.value)}
                                            />
                                        </div>


                                        <div className="my-2">
                                            <form onSubmit={handleDateRangeSearch} className="flex items-center space-x-4 mb-4">
                                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                                    <div>
                                                        <label className="label">
                                                            <span className="label-text font-bold">Select Who</span>
                                                        </label>
                                                        <select className="select select-bordered w-[350px] lg:w-full" value={changeSelectWho} onChange={(e) => setChangeSelectWho(e.target.value)}>
                                                            <option value="">Choose one</option>
                                                            {data.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    <option value={value.who}>{value.who}</option>
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

                                        {/* Table data */}

                                        <div className="overflow-auto rounded-lg shadow w-[350px] md:w-[500px] lg:w-full">
                                            <table className="w-full">
                                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                    <tr aria-rowspan={2}>
                                                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">SL.</th>
                                                        <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left">Action</th>
                                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Reason</th>
                                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Who</th>
                                                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                                                        <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                                                        <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">Date</th>

                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {
                                                        currentItems.map((expense, index) => <React.Fragment key={index + 1}>
                                                            <tr className="bg-white">
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <a href="#" className="font-bold text-blue-500 hover:underline">#{index + 1}</a>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <div className="flex gap-2">
                                                                        {/* <button title="Send Message"><i className="fa-solid fa-paper-plane" style={{ color: '#0561ff' }}></i></button> */}
                                                                        <Link to={`/dashboard/edit-expense/${expense.id}`}><button title="Edit Informaton"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                                        <button title="Delete information" onClick={() => handleDeleteExpense(expense.id)}><i className="fa-solid fa-trash-can" style={{ color: '#ff0000' }}></i></button>
                                                                        {/* <button title="Edit Informaton"><i className="fa-solid fa-eye" style={{ color: '#2a2928' }}></i></button> */}
                                                                    </div>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{expense.reason}</span>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{expense.who}</td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{expense.amount}</td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{expense.details}</td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{expense.date}</td>

                                                            </tr>
                                                        </React.Fragment>)
                                                    }
                                                </tbody>
                                            </table>

                                            {
                                                whoExpense ?
                                                    <>
                                                        <div className="py-4 flex justify-center">
                                                            <div >
                                                                <h3><span className="font-bold">Total Expense:</span> {parseFloat(whoExpense).toLocaleString()}</h3>
                                                            </div>
                                                        </div>
                                                        {/* <div className="my-2 flex justify-center">
                                                            <button className="btn btn-primary printbtn" onClick={handlePrint}>Print this out</button>
                                                        </div> */}
                                                    </>
                                                    :
                                                    <>

                                                    </>
                                            }



                                        </div>




                                        {/* Pagination Controls */}
                                        <div className="flex justify-center space-x-2 py-4">

                                            <Pagination
                                                current={currentPage}
                                                total={data.length}
                                                pageSize={itemsPerPage}
                                                onChange={handlePageChange}
                                            />

                                        </div>



                                    </>
                            }
                        </>

                }
            </div>



            <ToastContainer />

        </div>
    );
}

export default ExpenseReport;
