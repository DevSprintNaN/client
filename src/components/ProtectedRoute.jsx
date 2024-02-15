import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children,authentication}) => {
    let location = useLocation();
    if(!authentication) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;