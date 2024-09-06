import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const { API_END_POINT } = useSelector(store => store.auth);
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/api/v1/user/suggested`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSuggestedUsers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    }, []);
};
export default useGetSuggestedUsers;