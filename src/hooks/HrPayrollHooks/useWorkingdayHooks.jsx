import { useState, useEffect } from 'react';
import secureApi from '../../api/secureApi'; // Import your Axios instance

const useWorkingdayHooks = () => {
    const [workingdayInfo, setWorkingDayInfo] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        secureApi.get('/show-workingdays')
            .then((res) => {
                // console.log(res)
                setWorkingDayInfo(res);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setWorkingDayInfo([]);
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

    return { workingdayInfo, error, loading, refetchData };
};

export default useWorkingdayHooks;

