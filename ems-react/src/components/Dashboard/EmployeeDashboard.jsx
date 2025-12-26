
import React, { useContext } from 'react'
import Header from '../others/Header'
import TaskListNumbers from '../others/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = (props) => {
  const [userData] = useContext(AuthContext)
  
  const currentEmployee = userData.find(emp => emp.email === props.data?.email)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        <Header changeUser={props.changeUser} data={currentEmployee || props.data} />

        <div className='mb-8'>
          <TaskListNumbers data={currentEmployee || props.data} />
        </div>

        <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6'>
          <TaskList data={currentEmployee || props.data} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard