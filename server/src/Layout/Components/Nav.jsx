import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { toast } from "sonner";
import { useSelector,useDispatch } from "react-redux";
import { resetUser } from "../../app/feature/userSlice.js";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { LogOut, Home, FileText} from "lucide-react";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeDetails } = useSelector((state) => state.employeeDetails);
  console.log("employeeDetails", employeeDetails)
  const signOutUser = async () => {
    try {
      await auth.signOut();
      dispatch(resetUser(null));
      window.location.replace("/login");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="w-full h-16 bg-[#F5F5F5] text-black flex items-center justify-between px-6 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1VhuUrB-6G8DgeSOoEGZR40pbtRu1ssGkQ&s" 
          alt="Logo" 
          className="h-10 w-10 rounded-full"
        />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-black">
        <button onClick={() => navigate("/")} className="flex items-center space-x-2 hover:text-[#797979] hover:cursor-pointer">
          <Home size={18} /> <span>Dashboard</span>
        </button>
        <button onClick={() => navigate("/create")} className="flex items-center space-x-2 hover:text-[#797979] hover:cursor-pointer">
          <FileText size={18} /> <span>Create</span>
        </button>
      </div>
      
      {/* Separator & Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-[#754E1A]">{employeeDetails ? `Welcome, ${employeeDetails.email}` : "Welcome Admin"}</span>
        <Separator orientation="vertical" className="h-6 bg-gray-500" />
        <Button onClick={signOutUser} className="flex items-center space-x-2 bg-[#E50046] hover:cursor-pointer hover:bg-[#E50024]">
          <LogOut size={18} /> <span>Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}

export default Nav;
