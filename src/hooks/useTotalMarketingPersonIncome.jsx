import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Axios instance

const useTotalMarketingPersonIncome = () => {
    const [totalMarktingPersonIncome, setTotalMarketingPersonIncome] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi
            .get('/increp-markperson')
            .then((res) => {
                // setTotalMarketingPersonIncome(res);
                if (res) {
                    res.map((data) => {
                        setTotalMarketingPersonIncome(data);
                    })
                    setError(null);
                }
            })
            .catch((error) => {
                setError(error);
                setTotalMarketingPersonIncome([]);
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

    return { totalMarktingPersonIncome, error, loading, refetchData };
};

export default useTotalMarketingPersonIncome;
