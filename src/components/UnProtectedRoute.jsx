import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate, useLocation} from "react-router-dom"

const UnProtectedRoute = ({children}) => {
    let location = useLocation();
    const token=useSelector((state)=>state.auth.token);
    if(token) {
        return <Navigate to="/account" state={{ from: location}} replace />
    }
 return children

};

export default UnProtectedRoute;