import React from 'react'
import { useGoogleAuth } from '../../context/GoogleAuthContext.jsx';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedRoute() {
    const { isAuthenticated } = useGoogleAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // not signed in → redirect to login, but remember where they wanted to go
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return (
        <Outlet />
    )
}
