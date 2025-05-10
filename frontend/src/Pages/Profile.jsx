import React from 'react'
import MyOrder from './MyOrder'

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-6'>
            {/* left section */}
            <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
             <h1 className='text-2xl md:text-3xl font-bold mb-4'>Garbline India</h1>
             <p className='text-lg text-gray-500 mb-4'>Info@garbline.com</p>
             <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Logout</button>
            </div>
            {/* right section */}
            <div className='w-full md:w-2/3 lg:w-2/3'>
             <MyOrder/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
