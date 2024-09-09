import React from 'react'

function Loading() {
    return (
        <div className='absolute w-screen h-screen flex items-center justify-center bg-white dark:bg-black' style={{zIndex: '1000'}}>
            <img className='h-16' src="/insta-logo.png" alt="Loading" />
        </div>
    )
}

export default Loading;