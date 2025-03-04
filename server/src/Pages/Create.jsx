import React, { useEffect, useState } from 'react'
import {Outlet, useParams} from 'react-router'
import Dashboard from '../Layout/Create/Dashboard'
import { useSelector } from 'react-redux'

function Create() {
    const params = useParams()
    const {generatorData} = useSelector((state) => state.generatorData)
    const [data, setData] = useState()
    useEffect(() => {
        console.log(params.id)
        let a = generatorData.filter((item) => item.id === params.id)
        setData([...a])
        console.log(a)
    }, [params.id])

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
