// import React from 'react'

// const Contact = () => {
//     const handleFormSubmit = (formData)=>{
//         const formInputData = Object.fromEntries(formData.entries())
//         console.log(formInputData)
//     }
//   return (
//     <section className='section-contact'>
//         <h2 className='container-title'>Contact Us</h2>
//         <div className='contact-wrapper container'>
//         <form action={handleFormSubmit}>
//             <input type="text" 
//             className='form-control'
//             required
//             autoComplete='off'
//             placeholder='Enter your name'
//             name='username'
//             />
//             <input type="email" 
//             className='form-control'
//             required
//             autoComplete='off'
//             placeholder='Enter your email'
//             name='email'
//             />

//             <textarea 
//             className='form-control'
//             rows="10"
//             placeholder='Enter your message'
//             name='message'
//             required
//             autoComplete='off'
//             ></textarea>
//             <button type='submit' value='send'>Send</button>
//         </form>
//         </div>
//     </section>
//   )
// }

// export default Contact

import React, { useState } from 'react'
// import './Contact.css'

const Contact = () => {
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('Sending...')
        
        const form = e.target
        const data = new FormData(form)
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/jafaralijafar2006@gmail.com', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            
            const result = await response.json()
            
            if (result.success) {
                setStatus('Message sent successfully! ✅')
                form.reset()
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setStatus('')
                }, 5000)
            } else {
                setStatus('Failed to send. Please try again. ❌')
            }
        } catch (error) {
            setStatus('Network error. Please try again. ❌')
        }
    }

    return (
        <section className='section-contact'>
            <h2 className='container-title'>Contact Us</h2>
            <div className='contact-wrapper container'>
                <form onSubmit={handleSubmit}>
                    {/* Add this hidden input for FormSubmit */}
                    <input 
                        type="hidden" 
                        name="_subject" 
                        value="New message from WorldAtlas website!" 
                    />
                    <input 
                        type="hidden" 
                        name="_template" 
                        value="table" 
                    />
                    <input 
                        type="hidden" 
                        name="_captcha" 
                        value="false" 
                    />
                    
                    <input 
                        type="text" 
                        className='form-control'
                        required
                        placeholder='Your Name'
                        name='name'
                    />
                    <input 
                        type="email" 
                        className='form-control'
                        required
                        placeholder='Your Email'
                        name='email'
                    />
                    <textarea 
                        className='form-control'
                        rows="10"
                        placeholder='Your Message'
                        name='message'
                        required
                    ></textarea>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <button type='submit'>Send Message</button>
                        {status && (
                            <span className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>
                                {status}
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact