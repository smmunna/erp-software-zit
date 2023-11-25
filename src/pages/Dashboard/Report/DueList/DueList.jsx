import React, { useEffect, useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import useDueList from '../../../../hooks/useDueList';
import Spinner from '../../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import api from '../../../../api/api';
import secureApi from '../../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from 'rc-pagination';

const DueList = () => {

    const { dueList, error, loading, refetchData } = useDueList();
    const [dueMessage, setDueMessage] = useState([]);
    const [id, setId] = useState([]);
    const [phone, setPhone] = useState([]);

    const [cominfo, setComInfo] = useState([]);

    const [searchTerm, setSearchTerm] = useState(dueList);


    // Pagination Start;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // You can adjust the number of items per page.

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchTerm.length == 0 ? dueList.slice(indexOfFirstItem, indexOfLastItem) : searchTerm.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Pagination End;


    // Search box handling;
    const handleSearch = (searchItem) => {
        if (dueList) {
            // Split searchItem into an array of individual search terms
            const searchTerms = searchItem.split(',').map(term => term.trim().toLowerCase());

            // Filter dueList based on partial matches for multiple search terms
            const searchResults = dueList.filter((soft) => {
                const softwareValues = {
                    client: soft.client && soft.client.toString().toLowerCase(),
                    contact_no: soft.contact_no && soft.contact_no.toString().toLowerCase(),
                    service: soft.service && soft.service.toString().toLowerCase(),
                    paid: soft.paid && soft.paid.toString().toLowerCase(),
                    due: soft.due && soft.due.toString().toLowerCase(),
                    profit: soft.profit && soft.profit.toString().toLowerCase(),
                    date: soft.date && soft.date.toString().toLowerCase()
                };

                // Check if any of the search terms have partial matches in the data properties and ignore nullish values
                return searchTerms.every(term =>
                    (softwareValues.client || '').includes(term) ||
                    (softwareValues.contact_no || '').includes(term) ||
                    (softwareValues.service || '').includes(term) ||
                    (softwareValues.paid || '').includes(term) ||
                    (softwareValues.due || '').includes(term) ||
                    (softwareValues.profit || '').includes(term) ||
                    (softwareValues.date || '').includes(term)
                );
            });

            setSearchTerm(searchResults);
        }
    };


    // const handleSearch = (searchItem) => {
    //     if (dueList) {
    //         const searchResults = dueList.filter((soft) =>
    //             (soft.client && soft.client.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.contact_no && soft.contact_no.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.service && soft.service.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.paid && soft.paid.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.due && soft.due.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.profit && soft.profit.toString().toLowerCase().includes(searchItem.toLowerCase())) ||
    //             (soft.date && soft.date.toString().toLowerCase().includes(searchItem.toLowerCase()))
    //         );

    //         setSearchTerm(searchResults);
    //     }
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


    const handleSendMessage = (e) => {

        e.preventDefault();
        const form = e.target;
        const message = form.due_message.value;
        const messageInfo = {
            message,
            phone
        }

        console.log(messageInfo)

        // Send Message to server;
        api.post(`/send-sms?id=${id}`, messageInfo)
            .then(res => {
                // console.log(res)
                if (res.status_code == 200) {
                    refetchData()
                    const modal = document.getElementById('my_modal_4');
                    if (modal) {
                        modal.close(); // Close the modal
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
            <PageHeading title={`Due List`} />
            <div className="p-5 min-h-screen dashbg">
                {/* data showing block */}
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
                                                <h3 className='text-red-500'>Due information not found..!</h3>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {/* Table data */}


                                        <div className="py-1">
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                placeholder="Search by service, phone or client..."
                                                onChange={(e) => handleSearch(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex justify-center'>
                                            <div className="overflow-auto rounded-lg shadow w-[350px] md:w-[500px] lg:w-full">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                        <tr aria-rowspan={2}>
                                                            <th className="w-5 p-3 text-sm font-semibold tracking-wide text-left">SL.</th>
                                                            <th className="p-3 w-16 text-sm font-semibold tracking-wide text-center">Action</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Service</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Paid</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Dues</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Profit</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                                                            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Last Paid</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {
                                                            currentItems.map((dueList, index) => <React.Fragment key={index + 1}>
                                                                <tr className="bg-white">
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                        <a href="#" className="font-bold text-blue-500 hover:underline">#{index + 1}</a>
                                                                    </td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                        <div className="flex gap-5 justify-center items-center">
                                                                            <Link onClick={() => document.getElementById('my_modal_4').showModal()}><button title="Send Message" onClick={() => handleDueMessage(dueList.id, dueList.due, dueList.paid, dueList.service, dueList.contact_no)}><i className="fa-solid fa-paper-plane" style={{ color: '#0561ff' }}></i></button></Link>
                                                                            <Link to={`/dashboard/due-list-edit/${dueList.id}`}><button title="Reduce Dues"><i className="fa-solid fa-minus"></i>D</button></Link>
                                                                            <Link to={`/dashboard/edit-due-full/${dueList.id}`}><button title="Edit due list"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                                                            {/* <Link to={`/dashboard/add-dueprofit/${dueList.id}`}><button title="Add Profit"><i className="fa-solid fa-plus"></i>P</button></Link> */}
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.service}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.client}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.contact_no}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.paid}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.due}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.profit}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{dueList.date}</td>
                                                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{moment(dueList.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</td>

                                                                </tr>
                                                            </React.Fragment>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                        {/* Pagination Controls */}
                                        <div className="flex justify-center space-x-2 py-4">

                                            <Pagination
                                                current={currentPage}
                                                total={dueList.length}
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
            <dialog id="my_modal_4" className={`modal`}>
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

            <ToastContainer />
        </div>
    );
}

export default DueList;
