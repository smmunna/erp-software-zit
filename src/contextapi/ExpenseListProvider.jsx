import React, { createContext, useContext, useState, useEffect } from 'react';
import secureApi from '../api/secureApi';

// Create a context for ExpenseList
const ExpenseListContext = createContext();

// Create a provider component for ExpenseList
export const ExpenseListProvider = ({ children }) => {
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
    }, []);

    const refetchData = () => {
        setLoading(true);
        fetchData();
    };

    // Use useMemo to avoid recreating the context value on every render
    const contextValue = React.useMemo(() => ({ data, error, loading, refetchData }), [data, error, loading]);

    return (
        <ExpenseListContext.Provider value={contextValue}>
            {children}
        </ExpenseListContext.Provider>
    );
};

// Create a custom hook to consume the ExpenseList context
export const useExpenseList = () => {
    const context = useContext(ExpenseListContext);
    if (!context) {
        throw new Error('useExpenseList must be used within an ExpenseListProvider');
    }
    return context;
};
