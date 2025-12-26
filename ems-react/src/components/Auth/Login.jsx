import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
        <div className='w-full max-w-md mx-auto'>
            <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl'>
    
                <div className='text-center mb-8'>
                    <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2'>
                        Employee Management
                    </h1>
                    <p className='text-gray-400 text-sm md:text-base'>
                        Sign in to your account
                    </p>
                </div>
                <form 
                    onSubmit={(e)=>{
                        submitHandler(e)
                    }}
                    className='space-y-4 md:space-y-6'
                >
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>
                            Email Address
                        </label>
                        <input 
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            required 
                            className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 md:py-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400'
                            type="email" 
                            placeholder='Enter your email'
                            id="email"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-300 mb-2'>
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                            required 
                            className='w-full bg-gray-700/50 border border-gray-600 text-white text-sm md:text-base rounded-xl px-4 py-3 md:py-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400'
                            type="password" 
                            placeholder='Enter your password'
                            id="password"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className='w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm md:text-base py-3 md:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:scale-105 shadow-lg hover:shadow-emerald-500/25 mt-4'
                    >
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Login