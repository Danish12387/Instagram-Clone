import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    const { API_END_POINT } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/api/v1/post/all`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;