import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Axios instance

const useTotalIncomeExpense = () => {
    const [totalIncomeExpense, setTotalIncomeExpense] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi
            .get('/total-income-expense')
            .then((res) => {
                res.map((data)=>{
                    setTotalIncomeExpense(data);
                })
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setTotalIncomeExpense([]);
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

    return { totalIncomeExpense, error, loading, refetchData };
};

export default useTotalIncomeExpense;
