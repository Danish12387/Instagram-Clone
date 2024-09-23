import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from '../components/Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
import { Link, useLocation } from 'react-router-dom';
import TopLoading from '@/components/topLoading';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser, API_END_POINT } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`${API_END_POINT}/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, []);

    return (
        <div className='flex ml-[6%] h-screen'>
            <TopLoading />
            <section className='w-full md:w-[30%]'>
                <h1 className='flex items-center justify-left font-bold mb-4 px-3 h-20 text-xl border-b border-gray-600'>{user?.username}</h1>
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-950 cursor-pointer transition-all'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>
            {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-600 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 h-20 border-b border-gray-600 sticky top-0 z-10'>
                            <Link to={`/profile/${selectedUser._id}`}>
                                <Avatar>
                                    <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <Link to={`/profile/${selectedUser._id}`}>
                                <div className='flex flex-col'>
                                    <span>{selectedUser?.username}</span>
                                </div>
                            </Link>
                        </div>
                        <Messages selectedUser={selectedUser} />
                        <form onSubmit={(e) => { e.preventDefault(); sendMessageHandler(selectedUser?._id) }} className='flex items-center p-4'>
                            <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent dark:focus-visible:ring-transparent h-12 text-[16px]' placeholder="Messages..." />
                            <Button type='submit' className="h-11 text-[16px]">Send</Button>
                        </form>
                    </section>
                ) : (
                    <div className='flex flex-1 flex-col border-l border-l-gray-600 items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div >
    )
}

export default ChatPage