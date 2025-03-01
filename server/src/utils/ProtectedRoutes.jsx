import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router'
export default function PrivateRoute() {
  const {employeeDetails} = useSelector(state => state.employeeDetails)

  console.log(employeeDetails)
  return employeeDetails ? <Outlet/> : <Navigate to='/login'/>
}