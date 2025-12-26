
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const TaskListNumbers = ({ data }) => {
    const [userData] = useContext(AuthContext)
    

    const currentEmployee = userData.find(emp => emp.email === data.email)
    const employeeData = currentEmployee || data

    const stats = [
        {
            count: employeeData?.taskCounts?.newTask || 0,
            label: 'New Tasks',
            gradient: 'from-blue-500 via-blue-600 to-blue-700',
            border: 'border-blue-400/30',
            textColor: 'text-blue-50',
            subTextColor: 'text-blue-200'
        },
        {
            count: employeeData?.taskCounts?.active || 0,
            label: 'In Progress',
            gradient: 'from-yellow-500 via-yellow-600 to-yellow-700',
            border: 'border-yellow-400/30',
            textColor: 'text-yellow-50',
            subTextColor: 'text-yellow-200'
        },
        {
            count: employeeData?.taskCounts?.completed || 0,
            label: 'Completed',
            gradient: 'from-green-500 via-green-600 to-green-700',
            border: 'border-green-400/30',
            textColor: 'text-green-50',
            subTextColor: 'text-green-200'
        },
        {
            count: employeeData?.taskCounts?.failed || 0,
            label: 'Failed',
            gradient: 'from-red-500 via-red-600 to-red-700',
            border: 'border-red-400/30',
            textColor: 'text-red-50',
            subTextColor: 'text-red-200'
        }
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg border ${stat.border} hover:scale-105 transition-transform duration-300`}
                >
                    <div className={`text-3xl md:text-4xl font-bold ${stat.textColor} mb-2`}>
                        {stat.count}
                    </div>
                    <div className={`text-sm md:text-base font-semibold ${stat.subTextColor}`}>
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TaskListNumbers