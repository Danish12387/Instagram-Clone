import React from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useSelector } from 'react-redux';
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useLocation } from 'react-router-dom';

const side = 'left';

export function Notification({ item }) {
    const { likeNotification, isNewNotification } = useSelector(store => store.realTimeNotification);
    const { pathname } = useLocation();

    return (
        <Sheet key={side} >
            <SheetTrigger className={`flex items-center relative gap-3 hover:bg-gray-100 dark:hover:bg-gray-950 cursor-pointer rounded-lg p-3 ${pathname !== '/chat' && 'xl:pr-16'} my-3`}>
                {item.icon}
                {pathname !== '/chat' && <span className='xl:block hidden font-semibold'>{item.text}</span>}
                {isNewNotification.length > 0 && (
                    <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{isNewNotification.length}</Button>
                )}
            </SheetTrigger>
            <SheetContent side={side} className="dark:bg-black border-gray-600">
                <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                        {
                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                likeNotification?.map((notification) => {
                                    return (
                                        <Link to={`/profile/${notification.userId}`} key={notification.userId}>
                                            <div key={notification.userId} className='flex items-center gap-2 my-2 hover:bg-gray-100 p-2 rounded-lg dark:hover:bg-gray-950'>
                                                <Avatar>
                                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                            </div>
                                        </Link>
                                    )
                                })
                            )
                        }
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}
