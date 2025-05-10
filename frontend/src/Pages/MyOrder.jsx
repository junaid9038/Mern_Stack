import React from 'react'

const MyOrder = () => {
  return (
    <div>
      my order
      <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
        {/* left section */}
        <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
          <h1 className='text-2xl md:text-3xl font-bold mb-4'>Garbline India</h1>
          <p className='text-lg text-gray-500 mb-4'></p>
          </div>
      </div>  

    </div>
  )
}

export default MyOrder
