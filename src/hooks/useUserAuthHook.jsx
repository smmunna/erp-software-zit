import { useState, useEffect } from 'react';
import api from '../api/api'; // Import your API library here

const useUserAuthHook = () => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true)
    const [error, setError] = useState(null);

    const fetchUser = () => {
        const userEmail = localStorage.getItem('email');

        api.get(`/user`)
            .then(res => {
                const foundUser = res.find(user => user.email === userEmail);
                if (foundUser) {
                    setUser(foundUser); // Store the user data in state
                } else {
                    setError('User not found');
                }
            })
            .catch(err => {
                setError(err.message || 'An error occurred while fetching user data');
            })
            .finally(() => {
                setUserLoading(false);
            });
    };

    useEffect(() => {
        fetchUser();
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    const refetch = () => {
        setUserLoading(true);
        setError(null);
        fetchUser();
    };

    return {
        user,
        userLoading,
        error,
        refetch
    };
};

export default useUserAuthHook;
