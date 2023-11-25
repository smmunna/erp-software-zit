import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureApi from '../../../../api/secureApi';
// import api from '../../../../api/api';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';

const CustomerView = () => {
    const [customerInfo, setCustomerInfo] = useState([]);
    const [customername, setCustomername] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        secureApi.get(`/customer-income-data?id=${id}`)
            .then(res => {
                // console.log(res)
                const username = res.map((customer, index) => {
                    setCustomername(customer)
                })
                setCustomerInfo(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div>
            <PageHeading title={` ${customername?.client ? customername.client : ''}'s, Order details`} />
            <div className='py-5 lg:py-0 min-h-screen dashbg'>
                <div className='px-2 grid grid-cols-1 md:grid-cols-3 gap-2 space-y-3'>
                    {
                        customerInfo.map((customer, index) => <React.Fragment key={customer.id}>
                            <div className='mt-3 bg-white p-5 shadow'>
                                <h3 className='text-lg font-bold text-blue-500'>Order #{index + 1}</h3>
                                <hr className='my-2' />
                                <h3><span className='font-bold'>Marketing Person:</span> {customer.marketing_person}</h3>
                                <h3><span className='font-bold'>Service:</span> <span className='bg-green-200 rounded px-2'>{customer.service}</span></h3>
                                <h3><span className='font-bold'>Paid:</span> {customer.paid}</h3>
                                <h3><span className='font-bold'>Due:</span> {customer.due == 0 ? <span>{customer.due}</span> : <span className='text-red-500'>{customer.due}</span>}</h3>
                                <h3><span className='font-bold'>Profit:</span> {customer.profit}</h3>
                                <h3><span className='font-bold'>Due:</span> {customer.date}</h3>
                            </div>
                        </React.Fragment>)
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomerView;
