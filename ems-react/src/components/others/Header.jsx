import React from 'react'

const Header = (props) => {
    const getUsername = () => {
        if (!props.data) return 'Jafar'
        if (props.data.firstName && props.data.lastName) {
            return `${props.data.firstName} ${props.data.lastName}`
        }
        if (props.data.firstName) {
            return props.data.firstName
        }
        if (props.data.email) {
            return props.data.email.split('@')[0]
        }
        return 'Employee'
    }

    const username = getUsername()

    const logOutUser = () => {
        localStorage.removeItem('loggedInUser')
        props.changeUser(null)
    }

    return (
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6'>
            <div className='flex-1'>
                <h1 className='text-lg sm:text-xl font-medium text-gray-300'>
                    {props.data ? 'Employee Dashboard' : 'Admin Dashboard'} 👋
                </h1>
                <span className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block'>
                    {username}
                </span>
                <p className='text-gray-400 text-sm mt-1'>
                    {props.data ? 'Manage your tasks efficiently' : 'Manage employee tasks and progress'}
                </p>
            </div>
            <button 
                onClick={logOutUser} 
                className='bg-red-600 hover:bg-red-700 text-white font-medium text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors w-fit self-end sm:self-auto shadow-lg hover:shadow-red-500/25'
            >
                Log Out
            </button>
        </div>
    )
}

export default Header



