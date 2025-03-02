import './App.css'
import {Route, Routes} from 'react-router'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import Create from './Pages/Create.jsx'
import Nav from './Layout/Components/Nav.jsx'

function App() {

    return (
        <div>
            <Nav />
            <Routes>
                <Route element={< ProtectedRoutes />}>
                    <Route path='/'> 
                        <Route index element={< Home />} />
                        <Route path='create' element={< Create />}/>
                    </Route>
                </Route>

                <Route path="login" element={< Login />}/>
            </Routes>

        </div>
    )
}

export default App
