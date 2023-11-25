import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {

    if (localStorage.getItem('email')) {
        return children
    }
    return <Navigate to="/"></Navigate>
}

export default PrivateRoutes;