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
} from "@/components/ui/sheet";
import { Input } from './ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';

const SearchUser = ({ open, setOpen }) => {
    const [input, setInput] = useState();
    const { suggestedUsers } = useSelector(store => store.auth);
    const [results, setResults] = useState();

    const side = 'left';

    const search = (e) => {
        setInput(e.target.value);
        const results = suggestedUsers.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()));
        if (e.target.value) {
            setResults(results);
        } else {
            setResults();
        }
    }

    return (
        <Sheet key={side} open={open}>
            <SheetContent onInteractOutside={() => setOpen(false)} side={side} className="dark:bg-black border-gray-600">
                <SheetHeader>
                    <SheetTitle className="text-2xl mb-6">Search</SheetTitle>
                    <SheetDescription>
                        <Input
                            className="focus-visible:ring-transparent dark:focus-visible:ring-transparent h-11 text-black dark:text-white"
                            type="text"
                            value={input}
                            onChange={search}
                            placeholder="Search"
                        />
                        <div className='my-6'>
                            {
                                results?.length > 0 ? (
                                    results?.map((user) => {
                                        return (
                                            <Link to={`/profile/${user?._id}`}>
                                                <div className='flex items-center gap-4 dark:hover:bg-gray-800 hover:bg-gray-100 px-2 py-3'>
                                                    <Avatar>
                                                        <AvatarImage src={user?.profilePicture} alt="user_img" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h2 className='text-black dark:text-white text-[16px]'>{user?.username}</h2>
                                                        <span>{user?.bio}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                )
                                    :
                                    <div className='text-center'>No results found.</div>
                            }
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default SearchUser;