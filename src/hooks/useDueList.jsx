import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Import your Axios instance

const useDueList = () => {
    const [dueList, setDueList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi
            .get('/due-list')
            .then((res) => {
                setDueList(res);
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

    return { dueList, error, loading, refetchData };
};

export default useDueList;
