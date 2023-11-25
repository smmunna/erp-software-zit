import { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi'; // Import your Axios instance

const useBasicSalaryList = () => {
    const [basicSalary, setBasicSalary] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi.get('/show-salary')
            .then((res) => {
                // console.log(res)
                setBasicSalary(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setBasicSalary([]);
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

    return { basicSalary, error, loading, refetchData };
};

export default useBasicSalaryList;

