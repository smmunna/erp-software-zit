import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Axios instance

const useTotalExpense = () => {
    const [totalExpense, setTotalExpense] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi
            .get('/total-expense')
            .then((res) => {
                res.map((data) => {
                    setTotalExpense(data);
                })
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setTotalExpense([]);
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

    return { totalExpense, error, loading, refetchData };
};

export default useTotalExpense;
