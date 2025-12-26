import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    const tasks = data?.tasks || []

    return (
        <div className='mt-6'>
            <div id='tasklist' className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-white'>Your Tasks</h2>
                <span className='text-gray-400 text-sm'>
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                </span>
            </div>

            {tasks.length === 0 ? (
                <div id='tasklist' className='text-center py-12 bg-gray-700/30 rounded-2xl border border-gray-600/50'>
                    <div className='text-6xl mb-4'>📋</div>
                    <h3 className='text-xl font-semibold text-gray-300 mb-2'>No tasks assigned</h3>
                    <p className='text-gray-400 max-w-md mx-auto'>
                        You're all caught up! New tasks assigned by admin will appear here.
                    </p>
                </div>
            ) : (
                <div id='tasklist' className='flex overflow-x-auto pb-6 gap-4 md:gap-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
                    {tasks.map((task, idx) => {
                        if (task.active) {
                            return <AcceptTask key={task.id || idx} data={task} employeeData={data} />
                        }
                        if (task.newTask) {
                            return <NewTask key={task.id || idx} data={task} employeeData={data} />
                        }
                        if (task.completed) {
                            return <CompleteTask key={task.id || idx} data={task} employeeData={data} />
                        }
                        if (task.failed) {
                            return <FailedTask key={task.id || idx} data={task} employeeData={data} />
                        }
                        return null
                    })}
                </div>
            )}
        </div>
    )
}

export default TaskList