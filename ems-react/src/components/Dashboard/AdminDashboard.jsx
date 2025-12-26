import React from 'react'
import Header from '../others/Header'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTask'

const AdminDashboard = (props) => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-4 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto'>
                <Header changeUser={props.changeUser} />
                <CreateTask />
                <AllTask />
            </div>
        </div>
    )
}

export default AdminDashboard