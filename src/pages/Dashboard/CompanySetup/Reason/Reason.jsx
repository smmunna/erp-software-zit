import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../../api/api';
import secureApi from '../../../../api/secureApi';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';

const Reason = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState([]);

    const getService = () => {
        secureApi.get('/all-reasons')
            .then(res => {
                setServices(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getService()
    }, [])




    // Service adding form
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const serviceInfo = {
            name
        }

        // Send to the server;
        api.post('/add-reason', serviceInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Reason added successfully..')
                    form.reset()
                    getService()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Handle setId
    const handleUpdate = (id) => {
        setId(id)
    }

    // Handle update
    const handleUpdateFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const serviceInfo = {
            id,
            name
        }

        // Send to the server;
        api.put('/update-reason', serviceInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Reason updated successfully..')
                    form.reset()
                    const modal = document.getElementById('my_modal_10')
                    if (modal) {
                        modal.close()
                    }

                    getService()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    // Delete Services;
    const handleDelete = () => {
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


                // delete api
                api.delete(`/delete-reason?id=${id}`)
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Reason deleted successfully..')
                            getService()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })


                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }


    return (
        <div>

            <div className='min-h-screen dashbg'>
                <PageHeading title={`Reasons `} />

                <div>


                    {
                        loading ?
                            <>
                                {/* <h3 className='text-center py-4'>Loading......</h3> */}
                            </>
                            :
                            <>
                                {
                                    services.length == 0 ?
                                        <>
                                            <h3 className='text-center text-red-500'>Data not found</h3>
                                        </>
                                        :
                                        <>

                                            <div className='flex justify-center  py-4'>
                                                <form onSubmit={handleFormSubmit}>
                                                    <input type="text" name='name' className='input input-bordered mr-2' placeholder='enter reason name' required />
                                                    <button type='submit' className='btn btn-secondary'>Submit</button>
                                                </form>
                                            </div>

                                            <div className='p-4 bg-white shadow'>
                                                <div className="overflow-x-auto mt-8">
                                                    <table className="table">
                                                        {/* head */}
                                                        <thead>
                                                            <tr className='text-white bg-slate-800'>
                                                                <th>ID</th>
                                                                <th>Reason</th>
                                                                <th colSpan={2}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* row 1 */}
                                                            {
                                                                services.map((serv, index) => <React.Fragment key={index}>
                                                                    <tr className={`${(index + 1) % 2 == 0 ? 'bg-slate-200' : ''}`}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{serv?.name}</td>
                                                                        <td>
                                                                            <Link onClick={() => handleUpdate(serv?.id)}><button className='mr-2' onClick={() => document.getElementById('my_modal_10').showModal()}>  <i className="fa-solid fa-pen-to-square"></i>  </button></Link>
                                                                            <Link onClick={() => handleUpdate(serv?.id)}><button onClick={handleDelete}><i className="fa-solid fa-trash-can" style={{ color: '#ff0000' }}></i></button></Link>
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>)
                                                            }


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </>
                                }
                            </>
                    }




                    {/*For updating  */}
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_10" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Update the reason</h3>
                            <div className='py-4'>
                                <form onSubmit={handleUpdateFormSubmit}>
                                    <input type="text" name='name' className='input input-bordered mr-2 mb-2' placeholder='updated reason name' required />
                                    <button type='submit' className='btn btn-secondary'>Update</button>
                                </form>
                            </div>
                        </div>
                    </dialog>


                </div>
                <ToastContainer />
            </div>

        </div>
    );
}

export default Reason;
