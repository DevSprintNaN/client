import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dispatch from '../context/dispatch/dispatch';
import actions from '../context/dispatch/actions';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setToken } from '../context/auth/actions';

export const useNavbar=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const authDisapatch=useDispatch();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut=async()=>{
        authDisapatch(setAuthenticated(false));
        authDisapatch(setToken(null));
        localStorage.clear();
        navigate('/');
    }

    return {toggleMenu,handleLogOut,isOpen}
}