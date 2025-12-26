
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData, setUserData] = useContext(AuthContext)

  return (
    <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6 mt-4 md:mt-6'>
        <h2 className='text-xl md:text-2xl font-bold text-white mb-4 md:mb-6'>Employee Task Overview</h2>
    
        <div className='hidden lg:block'>
            <div className='bg-gradient-to-r from-emerald-500 to-emerald-600 mb-3 py-3 px-4 md:px-6 flex justify-between rounded-xl'>
                <h2 className='text-base md:text-lg font-semibold w-1/5'>Employee Name</h2>
                <h3 className='text-base md:text-lg font-semibold w-1/5 text-center'>New Task</h3>
                <h5 className='text-base md:text-lg font-semibold w-1/5 text-center'>Active Task</h5>
                <h5 className='text-base md:text-lg font-semibold w-1/5 text-center'>Completed</h5>
                <h5 className='text-base md:text-lg font-semibold w-1/5 text-center'>Failed</h5>
            </div>
            
            <div className='space-y-3'>
                {userData.map(function(employee, idx){
                    return (
                        <div key={idx} className='bg-gray-700/30 border border-gray-600/50 mb-2 py-3 px-4 md:px-6 flex justify-between rounded-xl hover:bg-gray-700/50 transition-colors'>
                            <h2 className='text-sm md:text-base font-medium w-1/5 truncate'>
                                {employee.firstName} {employee.lastName}
                            </h2>
                            <h3 className='text-sm md:text-base font-semibold w-1/5 text-center text-blue-400'>
                                {employee.taskCounts.newTask}
                            </h3>
                            <h5 className='text-sm md:text-base font-semibold w-1/5 text-center text-yellow-400'>
                                {employee.taskCounts.active}
                            </h5>
                            <h5 className='text-sm md:text-base font-semibold w-1/5 text-center text-green-400'>
                                {employee.taskCounts.completed}
                            </h5>
                            <h5 className='text-sm md:text-base font-semibold w-1/5 text-center text-red-400'>
                                {employee.taskCounts.failed}
                            </h5>
                        </div>
                    )
                })}
            </div>
        </div>

        <div className='lg:hidden space-y-4'>
            {userData.map(function(employee, idx){
                return (
                    <div key={idx} className='bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 hover:bg-gray-700/50 transition-colors'>
                        <div className='flex justify-between items-center mb-4 pb-3 border-b border-gray-600/50'>
                            <h2 className='text-base font-semibold text-white'>
                                {employee.firstName} {employee.lastName}
                            </h2>
                            <span className='text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded'>
                                Total: {employee.tasks.length}
                            </span>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30'>
                                <div className='text-lg font-bold text-blue-400'>{employee.taskCounts.newTask}</div>
                                <div className='text-xs text-blue-300'>New Tasks</div>
                            </div>
                            <div className='text-center p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30'>
                                <div className='text-lg font-bold text-yellow-400'>{employee.taskCounts.active}</div>
                                <div className='text-xs text-yellow-300'>Active</div>
                            </div>
                            <div className='text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30'>
                                <div className='text-lg font-bold text-green-400'>{employee.taskCounts.completed}</div>
                                <div className='text-xs text-green-300'>Completed</div>
                            </div>
                            <div className='text-center p-3 bg-red-500/20 rounded-lg border border-red-500/30'>
                                <div className='text-lg font-bold text-red-400'>{employee.taskCounts.failed}</div>
                                <div className='text-xs text-red-300'>Failed</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {userData.length === 0 && (
            <div className='text-center py-8'>
                <div className='text-4xl mb-3'>👥</div>
                <h3 className='text-lg font-semibold text-gray-300 mb-2'>No Employees Found</h3>
                <p className='text-gray-400 text-sm'>
                    Employee data will appear here once added to the system.
                </p>
            </div>
        )}
    </div>
  )
}

export default AllTask