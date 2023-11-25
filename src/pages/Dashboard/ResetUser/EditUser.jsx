import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import secureApi from '../../../api/secureApi';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../api/api';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [rolesChange, setRoleChange] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        secureApi.get(`/one-user?id=${id}`)
            .then(res => {
                setUser(res)
                setRoleChange(res?.roles)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const roles = rolesChange;

        const newInfo = {
            name,
            email,
            roles
        }

        // console.log(newInfo)

        api.put(`/update-user?id=${id}`, newInfo)
            .then(res => {
                if (res.status == 'ok') {
                    toast.success('user updated successfully')
                    navigate('/dashboard/reset-user')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='min-h-screen'>
            <h3 className='text-center text-lg font-semibold'>Edit user details</h3>
            <hr />
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div className='mb-2'>
                        <label htmlFor="" className='label'>Username</label>
                        <input type="text" name="name" defaultValue={user?.name} className='input input-bordered w-full' placeholder='Enter username' required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="" className='label'>Email</label>
                        <input type="text" name="email" defaultValue={user?.email} className='input input-bordered w-full' placeholder='Enter username' required />
                    </div>
                    <div className='mb-2'>
                        <select className="select select-bordered w-full" defaultValue={user?.roles} onChange={(e) => setRoleChange(e.target.value)}>
                            <option>{rolesChange}</option>
                            <option>user</option>
                            <option>subadmin</option>
                            <option>admin</option>
                        </select>
                    </div>

                    <div className='mb-2'>
                        <button className='btn btn-primary'>Submit</button>
                    </div>

                </form>
            </div>





            <ToastContainer />
        </div>
    );
}

export default EditUser;
