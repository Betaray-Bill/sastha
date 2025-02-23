import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router'
export default function PrivateRoute() {
  const {user} = useSelector(state => state.user)


  return !user ? <Outlet/> : <Navigate to='/login'/>
}