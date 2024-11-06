import * as React from "react";
import axios from 'axios'; // Import Axios
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignupCard() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate=useNavigate()
  
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page when login button is clicked
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Prepare the user data
    const userData = {
      name,
      email,
      password,
      role,
    };

    try {
      // Make a POST request to the backend API using Axios
      const response = await axios.post('http://localhost:5000/api/auth/register', userData,{ withCredentials: true,});

      
      // Handle successful registration
      if(response.data.success==true){
        console.log('Registration successful:', response.data);
        navigate('/')
      }
      
      

    } catch (err) {
      if (err.response && err.response.data) {
        // Set error message from response
        setError(err.response.data.msg || 'Registration failed. Please try again.');
      } else {
        console.error('Error during registration:', err);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Card className="w-[420px] mx-auto bg-cover bg-no-repeat bg-center shadow-md rounded-md mt-9" style={{ backgroundImage: "url(path/to/your/image.jpg)" }}>
      <CardHeader className="bg-white text-black">
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Sign up for a new account in just a few steps.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-left text-black">
                Name
              </Label>
              <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-left text-black">
                Email
              </Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-left text-black">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="role" className="text-left text-black">
                Role
              </Label>
              <Select onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-600">{error}</p>} {/* Display error message */}
          </div>
         
          <Button className="w-full mb-2 " type="submit">Sign Up</Button> {/* Sign Up button */}
        
         
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center bg-white text-black">
        <p className="text-sm text-gray-600">Already have an account?</p>
        
          <Button onClick={handleLoginRedirect} variant="outline" className="w-full">Login</Button> {/* Login button */}
        
      </CardFooter>
    </Card>
  );
}

export default SignupCard;
