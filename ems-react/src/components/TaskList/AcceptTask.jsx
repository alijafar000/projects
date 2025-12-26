
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Popup from '../others/Popup'
import { updateUserData } from '../../firebase'

const AcceptTask = ({ data, employeeData }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [actionTaken, setActionTaken] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [popupType, setPopupType] = useState('success')

    const showNotification = (message, type) => {
        setPopupMessage(message)
        setPopupType(type)
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
    }

    const markCompleted = () => {
        if (actionTaken) return

        setActionTaken(true)
        const updatedData = userData.map(employee => {
            if (employee.email === employeeData.email) {
                const updatedTasks = employee.tasks.map(task =>
                    task.id === data.id
                        ? { ...task, active: false, completed: true }
                        : task
                )

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...employee.taskCounts,
                        active: employee.taskCounts.active - 1,
                        completed: employee.taskCounts.completed + 1
                    }
                }
            }
            return employee
        })

        // ✅ Update both context and Firebase
        setUserData(updatedData)
        updateUserData(updatedData)
        
        showNotification('Task completed successfully!', 'success')
    }

    const markFailed = () => {
        if (actionTaken) return

        setActionTaken(true)
        const updatedData = userData.map(employee => {
            if (employee.email === employeeData.email) {
                const updatedTasks = employee.tasks.map(task =>
                    task.id === data.id
                        ? { ...task, active: false, failed: true }
                        : task
                )

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...employee.taskCounts,
                        active: employee.taskCounts.active - 1,
                        failed: employee.taskCounts.failed + 1
                    }
                }
            }
            return employee
        })

        // ✅ Update both context and Firebase
        setUserData(updatedData)
        updateUserData(updatedData)
        
        showNotification('Task marked as failed', 'error')
    }

    return (
        <div className='flex-shrink-0 w-80 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 shadow-lg border border-yellow-400/30 hover:shadow-yellow-500/20 transition-all'>
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-full font-medium capitalize'>
                    {data.category || 'General'}
                </span>
                <span className='text-white text-sm bg-black/30 px-3 py-1 rounded-full font-medium'>
                    {data.taskDate ? new Date(data.taskDate).toLocaleDateString() : 'No date'}
                </span>
            </div>

            <h2 className='text-xl font-bold text-white mb-3 line-clamp-2 leading-tight'>
                {data.taskTitle || 'Untitled Task'}
            </h2>

            <p className='text-yellow-50 text-sm mb-6 line-clamp-3 leading-relaxed'>
                {data.taskDescription || 'No description provided.'}
            </p>

            <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                    <span className='text-yellow-100 text-xs font-semibold bg-yellow-600/30 px-2 py-1 rounded'>
                        IN PROGRESS
                    </span>
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={markCompleted}
                        disabled={actionTaken}
                        className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${actionTaken
                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                : 'bg-green-600 text-green-600 hover:bg-green-700 hover:scale-105 shadow-lg'
                            }`}
                    >
                        {actionTaken ? '✓ Done' : 'Complete'}
                    </button>
                    <button
                        onClick={markFailed}
                        disabled={actionTaken}
                        className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${actionTaken
                                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                : 'bg-red-600 text-red-600 hover:bg-red-700 hover:scale-105 shadow-lg'
                            }`}
                    >
                        {actionTaken ? '✗ Done' : 'Failed'}
                    </button>
                </div>
            </div>

            {showPopup && (
                <Popup
                    message={popupMessage}
                    type={popupType}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    )
}

export default AcceptTask