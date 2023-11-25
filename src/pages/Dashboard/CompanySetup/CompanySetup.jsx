import React, { useRef, useState } from 'react';
import useCompanyInfo from '../../../hooks/useCompanyInfo';
import Spinner from "../../../components/Spinner/Spinner";
import api from "../../../api/api";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CompanySetup = () => {
    const [id, setId] = useState([]);
    const { companyInfo, error, loading, refetchData } = useCompanyInfo();

    const modalRef = useRef();

    // Submit data to server;
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        // const image = form.image.files[0];

        const comInfo = {
            id,
            name,
            phone
        }

        // console.log(comInfo)


        api.put(`/update-company`, comInfo)
            .then(res => {
                if (res.status == 'ok') {
                    form.reset()
                    toast.success('Information updated successfully');
                    // Close the modal using the ref
                    modalRef.current.close();
                    refetchData()
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='min-h-screen dashbg'>
            <h3 className='text-center pb-3 text-xl font-bold'>Company Information</h3>
            <hr />

            {
                loading ?
                    <>
                        {/* <h3 className='text-center py-4'>Loading......</h3> */}
                    </>
                    :
                    <>
                        {
                            companyInfo.length == 0 ?
                                <>
                                    <h3 className='text-red-500 py-5'>Company Information not found</h3>
                                </>
                                :
                                <>
                                    <div className="p-5">

                                        <div className="overflow-auto rounded-lg shadow hidden md:block">
                                            <table className="w-full">
                                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                    <tr>
                                                        <th className=" p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                                        <th className=" p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                                                        <th className=" p-3 text-sm font-semibold tracking-wide text-left">Logo</th>
                                                        <th className=" p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {
                                                        companyInfo.map((comp, index) => <React.Fragment key={index}>
                                                            <tr className="bg-white">
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <a href="#" className="font-bold text-blue-500 hover:underline">{comp?.name}</a>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    {comp?.phone}
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <div>
                                                                        <img src={`https://zit-accounting.hostzam.com/images/1698043610.jfif`} width={40} alt="" />
                                                                    </div>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                                    <Link onClick={() => setId(comp.id)}><button title="Edit Informaton" onClick={() => document.getElementById('my_modal_5').showModal()}><i className="fa-solid fa-pen-to-square fa-2xl"></i></button></Link>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>


                                        {/* For Mobile devices */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">

                                            {
                                                companyInfo.map((comp, index) => <React.Fragment key={index}>
                                                    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                                                        <div className="text-sm text-gray-700">
                                                            <span className='font-medium'>Name:</span> {comp?.name}
                                                        </div>
                                                        <div className="text-sm text-gray-700">
                                                            <span className='font-medium'>Phone:</span> {comp?.phone}
                                                        </div>
                                                        <div className="text-sm text-gray-700 flex gap-2 items-center">
                                                            <div className='font-medium pb-2'>Logo: </div>
                                                            <div>
                                                                <div>
                                                                    <img src={`https://zit-accounting.hostzam.com/images/1698043610.jfif`} width={40} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-700">
                                                            <span className='font-medium mr-2'>Edit:</span>
                                                            <Link onClick={() => setId(comp.id)}><button title="Edit Informaton" onClick={() => document.getElementById('my_modal_5').showModal()}><i className="fa-solid fa-pen-to-square fa-xl"></i></button></Link>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                                )
                                            }



                                        </div>
                                    </div>
                                </>
                        }
                    </>
            }






            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-medium text-lg py-4 text-center">Update Company Information</h3>
                    <hr />
                    <div className='my-2'>
                        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                            <div className='mb-2'>
                                <label htmlFor="name" className='font-medium'>Name: </label>
                                <input type="text" name='name' placeholder="Enter name here" className="input input-bordered w-full mt-2" required />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="name" className='font-medium'>Phone: </label>
                                <input type="text" name='phone' placeholder="Enter phone number" className="input input-bordered w-full mt-2" required />
                            </div>
                            {/* <div className='mb-2'>
                                <label htmlFor="name" className='font-medium'>Logo: </label>
                                <input type="file" name='image' className="file-input file-input-bordered w-full my-2" />
                            </div> */}
                            <hr />
                            <div className='mb-2 flex justify-center mt-2'>
                                <button className='btn btn-primary w-[200px]'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>


            <ToastContainer />

        </div>
    );
}

export default CompanySetup;
