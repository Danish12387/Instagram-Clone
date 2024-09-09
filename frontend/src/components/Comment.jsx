import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'

const Comment = ({ comment }) => {
    return (
        <div className='my-4'>
            <div className='flex gap-3 items-center'>
                <Link to={`/profile/${comment?.author?._id}`}>
                    <Avatar>
                        <AvatarImage src={comment?.author?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <Link to={`/profile/${comment?.author?._id}`}><h1 className='font-bold text-sm'>{comment?.author.username}</h1></Link>
                <span className='font-normal pl-1'>{comment?.text}</span>
            </div>
        </div>
    )
}

export default Comment