import { useNavigate } from "react-router";
import { auth } from "../../utils/firebase";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { resetEmployeeDetails } from "../../app/feature/userSlice";

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signOutUser = async() => {
    try {
      await auth.signOut();
      dispatch(resetEmployeeDetails())
      navigate("/login")
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  }

  return (
    <div className=' w-full h-16 text-white flex justify-between items-center'>
      <div className='px-10 mt-2'>
        <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1VhuUrB-6G8DgeSOoEGZR40pbtRu1ssGkQ&s" 
            alt="" 
            className='h-24 w-24 ml-4'
        />
      </div>
      <div className='flex items-center pr-10 text-black'>
        <p className='mx-6'>Welcome Admin</p>
        <button className='bg-black  text-white font-bold px-4 py-2' onClick={signOutUser}>Sign Out</button>
      </div>
    </div>
  )
}

export default Nav
