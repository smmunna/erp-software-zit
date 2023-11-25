import React, { useEffect, useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import api from '../../../../api/api';
import secureApi from '../../../../api/secureApi'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddMarketingPerson = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState([]);
    const [user, setUser] = useState([]);
    const [changeUser, setChangeUser] = useState();

    const getService = () => {
        secureApi.get('/all-marketing-persons')
            .then(res => {
                // console.log(res)
                setServices(res)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getUsers = () => {
        secureApi.get('/user')
            .then(res => {
                setUser(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getService()
        getUsers()
    }, [])

    // Person adding form
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = changeUser;
        if(name === undefined){
            toast.error('Please choose a team member first !')
            return
        }
        if(name === 'Choose one'){
            toast.error('Please choose a team member first !')
            return
        }
        const serviceInfo = {
            name
        }

        // console.log(serviceInfo)

        // Send to the server;
        api.post('/add-marketing-person', serviceInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Person added successfully..')
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
        api.put('/update-marketing-person', serviceInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Service updated successfully..')
                    form.reset()
                    const modal = document.getElementById('my_modal_8')
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
                api.delete(`/delete-marketing-person?id=${id}`)
                    .then(res => {
                        if (res.status == 'ok') {
                            toast.success('Service deleted successfully..')
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
        <div className='min-h-screen dashbg'>
            <PageHeading title={`Marketing Person `} />

            <div>


                {
                    loading ?
                        <>
                            {/* <h3 className='text-center py-4'>Loading......</h3> */}
                        </>
                        :
                        <>


                            <div className='flex justify-center  py-4'>
                                <form onSubmit={handleFormSubmit}>
                                    <div className='flex gap-2'>
                                        <div>
                                            <label className="label">
                                                <span className="label-text font-bold">Select Your Team Member</span>
                                            </label>
                                            <select className="select select-bordered w-full" defaultValue={changeUser} onChange={(e) => setChangeUser(e.target.value)}>
                                                <option>Choose one</option>
                                                {
                                                    user.map((value, index) => <React.Fragment key={index}>
                                                        <option value={value.name}>{value.name}</option>
                                                    </React.Fragment>)
                                                }
                                            </select>
                                        </div>
                                        {/* <input type="text" name='name' className='input input-bordered mr-2' placeholder='enter person name' required /> */}
                                        <button type='submit' className='btn btn-secondary mt-9'>Submit</button>
                                    </div>
                                </form>
                            </div>

                            {
                                services.length == 0 ?
                                    <>
                                        <h3 className='text-center text-red-500'>Data not found</h3>
                                    </>
                                    :
                                    <>


                                        <div className='p-4 bg-white shadow'>
                                            <div className="overflow-x-auto mt-8">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr className='text-white bg-slate-800'>
                                                            <th>ID</th>
                                                            <th>Services</th>
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
                                                                        <Link onClick={() => handleUpdate(serv?.id)}><button className='mr-2' onClick={() => document.getElementById('my_modal_8').showModal()}>  <i className="fa-solid fa-pen-to-square"></i>  </button></Link>
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
                <dialog id="my_modal_8" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Update the service title</h3>
                        <div className='py-4'>
                            <form onSubmit={handleUpdateFormSubmit}>
                                <input type="text" name='name' className='input input-bordered mr-2 mb-2' placeholder='enter service name' required />
                                <button type='submit' className='btn btn-secondary'>Update</button>
                            </form>
                        </div>
                    </div>
                </dialog>


            </div>
            <ToastContainer />
        </div>
    );
}

export default AddMarketingPerson;
