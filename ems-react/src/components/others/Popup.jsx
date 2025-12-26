import React, { useEffect } from 'react'

const Popup = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500'
            case 'error':
                return 'bg-red-500'
            case 'warning':
                return 'bg-yellow-500'
            default:
                return 'bg-emerald-500'
        }
    }

    return (
        <div className={`fixed top-5 right-5 ${getBackgroundColor()} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}>
            <div className="flex items-center">
                <span className="mr-2">
                    {type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
                </span>
                <span className="font-medium">{message}</span>
            </div>
        </div>
    )
}

export default Popup