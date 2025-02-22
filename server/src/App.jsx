import {useState} from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'

function App() {

    return (
        <div>
            <Routes>
                <Route element={<ProtectedRoutes /> }>
                    <Route index element={< Home />}/>
                </Route>
                
                <Route path="login" element={<Login />}/>
            </Routes>

        </div>
    )
}

export default App
