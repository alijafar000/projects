
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Popup from './Popup'
import { updateUserData } from '../../firebase'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [popupType, setPopupType] = useState('success')
    const [isProcessing, setIsProcessing] = useState(false)

    // ✅ IMPROVED EMAIL OPENING FUNCTION
    const openEmailClient = (email, subject, body) => {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        console.log('📧 Attempting to open email client...');
        
        // Method 1: Try window.open first
        const emailWindow = window.open(mailtoLink, '_blank');
        
        // Check if window opened successfully
        if (emailWindow && !emailWindow.closed) {
            console.log('✅ Email client opened in new tab');
            return true;
        } else {
            console.log('❌ New tab blocked, trying alternative method...');
            
            // Method 2: Use anchor tag click
            try {
                const link = document.createElement('a');
                link.href = mailtoLink;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log('✅ Email client opened via anchor tag');
                return true;
            } catch (error) {
                console.log('❌ Anchor method failed, trying location change...');
                
                // Method 3: Change current window location
                try {
                    window.location.href = mailtoLink;
                    console.log('✅ Email client opened via location change');
                    return true;
                } catch (locationError) {
                    console.log('❌ All methods failed');
                    return false;
                }
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        if (!taskTitle || !taskDescription || !taskDate || !asignTo || !category) {
            setPopupMessage('Please fill all required fields!')
            setPopupType('error')
            setShowPopup(true)
            setIsProcessing(false)
            return
        }

        const newTask = { 
            id: Date.now(),
            taskTitle, 
            taskDescription, 
            taskDate, 
            category, 
            active: false, 
            newTask: true, 
            failed: false, 
            completed: false 
        }

        // Find assigned employee
        const assignedEmployee = userData.find(emp => emp.firstName === asignTo)
        
        if (!assignedEmployee) {
            setPopupMessage('Selected employee not found!')
            setPopupType('error')
            setShowPopup(true)
            setIsProcessing(false)
            return
        }

        // Update task data in context
        const updatedData = userData.map(employee => {
            if (employee.firstName === asignTo) {
                const updatedEmployee = {
                    ...employee,
                    tasks: [...employee.tasks, newTask],
                    taskCounts: {
                        ...employee.taskCounts,
                        newTask: employee.taskCounts.newTask + 1
                    }
                }
                return updatedEmployee
            }
            return employee
        })

        // ✅ IMPORTANT: Update both context and Firebase
        setUserData(updatedData)
        updateUserData(updatedData) // Sync to all devices

        // ✅ EMAIL NOTIFICATION WITH MULTIPLE METHODS
        const emailSubject = `🎯 New Task Assigned: ${taskTitle}`;
        const formattedDate = new Date(taskDate).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const emailBody = `
Hello ${assignedEmployee.firstName},

You have been assigned a new task in the Employee Management System.

📋 TASK DETAILS:
────────────────
• Task Title: ${taskTitle}
• Description: ${taskDescription}
• Due Date: ${formattedDate}
• Category: ${category}
• Assigned By: Jafar

📊 ACTION REQUIRED:
────────────────
Please log in to your employee dashboard to:
✓ Accept the task
✓ Update progress  
✓ Mark as complete/failed

🔗 Quick Access: https://alijafarali-ems.netlify.app/

Best regards,
Admin Jafar
Employee Management System
────────────────
This is an automated notification.
        `.trim();

        // Open email client
        const emailOpened = openEmailClient(assignedEmployee.email, emailSubject, emailBody);

        // Show appropriate message
        if (emailOpened) {
            setPopupMessage(`Task created for ${assignedEmployee.firstName}! Email client opened 📧`)
            setPopupType('success')
        } else {
            setPopupMessage(`Task created for ${assignedEmployee.firstName}! But email client failed to open. Please manually email: ${assignedEmployee.email}`)
            setPopupType('warning')
        }

        setShowPopup(true)

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
        setIsProcessing(false)
    }

    return (
        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6'>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-4 md:mb-6'>
                Create New Task {isProcessing && '⏳'}
            </h2>
            
            <form onSubmit={submitHandler} className='space-y-4 md:space-y-6'>
        
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            
                    <div className='space-y-4 md:space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Task Title *
                            </label>
                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400'
                                type="text"
                                placeholder='Enter task title'
                                required
                            />
                        </div>
                        
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Due Date *
                            </label>
                            <input
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all'
                                type="date"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Assign to Employee *
                            </label>
                            <select
                                value={asignTo}
                                onChange={(e) => setAsignTo(e.target.value)}
                                className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all'
                                required
                            >
                                <option value="">Select Employee</option>
                                {userData.map(employee => (
                                    <option key={employee.id} value={employee.firstName}>
                                        {employee.firstName} {employee.lastName} - {employee.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Category *
                            </label>
                            <input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400'
                                type="text"
                                placeholder='e.g., Design, Development, Marketing'
                                required
                            />
                        </div>
                    </div>

                
                    <div className='flex flex-col'>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Task Description *
                        </label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className='flex-1 w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl p-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none'
                            placeholder='Enter detailed task description...'
                            rows={8}
                            required
                        />
                    </div>
                </div>

    
                <div className='bg-blue-500/10 border border-blue-500/30 rounded-xl p-4'>
                    <div className='flex items-start'>
                        <span className='text-blue-400 mr-3'>📧</span>
                        <div>
                            <h4 className='text-blue-300 font-semibold'>Email Notification</h4>
                            <p className='text-blue-200 text-sm mt-1'>
                                After creating the task, your email client will open automatically with a pre-filled notification.
                                You just need to click "Send" to notify the employee.
                            </p>
                        </div>
                    </div>
                </div>

    
                <div className='flex justify-center pt-2'>
                    <button 
                        type="submit"
                        disabled={isProcessing}
                        className={`bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm md:text-base py-3 md:py-4 px-8 rounded-xl transition-all duration-300 shadow-lg w-full md:w-auto min-w-[200px] ${
                            isProcessing 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:from-emerald-600 hover:to-emerald-700 hover:scale-105 hover:shadow-emerald-500/25'
                        }`}
                    >
                        {isProcessing ? (
                            <span className='flex items-center justify-center'>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Task...
                            </span>
                        ) : (
                            'Create Task & Send Email'
                        )}
                    </button>
                </div>
            </form>

        
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

export default CreateTask