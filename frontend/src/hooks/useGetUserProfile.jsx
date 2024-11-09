import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    const { API_END_POINT } = useSelector(store => store.auth);
    // const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/api/v1/user/${userId}/profile`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId]);
};
export default useGetUserProfile;