import React from 'react'
import {Outlet} from 'react-router'
import Dashboard from '../Layout/Create/Dashboard/Dashboard'

function Create() {
    return (
        <div className='mt-8 w-full h-full min-h-screen '>
            
            {/* Header */}
            <div>
                <h1 className='text-4xl font-bold text-center'>Create Content</h1>
            </div>

            {/* Dashboard */}
            <Dashboard />
        </div>
    )
}

export default Create
