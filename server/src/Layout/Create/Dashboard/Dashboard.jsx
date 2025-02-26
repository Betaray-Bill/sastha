import React from 'react'

function Dashboard() {
  return (
    <div className='w-full bg-pink-200'>
      <div className='flex items-start justify-around'>
        {/* Output */}
        <div>
            <h1 className='text-4xl'>Dashboard</h1>
            <p className='text-lg'>Welcome to your dashboard</p>
        </div>
        {/* Add Variables */}
        <div className='grid place-content-center'>
            <div className='w-[250px] p-4 bg-blue-200 border-1'>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard