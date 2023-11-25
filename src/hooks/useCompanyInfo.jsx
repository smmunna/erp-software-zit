import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Import your Axios instance
import axios from 'axios';

const useCompanyInfo = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi.get('/company-details')
            .then((res) => {
                // console.log(res)
                setCompanyInfo(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setCompanyInfo([]);
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

    return { companyInfo, error, loading, refetchData };
};

export default useCompanyInfo;

