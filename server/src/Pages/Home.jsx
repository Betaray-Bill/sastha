import React from 'react' 
import Nav from '../Layout/Components/Nav'
import { Outlet } from 'react-router'

function Home() {
  return (
    <div className=''>
      <Nav />
      <Outlet />
    </div>
  )
}

export default Home
