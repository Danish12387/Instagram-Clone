import { Heart, Home, LogOut, Menu, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { clearNotifications } from '@/redux/rtnSlice';
import { Notification } from './Notification'
import { ModeToggle } from './mode-toggle'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const { pathname } = useLocation();
    // const [isNewNoti, setIsNewNoti] = useState([]);
    // useEffect(() => {
    //     setIsNewNoti(likeNotification);
    // }, [likeNotification])

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        } else if (textType === 'Notifications') {
            // setIsNewNoti([]);
            dispatch(clearNotifications());
        } else if (textType === "More") {
            setOpenMenu(true);
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="PfP" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        // { icon: <LogOut />, text: "Logout" },
        { icon: <Menu />, text: "More" }
    ]

    return (
        <div className={`fixed top-0 z-10 left-0 px-4 border-r border-gray-600 h-screen`}>
            <div className='flex flex-col'>
                {/* <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1> */}

                {
                    pathname === "/chat" ?
                        <div className='h-8 mt-10 mb-6 mx-auto'>
                            <img className='h-full' src="/insta-logo.png" alt="Instagram Logo" />
                        </div>
                        :
                        <div className='h-8 mt-10 mb-6 pl-3'>
                            <img className='h-full' src="/insta-text.png" alt="Instagram Logo" />
                        </div>
                }

                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={index} >
                                    {item.text !== "Notifications" ? (
                                        <div className={`flex items-center ${pathname !== '/chat' && 'xl:pr-16'} gap-3 hover:bg-gray-100 dark:hover:bg-gray-950 cursor-pointer rounded-lg p-3 my-3`}>
                                            {item.icon}

                                            {pathname !== '/chat' && <span className='xl:block hidden font-semibold'>{item.text}</span>}
                                        </div>
                                    ) : (
                                        <Notification item={item} />
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />

            <Popover open={openMenu}>
                <PopoverTrigger>
                </PopoverTrigger>
                <PopoverContent onInteractOutside={() => setOpenMenu(false)} className="mb-20 ml-4 w-60 p-2 dark:bg-[rgb(2,6,23)]">
                    <div>
                        <div className='flex justify-between px-2 items-center'>
                            <span>Toggle Theme</span>
                            <ModeToggle />
                        </div>
                        <div onClick={logoutHandler} className={`flex h-12 items-center gap-3 hover:bg-gray-100 dark:hover:bg-[rgb(3,9,37)] cursor-pointer rounded-lg p-3 my-3`}>
                            <LogOut />
                            <span className='font-semibold'>Logout</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default LeftSidebar