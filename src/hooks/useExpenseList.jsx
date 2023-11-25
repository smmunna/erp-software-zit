import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Import your Axios instance

const useExpenseList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi
            .get('/expense-list')
            .then((res) => {
                setData(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setData([]);
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

    return { data, error, loading, refetchData };
};

export default useExpenseList;
