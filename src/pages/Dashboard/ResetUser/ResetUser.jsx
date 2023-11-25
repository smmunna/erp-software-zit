import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import api from '../../../api/api';
import Swal from 'sweetalert2';

const ResetUser = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)
    const [adduser, setAddUser] = useState(false);
    const [id, setId] = useState([]);

    const getUser = () => {
        secureApi.get('/user')
            .then(res => {
                if (res) {
                    setUser(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            toast.error('Password length must be 6 character long')
            return
        }

        const newInfo = {
            name,
            email,
            password
        }

        // console.log(newInfo)
        api.post('/add-user', newInfo)
            .then(res => {
                if (res.status == 'user already exist') {
                    toast.error('User already exist')
                    form.reset()
                    return
                }
                if (res.status == 'ok') {
                    toast.success('user created successfully')
                    form.reset()
                    getUser()
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    // Password update;
    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const password = form.password.value;

        if (password.length < 6) {
            toast.error('Password length must be 6 character long')
            return
        }

        const passInfo = {
            password
        }

        // console.log(password,id)
        api.patch(`/update-pass?id=${id}`, passInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('Password updated successfully')
                    form.reset()
                    const modal = document.getElementById('my_modal_12')
                    if (modal) {
                        modal.close()
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    // Delete user;
    const handleDeleteUser = () => {
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

                api.delete(`/delete-user?id=${id}`)
                    .then(res => {
                        if (res.status == 'ok') {
                            Swal.fire(
                                'Deleted!',
                                'Your user has been deleted.',
                                'success'
                            )
                            getUser()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })



            }
        })
    }

    return (
        <div className='min-h-screen px-6'>
            <h3 className='py-5 text-center text-xl font-semibold'>Admin activity</h3>
            <hr />

            <div>
                <div className='py-4 '>
                    <h3 className='text-lg font-semibold' onClick={() => setAddUser(!adduser)}> {adduser ? <span className='cursor-pointer'>Add New user -</span> : <>Add New user <i className="fa-solid fa-user-plus cursor-pointer"></i></>} </h3>
                    <hr />
                    <div className={`${adduser ? 'block' : 'hidden'}`}>
                        <div>
                            <form onSubmit={handleFormSubmit}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                    <div className='mb-2'>
                                        <label htmlFor="" className='label'>Username</label>
                                        <input type="text" name="name" className='input input-bordered w-full' placeholder='Enter username' required />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="" className='label'>Email</label>
                                        <input type="email" name="email" className='input input-bordered w-full' placeholder='Enter email' required />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="" className='label'>Password</label>
                                        <input type="password" name="password" className='input input-bordered w-full' placeholder='Enter password' required />
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <button className='btn btn-primary'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Right List */}
                <div className='py-4'>
                    <h3 className='text-lg font-semibold'>User's List</h3>
                    <hr />

                    {
                        loading ?
                            <p className='text-center py-4 text-lg'>Loading...</p>
                            :
                            <>
                                {
                                    user.length == 0 ?
                                        <>
                                            <p className='text-center py-4 text-lg text-red-500'>Information not found.</p>
                                        </>
                                        :
                                        <>
                                            <div className='flex justify-center py-4'>
                                                <div className="overflow-x-auto w-[350px] md:w-[500px] lg:w-full">
                                                    <table className="table">
                                                        {/* head */}
                                                        <thead>
                                                            <tr className='bg-slate-900 text-white'>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Roles</th>
                                                                <th colSpan={2}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* row 1 */}
                                                            {
                                                                user.map((users, index) => <React.Fragment key={index + 1}>
                                                                    <tr key={index + 1}>
                                                                        <td>{users?.name}</td>
                                                                        <td>{users?.email}</td>
                                                                        <td>{users?.roles}</td>
                                                                        <td className='flex gap-4'>
                                                                            <Link to={`/dashboard/edit-user/${users?.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                            <Link onClick={() => setId(users?.id)}><button onClick={() => document.getElementById('my_modal_12').showModal()}><i className="fa-solid fa-lock"></i></button></Link>
                                                                            <Link onClick={handleDeleteUser} ><button onClick={() => setId(users?.id)}><i className="fa-solid fa-trash" style={{ color: '#fa0000' }}></i></button></Link>
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


                </div>
            </div>


            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_12" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Change users Password</h3>
                    <div>
                        <div className='py-2'>
                            <form onSubmit={handlePasswordSubmit}>
                                <input type="text" name='password' className='input input-bordered mr-2 mb-2 lg:mb-0' placeholder='enter new password' required />
                                <button className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>


            <ToastContainer />
        </div>
    );
}

export default ResetUser;
