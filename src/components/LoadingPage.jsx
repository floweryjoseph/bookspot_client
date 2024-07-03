import React from 'react'
import { Loader } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center  bg-gray-950'>
        <Loader className='w-16 h-16 animate-spin text-gray-400' />
    </div>
  )
}

export default LoadingPage