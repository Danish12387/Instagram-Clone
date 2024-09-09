import React, { useEffect } from 'react'
import Feed from '../components/Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();

    return (
        <div className='flex container justify-between'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
            <div className='hidden md:block'>
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home