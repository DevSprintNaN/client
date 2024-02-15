import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children,authentication}) => {
    let location = useLocation();
    if(!authentication) {
        return <Navigate to="/error404" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;