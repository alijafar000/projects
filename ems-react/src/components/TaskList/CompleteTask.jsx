import React from 'react'

const CompleteTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 md:p-6 shadow-lg border border-blue-400/30'>
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium'>
                    {data.category}
                </span>
                <span className='text-white text-sm bg-black/20 px-2 py-1 rounded'>
                    {new Date(data.taskDate).toLocaleDateString()}
                </span>
            </div>

            <h2 className='text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2'>
                {data.taskTitle}
            </h2>

            <p className='text-blue-100 text-sm mb-6 line-clamp-3'>
                {data.taskDescription}
            </p>

            <div className='flex justify-between items-center'>
                <span className='text-blue-200 text-xs'>COMPLETED</span>
                <span className='px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold'>
                    ✓ Completed
                </span>
            </div>
        </div>
    )
}

export default CompleteTask