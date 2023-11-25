import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Import your Axios instance

const useCustomerList = () => {
    const [customerList, setCustomerList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi.get('/customer-list')
            .then((res) => {
                // console.log(res)
                setCustomerList(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setCustomerList([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data when the component mounts

    const refetchData = () => {
        setLoading(true);
        fetchData();
    };

    return { customerList, error, loading, refetchData };
};

export default useCustomerList;

