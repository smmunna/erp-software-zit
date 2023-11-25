import { useState, useEffect } from 'react';
import secureApi from '../api/secureApi'; // Import your Axios instance

const useIncomeList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [incomeall,setIncomeAll] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    secureApi
      .get('/income-list')
      .then((res) => {
        setIncomeList(res);
        setIncomeAll(res)
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setIncomeList([]);
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

  return { incomeList, incomeall,error, loading, refetchData };
};

export default useIncomeList;
