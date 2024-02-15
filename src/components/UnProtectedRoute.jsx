import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const UnProtectedRoute = ({children,authentication}) => {
    let location = useLocation();
    if(authentication) {
        return <Navigate to="/account" state={{ from: location}} replace />
    }
 return children

};

export default UnProtectedRoute;