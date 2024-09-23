import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { setAuthUser } from '@/redux/authSlice';

const SuggestedUsers = () => {
    const { suggestedUsers, API_END_POINT, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const followUnfollowHandler = async (userId) => {
        try {
            const res = await axios.get(`${API_END_POINT}/api/v1/user/followorunfollow/${userId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-500'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((suggestedUser, index) => {
                    return (
                        <div key={index} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${suggestedUser?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={suggestedUser?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${suggestedUser?._id}`}>{suggestedUser?.username}</Link></h1>
                                    <span className='text-gray-500 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span onClick={() => followUnfollowHandler(suggestedUser._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>{user.following.includes(suggestedUser._id) ? "Following" : "Follow"}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers