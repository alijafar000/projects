
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Popup from '../others/Popup'
import { updateUserData } from '../../firebase'

const NewTask = ({ data, employeeData }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [actionTaken, setActionTaken] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const acceptTask = () => {
        if (actionTaken) return

        setActionTaken(true)
        const updatedData = userData.map(employee => {
            if (employee.email === employeeData.email) {
                const updatedTasks = employee.tasks.map(task =>
                    task.id === data.id
                        ? { ...task, newTask: false, active: true }
                        : task
                )

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...employee.taskCounts,
                        newTask: employee.taskCounts.newTask - 1,
                        active: employee.taskCounts.active + 1
                    }
                }
            }
            return employee
        })

        // ✅ Update both context and Firebase
        setUserData(updatedData)
        updateUserData(updatedData)
        
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
    }

    return (
        <div className='flex-shrink-0 w-80 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg border border-green-400/30 hover:shadow-green-500/20 transition-all'>
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-medium capitalize'>
                    {data.category || 'General'}
                </span>
                <span className='text-white text-sm bg-black/30 px-3 py-1 rounded-full font-medium'>
                    {data.taskDate ? new Date(data.taskDate).toLocaleDateString() : 'No date'}
                </span>
            </div>

            <h2 className='text-xl font-bold text-white mb-3 line-clamp-2 leading-tight'>
                {data.taskTitle || 'Untitled Task'}
            </h2>

            <p className='text-green-50 text-sm mb-6 line-clamp-3 leading-relaxed'>
                {data.taskDescription || 'No description provided.'}
            </p>

            <div className='flex justify-between items-center'>
                <span className='text-green-100 text-xs font-semibold bg-green-600/30 px-2 py-1 rounded'>
                    NEW
                </span>
                <button
                    onClick={acceptTask}
                    disabled={actionTaken}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${actionTaken
                            ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                            : 'bg-blue-600 text-green-600 hover:bg-blue-700 hover:scale-105 shadow-lg'
                        }`}
                >
                    {actionTaken ? '✓ Accepted' : 'Accept Task'}
                </button>
            </div>

            {showPopup && (
                <Popup
                    message="Task accepted successfully!"
                    type="success"
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    )
}

export default NewTask