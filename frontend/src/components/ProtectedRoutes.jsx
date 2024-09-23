import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import { setUserProfile } from '@/redux/authSlice';

const ProtectedRoutes = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const [isloading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUserProfile(null));
    }, [pathname])

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [user, navigate])

    if (isloading) return <Loading />

    return <>{children}</>
}

export default ProtectedRoutes;