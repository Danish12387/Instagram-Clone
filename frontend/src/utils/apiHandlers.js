// src/utils/apiHandlers.js
import { setAuthUser } from '@/redux/authSlice';
import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import { toast } from 'sonner';

export const followUnfollowHandler = async (userId, dispatch, API_END_POINT) => {
    try {
        const res = await axios.get(`${API_END_POINT}/api/v1/user/followorunfollow/${userId}`, {
            withCredentials: true,
        });

        if (res.data.success) {
            dispatch(setAuthUser(res.data.user));
        }
    } catch (error) {
        console.log(error);
    }
};

export const deletePostHandler = async (post, posts, dispatch, API_END_POINT) => {
    try {
        const res = await axios.delete(`${API_END_POINT}/api/v1/post/delete/${post?._id}`, {
            withCredentials: true,
        });
        if (res.data.success) {
            const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
            dispatch(setPosts(updatedPostData));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
    }
};

export const bookmarkHandler = async (post, dispatch, API_END_POINT) => {
    try {
        const res = await axios.get(`${API_END_POINT}/api/v1/post/${post?._id}/bookmark`, {
            withCredentials: true,
        });
        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(setAuthUser(res.data.user));
        }
    } catch (error) {
        console.log(error);
    }
};
