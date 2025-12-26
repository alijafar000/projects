import React from 'react'

const FailedTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 md:p-6 shadow-lg border border-red-400/30'>
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-medium'>
                    {data.category}
                </span>
                <span className='text-white text-sm bg-black/20 px-2 py-1 rounded'>
                    {new Date(data.taskDate).toLocaleDateString()}
                </span>
            </div>

            <h2 className='text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2'>
                {data.taskTitle}
            </h2>

            <p className='text-red-100 text-sm mb-6 line-clamp-3'>
                {data.taskDescription}
            </p>

            <div className='flex justify-between items-center'>
                <span className='text-red-200 text-xs'>FAILED</span>
                <span className='px-3 py-1 bg-red-600 text-white text-xs rounded-full font-semibold'>
                    X Failed
                </span>
            </div>
        </div>
    )
}

export default FailedTask