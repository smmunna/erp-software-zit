import { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi'; // Import your Axios instance
import axios from 'axios';

const useSalarySetupHooks = () => {
    const [salarySetupInfo, setSalarySetupInfo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi.get('/user')
            .then((res) => {
                // console.log(res)
                setSalarySetupInfo(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setSalarySetupInfo([]);
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

    return { salarySetupInfo, error, loading, refetchData };
};

export default useSalarySetupHooks;

