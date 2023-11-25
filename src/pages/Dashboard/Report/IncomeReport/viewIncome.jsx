import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useIncomeList from '../../../../hooks/useIncomeList';
import brand from "../../../../assets/brand/brand.jfif";
import moment from 'moment/moment';
import { useReactToPrint } from 'react-to-print';

const ViewIncome = () => {
    const [allIncome, setAllincome] = useState([]);
    const { incomeList, error, loading, refetchData } = useIncomeList();
    const { id } = useParams();

    const date = new Date();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {
        const incomelist = incomeList.find((income) => income.id == id);
        if (incomelist) {
            setAllincome(incomelist)
        }
    }, [incomeList, id])

    return (
        <div className='px-2 md:px-20 min-h-screen dashbg' ref={componentRef}>


            {
                loading ?
                    <>
                        <h3 className='text-center font-semibold py-4'>Loading.....</h3>
                    </>
                    :
                    <>
                        {/* company Info */}
                        <div className='md:flex justify-between py-4'>
                            <div className=''>
                                <h3 className='text-xl md:text-3xl font-bold'>ZAMAN IT</h3>
                                <h3>House # 63, Road # 13, Sector # 10, Uttara, Dhaka-1230, Bangladesh.</h3>
                                <h3>Hotline: 01973009007</h3>
                                <h3>Phone: 09612776677</h3>
                                <h3>Email: zamanit2008@gmail.com, hello@zaman-it.com
                                </h3>
                            </div>
                            <div className=''>
                                <img src={brand} width={90} alt="" />
                            </div>
                        </div>
                        <hr />

                        <div>
                            <div className='flex justify-between'>
                                <div>
                                    <h3 className='text-lg font-bold'>Bill to:</h3>
                                    <p><span className='font-semibold'>Name:</span> {allIncome?.client}</p>
                                    <p><span className='font-semibold'>Contact:</span> {allIncome?.contact_no}</p>
                                    {allIncome?.email ? <><p><span className='font-semibold'>Email:</span> {allIncome?.email}</p></> : ''}
                                    <p><span className='font-semibold'>Membership:</span> {allIncome?.date}</p>
                                </div>
                                <div className=''>
                                    <h3><span className='font-semibold'>Invoice No: </span>ZAMANIT-{allIncome?.id}</h3>
                                    <h3><span className='font-semibold'>Date: </span>{moment(Date.now()).format('MMMM Do YYYY')}</h3>
                                    <h3><span className='font-semibold'>Seller: </span>{allIncome?.marketing_person}</h3>
                                </div>
                            </div>
                        </div>



                        {/* Invoice Table */}
                        <div className="overflow-x-auto my-4 bg-slate-100 shadow">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='border-b-2 border-slate-200'>
                                        <th className='font-bold text-black'>Service</th>
                                        <th></th>
                                        <th className='font-bold text-black'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className='border-b-2 border-slate-200'>
                                        <td>Website</td>
                                        <td>Project Value</td>
                                        <td>{parseFloat(allIncome?.project_value)?.toLocaleString()}</td>
                                    </tr>
                                    <tr className='border-b-2 border-slate-200'>
                                        <td></td>
                                        <td>Paid</td>
                                        <td>{(allIncome?.paid)?.toLocaleString()}</td>
                                    </tr>
                                    <tr >
                                        <td></td>
                                        <td>Due</td>
                                        <td>{(allIncome?.profit)?.toLocaleString()}</td>
                                    </tr>
                                    {/* row 2 */}

                                </tbody>
                            </table>
                        </div>


                        <div className='flex justify-end mt-20'>
                            <div>
                                <div className='border-b-2 border-slate-300 w-80'></div>
                                <div>Organization Head</div>
                            </div>
                        </div>



                        <div className='printbtn flex justify-center py-4 mt-4'>
                            <button className='btn btn-primary' onClick={handlePrint}>Print this out!</button>
                        </div>
                    </>
            }


        </div>
    );
}

export default ViewIncome;
