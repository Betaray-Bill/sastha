import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from "../app/feature/userSlice";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [isAuth , setIsAuth] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if (validateForm()) {
        console.log("Form submitted", formData);
        // Add login logic here

        await signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Register
                    console.log(userCredential)
                    const user = userCredential.user;
                    console.log(user);
                    dispatch(setUser(user))
                    setIsAuth(true)
                    navigate('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                    // setIsAuth(false)
                });
      }
    }catch(err){
      console.error(err);
      alert("Error")
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotMessage("Please enter a valid email");
      return;
    }
    setForgotMessage("Password reset link has been sent to your email");
    setTimeout(() => setForgotModalOpen(false), 2000);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg p-6 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="w-full"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-xs">
                  Keep me signed in
                </Label>
              </div>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => setForgotModalOpen(true)}
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Forgot Password Modal */}
      <Dialog open={isForgotModalOpen} onOpenChange={setForgotModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>Enter your email to reset your password.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              className="w-full"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            {forgotMessage && <p className="text-sm text-blue-600">{forgotMessage}</p>}
            <DialogFooter>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
